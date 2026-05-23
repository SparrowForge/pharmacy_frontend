"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ArrowLeft, Loader2, Save, Plus, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

const customers = [
  { id: 1, name: "John Doe", phone: "+1 555-0201" },
  { id: 2, name: "Sarah Wilson", phone: "+1 555-0202" },
  { id: 3, name: "Mike Brown", phone: "+1 555-0203" },
];

const medicines = [
  { id: 1, name: "Paracetamol 500mg", price: 2.5, stock: 450 },
  { id: 2, name: "Amoxicillin 500mg", price: 5.0, stock: 23 },
  { id: 3, name: "Cetirizine 10mg", price: 2.5, stock: 180 },
  { id: 4, name: "Omeprazole 20mg", price: 5.0, stock: 95 },
  { id: 5, name: "Vitamin D3 1000IU", price: 5.0, stock: 8 },
];

const riders = [
  { id: 1, name: "Mike Johnson" },
  { id: 2, name: "Tom Wilson" },
  { id: 3, name: "James Smith" },
];

interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { medicineId: "", quantity: 1, price: 0 },
  ]);

  const addItem = () => {
    setOrderItems([...orderItems, { medicineId: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number,
  ) => {
    const updated = [...orderItems];
    if (field === "medicineId") {
      const medicine = medicines.find((m) => m.id.toString() === value);
      updated[index] = {
        ...updated[index],
        medicineId: value as string,
        price: medicine?.price || 0,
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setOrderItems(updated);
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Order created successfully!");
    router.push("/dashboard/orders");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/orders">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Create New Order
          </h1>
          <p className="text-muted-foreground">
            Create a delivery or pickup order
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>
                  Select or add customer information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Customer *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id.toString()}
                        >
                          {customer.name} - {customer.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Delivery Address *</Label>
                  <Textarea
                    placeholder="Enter full delivery address"
                    rows={2}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>
                      Add medicines to the order
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-end gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex-1 space-y-2">
                      <Label>Medicine</Label>
                      <Select
                        value={item.medicineId}
                        onValueChange={(value) =>
                          updateItem(index, "medicineId", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select medicine" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicines.map((med) => (
                            <SelectItem key={med.id} value={med.id.toString()}>
                              {med.name} - ${med.price.toFixed(2)} ({med.stock}{" "}
                              in stock)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Label>Qty</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 1,
                          )
                        }
                      />
                    </div>
                    <div className="w-28 space-y-2">
                      <Label>Price</Label>
                      <Input
                        value={`$${(item.price * item.quantity).toFixed(2)}`}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(index)}
                      disabled={orderItems.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Delivery Type *</Label>
                    <Select defaultValue="delivery">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery">Home Delivery</SelectItem>
                        <SelectItem value="pickup">Store Pickup</SelectItem>
                        <SelectItem value="express">
                          Express Delivery
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Rider</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rider" />
                      </SelectTrigger>
                      <SelectContent>
                        {riders.map((rider) => (
                          <SelectItem
                            key={rider.id}
                            value={rider.id.toString()}
                          >
                            {rider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Payment Method *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash on Delivery</SelectItem>
                      <SelectItem value="card">Card Payment</SelectItem>
                      <SelectItem value="mobile">Mobile Payment</SelectItem>
                      <SelectItem value="credit">Credit Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Special instructions or notes..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {orderItems
                    .filter((item) => item.medicineId)
                    .map((item, index) => {
                      const medicine = medicines.find(
                        (m) => m.id.toString() === item.medicineId,
                      );
                      return (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {medicine?.name} x{item.quantity}
                          </span>
                          <span>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">
                      ${(total + 5).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-border">
              <CardContent className="p-6 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Order
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="/dashboard/orders">Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
