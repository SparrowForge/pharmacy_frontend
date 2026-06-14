"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

import { Search, MapPin, Mail, Phone, Building2 } from "lucide-react";

import { useCompanies } from "@/src/hooks/useCompanies";

export default function ManufacturersPage() {
  const { fetchLoading, companies } = useCompanies();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // manufacturers only
  const manufacturers = useMemo(() => {
    return companies.filter((c: any) => c.company_type === "manufacturer");
  }, [companies]);

  // search
  const filtered = useMemo(() => {
    return manufacturers.filter((m: any) =>
      `${m.name} ${m.city ?? ""} ${m.email ?? ""} ${m.phone ?? ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [manufacturers, searchQuery]);

  const totalPages = Math.ceil(filtered.length / limit);

  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "inactive":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manufacturers
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all pharmaceutical manufacturers
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          Total:{" "}
          <span className="font-medium text-foreground">
            {manufacturers.length}
          </span>
        </div>

        {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 animate-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Manufacturer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Manufacturer</DialogTitle>
              <DialogDescription>
                Enter the manufacturer details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddManufacturer} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Manufacturer Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Pharma Corp Ltd."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" placeholder="e.g. India" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="e.g. Mumbai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input
                    id="established"
                    type="number"
                    placeholder="e.g. 2010"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@manufacturer.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1-XXX-XXX-XXXX" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 animate-gradient flex-1"
                >
                  Add Manufacturer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog> */}
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10 h-10 bg-background"
          placeholder="Search by name, email, phone..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* LIST */}
      <div className="grid gap-4">
        {paginated.map((m: any) => (
          <Card
            key={m.id}
            className="group border border-border/60 hover:border-primary/30 transition-all hover:shadow-sm"
          >
            <CardContent className="p-5 flex items-start justify-between gap-6">
              {/* LEFT */}
              <div className="space-y-3">
                {/* NAME + STATUS */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{m.name}</h3>
                  </div>

                  <Badge
                    className={`${getStatusColor(m.status)} capitalize border`}
                  >
                    {m.status ?? "active"}
                  </Badge>
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{m.city || "-"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate max-w-[180px]">
                      {m.email || "-"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{m.phone || "-"}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE (optional future actions space) */}
              <div className="text-right text-xs text-muted-foreground">
                ID: {m.code || "N/A"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!fetchLoading && paginated.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-14 text-center">
            <p className="text-muted-foreground">No manufacturers found</p>
          </CardContent>
        </Card>
      )}

      {/* PAGINATION */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <p className="text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{page}</span> of{" "}
          {totalPages || 1}
        </p>

        <Button
          variant="outline"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
