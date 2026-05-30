"use client";

import { useRef, useState } from "react";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { UploadCloud, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

import { useMediaFiles } from "@/src/hooks/useMediaFiles";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";

interface ModernUploadProps {
  value?: string; // file_id
  onChange: (fileId: string, fileUrl?: string) => void;
  label?: string;
  accept?: string;
}

export default function FileUpload({
  value,
  onChange,
  label = "Upload File",
  accept = "image/*",
}: ModernUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const user = useCurrentUser();

  const { uploadMedia } = useMediaFiles();

  const handleFile = async (file: File) => {
    setLoading(true);

    try {
      const payload = {
        file_name: file.name,
        file_url: URL.createObjectURL(file), // temp preview
        file_type: file.type,
        mime_type: file.type,
        file_size: file.size,
        alt_text: file.name,
        uploaded_by: user?.id,
      };

      const res = await uploadMedia(payload);

      onChange(res.id, res.file_url);

      setPreview(res.file_url);
    } catch {
      // silent fail handled by hook
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Card
      className={cn(
        "p-5 border-dashed cursor-pointer transition relative",
        dragActive && "border-primary bg-primary/5",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      {/* hidden input (NO UI exposure) */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        ) : preview ? (
          <img
            src={preview}
            className="w-20 h-20 rounded-lg object-cover border"
          />
        ) : (
          <UploadCloud className="w-10 h-10 text-muted-foreground" />
        )}

        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to upload
          </p>
        </div>

        {preview && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
              onChange("", "");
            }}
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        )}
      </div>
    </Card>
  );
}
