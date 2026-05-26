
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

import { useDivisions } from "@/src/hooks/useDivisions";
import { useCountries } from "@/src/hooks/useCountries";

export default function DivisionDialogueForm({
  divisionId,
  onClose,
}: {
  divisionId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createDivision,
    createLoading,

    fetchSingleDivision,

    updateDivision,
    updateLoading,
  } = useDivisions();

  const {
    countries,
    fetchCountries,
  } = useCountries();

  const initialFormState = {
    country_id: "",
    code: "",
    name: "",
  };

  const [form, setForm] = useState(
    initialFormState,
  );

  const isEditMode =
    Boolean(divisionId);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const loadDivision =
      async () => {
        if (!divisionId) return;

        try {
          const res =
            await fetchSingleDivision(
              divisionId,
            );

          setForm({
            country_id:
              res.country_id ??
              "",

            code:
              res.code ?? "",

            name:
              res.name ?? "",
          });

          setOpen(true);
        } catch (error) {
          toast.error(
            "Failed to load division",
          );
        }
      };

    loadDivision();
  }, [divisionId]);

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
    if (!form.country_id)
      return "Country is required";

    if (!form.code)
      return "Code is required";

    if (!form.name)
      return "Name is required";

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
          divisionId
        ) {
          await updateDivision(
            divisionId,
            form,
          );

          toast.success(
            "Division updated successfully",
          );
        } else {
          await createDivision(
            form,
          );

          toast.success(
            "Division created successfully",
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
          Create Division
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Edit Division"
              : "Create Division"}
          </DialogTitle>

          <DialogDescription>
            Manage division information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* COUNTRY */}

          <div className="space-y-2">
            <Label>
              Country *
            </Label>

            <Select
              value={
                form.country_id
              }
              onValueChange={(
                value,
              ) =>
                handleChange(
                  "country_id",
                  value,
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>

              <SelectContent>
                {countries.map(
                  (country) => (
                    <SelectItem
                      key={
                        country.id
                      }
                      value={
                        country.id
                      }
                    >
                      {
                        country.name
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
              Division Code *
            </Label>

            <Input
              value={form.code}
              onChange={(e) =>
                handleChange(
                  "code",
                  e.target.value,
                )
              }
              placeholder="Division code"
            />
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>
              Division Name *
            </Label>

            <Input
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value,
                )
              }
              placeholder="Division name"
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
              "Update Division"
            ) : (
              "Create Division"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}