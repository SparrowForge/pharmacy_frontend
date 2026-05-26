// app/dashboard/countries/page.tsx

"use client";

import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { MoreHorizontal, Edit, Trash2, Search, Globe } from "lucide-react";

import { useCountries } from "@/src/hooks/useCountries";

import { useAppSelector } from "@/src/redux/hooks";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { initialLimit, initialPage } from "@/src/constants/utils";
import CountryDialogueForm from "@/src/components/country/CountryDialogueForm";

export default function CountriesPage() {
  const [page, setPage] = useState(initialPage);

  const [limit] = useState(initialLimit);

  const [search, setSearch] = useState("");

  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editCountryId, setEditCountryId] = useState<string | null>(null);

  const { fetchCountries, deleteCountry } = useCountries();

  const { countries, fetchLoading } = useAppSelector(
    (state) => state.countries,
  );

  useEffect(() => {
    fetchCountries({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchCountries, page, limit, search, includeDeleted]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Country Management</h1>

            <p className="text-muted-foreground">Manage all countries</p>
          </div>
        </div>

        <CountryDialogueForm
          countryId={editCountryId}
          onClose={() => setEditCountryId(null)}
        />
      </div>

      {/* SEARCH */}

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search countries..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* INCLUDE DELETED */}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={includeDeleted}
          onChange={(e) => {
            setIncludeDeleted(e.target.checked);

            setPage(1);
          }}
        />

        <label className="text-sm">Include Deleted</label>
      </div>

      {/* TABLE */}

      <Card>
        <CardHeader>
          <CardTitle>All Countries</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading countries..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country Name</TableHead>

                  <TableHead>Code</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {countries.length > 0 &&
                  countries.map((country) => (
                    <TableRow key={country.id}>
                      <TableCell>{country.name}</TableCell>

                      <TableCell>{country.code}</TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setEditCountryId(country.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteCountry(country.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* PAGINATION */}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
