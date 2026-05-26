// components/thanas/ThanaDialogueForm.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";

import { Input } from "@/src/components/ui/input";

import { Label } from "@/src/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import {
  Loader2,
  Plus,
} from "lucide-react";

import { toast } from "sonner";

import { useThanas } from "@/src/hooks/useThanas";
import { useDistricts } from "@/src/hooks/useDistricts";

export default function ThanaDialogueForm({
  thanaId,
  onClose,
}: {
  thanaId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createThana,
    createLoading,

    fetchSingleThana,

    updateThana,
    updateLoading,
  } = useThanas();

  const {
    districts,
    fetchDistricts,
  } = useDistricts();

  const initialFormState = {
    district_id: "",
    code: "",
    name: "",
    postal_code: "",
  };

  const [form, setForm] = useState(
    initialFormState,
  );

  const isEditMode =
    Boolean(thanaId);

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    const loadThana =
      async () => {
        if (!thanaId) return;

        try {
          const res =
            await fetchSingleThana(
              thanaId,
            );

          setForm({
            district_id:
              res.district_id ??
              "",

            code:
              res.code ?? "",

            name:
              res.name ?? "",

            postal_code:
              res.postal_code ??
              "",
          });

          setOpen(true);
        } catch (error) {
          toast.error(
            "Failed to load thana",
          );
        }
      };

    loadThana();
  }, [thanaId]);

  const handleChange = (
    key: string,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.district_id)
      return "District is required";

    if (!form.code)
      return "Code is required";

    if (!form.name)
      return "Name is required";

    if (!form.postal_code)
      return "Postal code is required";

    return null;
  };

  const handleSubmit =
    async () => {
      const error =
        validate();

      if (error) {
        toast.error(error);

        return;
      }

      try {
        if (
          isEditMode &&
          thanaId
        ) {
          await updateThana(
            thanaId,
            form,
          );

          toast.success(
            "Thana updated successfully",
          );
        } else {
          await createThana(
            form,
          );

          toast.success(
            "Thana created successfully",
          );
        }

        setForm(
          initialFormState,
        );

        setOpen(false);

        onClose?.();
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Something went wrong",
        );
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);

        if (
          !val &&
          !isEditMode
        ) {
          setForm(
            initialFormState,
          );
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Thana
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Edit Thana"
              : "Create Thana"}
          </DialogTitle>

          <DialogDescription>
            Manage thana information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* DISTRICT */}

          <div className="space-y-2">
            <Label>
              District *
            </Label>

            <Select
              value={
                form.district_id
              }
              onValueChange={(
                value,
              ) =>
                handleChange(
                  "district_id",
                  value,
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>

              <SelectContent>
                {districts.map(
                  (district) => (
                    <SelectItem
                      key={
                        district.id
                      }
                      value={
                        district.id
                      }
                    >
                      {
                        district.name
                      }
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* CODE */}

          <div className="space-y-2">
            <Label>
              Thana Code *
            </Label>

            <Input
              value={form.code}
              onChange={(e) =>
                handleChange(
                  "code",
                  e.target.value,
                )
              }
              placeholder="Thana code"
            />
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>
              Thana Name *
            </Label>

            <Input
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value,
                )
              }
              placeholder="Thana name"
            />
          </div>

          {/* POSTAL CODE */}

          <div className="space-y-2">
            <Label>
              Postal Code *
            </Label>

            <Input
              value={
                form.postal_code
              }
              onChange={(e) =>
                handleChange(
                  "postal_code",
                  e.target.value,
                )
              }
              placeholder="Postal code"
            />
          </div>

          {/* SUBMIT */}

          <Button
            onClick={
              handleSubmit
            }
            className="w-full bg-primary hover:bg-primary/90"
            disabled={
              createLoading ||
              updateLoading
            }
          >
            {createLoading ||
            updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />

                {isEditMode
                  ? "Updating..."
                  : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Thana"
            ) : (
              "Create Thana"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}