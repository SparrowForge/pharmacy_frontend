"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SalesReturnForm from "@/src/components/sales/SalesReturnForm";
import { useSalesInvoice } from "@/src/hooks/useSalesInvoice";
import Loading from "@/src/components/common/Loading";

export default function SalesReturnPage() {
  const router = useRouter();
  const { id } = useParams();
  const { fetchSingleSalesInvoice, singleSalesInvoiceLoading, singleSalesInvoice } =
    useSalesInvoice();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invoice ID is required");
      setLoading(false);
      return;
    } else {
      fetchSingleSalesInvoice(String(id));
    }
  }, [id]);

  if (singleSalesInvoiceLoading) {
    return <Loading text="Loading Data..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Sales Return
          </h1>
          {/* <p className="text-gray-600 mt-2">Invoice: {invoiceData?.invoice_number}</p> */}
        </div>
        {singleSalesInvoice && <SalesReturnForm invoiceData={singleSalesInvoice} />}
      </div>
    </div>
  );
}
