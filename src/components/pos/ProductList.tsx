"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Badge } from "@/src/components/ui/badge";
import { IStockReportItem } from "@/src/types/stockReport.types";

interface ProductListProps {
  products: IStockReportItem[];
  loading?: boolean;
  onAddToCart: (product: IStockReportItem) => void;
  search:string
}

export function ProductList({
  products,
  loading = false,
  onAddToCart,
  search
}: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPages = Math.max(
    1,
    Math.ceil(products.length / itemsPerPage),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const filteredProducts = useMemo(() => {
  if (!search.trim()) return products;

  return products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
}, [products, search]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  return (
    <Card className="border-border flex-1 flex flex-col min-h-0">
      <CardHeader className="pb-3 border-b flex items-center justify-between flex-row">
        <CardTitle className="text-base">
          Products ({products.length})
        </CardTitle>

        {totalPages > 1 && (
          <span className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Loading products...
              </p>
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
            <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {paginatedProducts.map((product) => {
                const inStock = product.closing_stock > 0;

                return (
                  <Button
                    key={product.product_id}
                    onClick={() => onAddToCart(product)}
                    variant="outline"
                    disabled={!inStock}
                    className="h-auto p-3 flex flex-col items-start text-left"
                  >
                    <p className="font-medium text-xs line-clamp-2">
                      {product.name}
                    </p>

                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="text-xs text-muted-foreground">
                        {product.code}
                      </span>

                      <Badge variant={inStock ? "default" : "destructive"}>
                        {inStock ? product.closing_stock : "Out"}
                      </Badge>
                    </div>
                  </Button>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between p-3 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <span className="text-xs text-muted-foreground">
                  {currentPage} / {totalPages}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}