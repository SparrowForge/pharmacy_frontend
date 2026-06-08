"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Badge } from "@/src/components/ui/badge";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

interface Product {
  id: string;
  name: string;
  sku: string;
  selling_price: string | number;
  current_stock: number;
  category?: string;
}

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onAddToCart: (product: Product) => void;
}

export function ProductList({
  products,
  loading = false,
  onAddToCart,
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  console.log("Products", products)
  return (
    <Card className="border-border flex-1 flex flex-col min-h-0">
      <CardHeader className="pb-3 border-b flex items-center justify-between flex-row">
        <CardTitle className="text-base">Products ({products.length})</CardTitle>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-full p-4">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                No products found. Try adjusting your filters.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <ScrollArea className="h-full w-full">
            <div className="p-4 flex flex-col h-full">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
                {paginatedProducts.map((product) => {
                  const inStock = product.current_stock > 0;
                  const sellingPrice = typeof product.selling_price === 'string' 
                    ? parseFloat(product.selling_price) 
                    : product.selling_price;

                  return (
                    <Button
                      key={product.id}
                      onClick={() => onAddToCart(product)}
                      variant="outline"
                      disabled={!inStock}
                      className="h-auto p-3 flex flex-col items-start justify-start text-left hover:bg-primary/10 disabled:opacity-50"
                    >
                      <div className="w-full space-y-1">
                        <p className="font-medium text-xs leading-tight line-clamp-2">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground">{product.sku}</span>
                          <Badge variant={inStock ? "default" : "destructive"} className="text-xs">
                            {inStock ? `${product.current_stock}` : "Out"}
                          </Badge>
                        </div>
                        <p className="font-semibold text-sm">${sellingPrice.toFixed(2)}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t">
                  <Button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center text-xs text-muted-foreground">
                    {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length}
                  </div>
                  <Button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
