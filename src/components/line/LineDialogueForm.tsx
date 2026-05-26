

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

import { Textarea } from "@/src/components/ui/textarea";

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

import { useLines } from "@/src/hooks/useLines";
import { useRoutes } from "@/src/hooks/useRoutes";

export default function LineDialogueForm({
  lineId,
  onClose,
}: {
  lineId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createLine,
    createLoading,

    fetchSingleLine,

    updateLine,
    updateLoading,
  } = useLines();

  const {
    routes,
    fetchRoutes,
  } = useRoutes();

  const initialFormState = {
    route_id: "",
    name: "",
    description: "",
  };

  const [form, setForm] = useState(
    initialFormState,
  );

  const isEditMode =
    Boolean(lineId);

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    const loadLine =
      async () => {
        if (!lineId) return;

        try {
          const res =
            await fetchSingleLine(
              lineId,
            );

          setForm({
            route_id:
              res.route_id ??
              "",

            name:
              res.name ?? "",

            description:
              res.description ??
              "",
          });

          setOpen(true);
        } catch (error) {
          toast.error(
            "Failed to load line",
          );
        }
      };

    loadLine();
  }, [lineId]);

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
    if (!form.route_id)
      return "Route is required";

    if (!form.name)
      return "Line name is required";

    if (!form.description)
      return "Description is required";

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
          lineId
        ) {
          await updateLine(
            lineId,
            form,
          );

          toast.success(
            "Line updated successfully",
          );
        } else {
          await createLine(
            form,
          );

          toast.success(
            "Line created successfully",
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
          Create Line
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Edit Line"
              : "Create Line"}
          </DialogTitle>

          <DialogDescription>
            Manage line information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* ROUTE */}

          <div className="space-y-2">
            <Label>
              Route *
            </Label>

            <Select
              value={
                form.route_id
              }
              onValueChange={(
                value,
              ) =>
                handleChange(
                  "route_id",
                  value,
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select route" />
              </SelectTrigger>

              <SelectContent>
                {routes.map(
                  (route) => (
                    <SelectItem
                      key={
                        route.id
                      }
                      value={
                        route.id
                      }
                    >
                      {
                        route.name
                      }
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>
              Line Name *
            </Label>

            <Input
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value,
                )
              }
              placeholder="Line name"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <Label>
              Description *
            </Label>

            <Textarea
              value={
                form.description
              }
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value,
                )
              }
              rows={4}
              placeholder="Line description"
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
              "Update Line"
            ) : (
              "Create Line"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}