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

import { Badge } from "@/src/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Layers } from "lucide-react";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import ProductCategoryDialog from "@/src/components/product-category/ProductCategoryDialogueForm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import Loading from "@/src/components/common/Loading";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function ProductCategoriesPage() {
  const { categories, loading, fetchCategories, deleteCategory } =
    useProductCategories();

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories({
      q: search,
    });
  }, [fetchCategories, search]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Layers className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Product Categories</h1>
            <p className="text-muted-foreground">
              Manage all product categories
            </p>
          </div>
        </div>

        <ProductCategoryDialog
          categoryId={categoryId}
          onClose={() => {
            setCategoryId(null);
            setOpenEdit(false);
          }}
        />
      </div>

      {/* SEARCH */}
      <div className="max-w-md">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <TableSkeleton/>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories?.length ? (
                  categories.map((cat) => (
                    <TableRow key={cat.id}>
                      {/* NAME */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {/* {cat.icon ? (
                            <img
                              src={cat.icon}
                              className="w-8 h-8 rounded object-cover border"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-muted rounded" />
                          )} */}

                          <span className="font-medium">{cat.name}</span>
                        </div>
                      </TableCell>

                      {/* SLUG */}
                      <TableCell className="text-muted-foreground">
                        {cat.slug}
                      </TableCell>

                      {/* PARENT */}
                      <TableCell>
                        {cat.parent_id ? (
                          <Badge variant="outline">
                            Parent: {cat.parent_id}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Root
                          </span>
                        )}
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        {cat.is_delete ? (
                          <Badge className="bg-red-100 text-red-700">
                            Deleted
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">
                            Active
                          </Badge>
                        )}
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            {/* EDIT */}
                            <DropdownMenuItem
                              onClick={() => {
                                setCategoryId(cat.id);
                                setOpenEdit(true);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            {/* DELETE */}
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => deleteCategory(cat.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
