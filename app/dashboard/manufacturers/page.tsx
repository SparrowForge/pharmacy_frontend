"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, MoreVertical, Edit, Trash2, MapPin, Mail, Phone } from "lucide-react"
import { toast } from "sonner"

const sampleManufacturers = [
  {
    id: 1,
    name: "Pharmaceutical Innovations Ltd.",
    country: "India",
    city: "Mumbai",
    email: "contact@pharmainnov.com",
    phone: "+91-22-1234-5678",
    established: "2010",
    medicines: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Global Health Sciences",
    country: "USA",
    city: "New Jersey",
    email: "sales@globalhealth.com",
    phone: "+1-201-987-6543",
    established: "2005",
    medicines: 128,
    status: "Active",
  },
  {
    id: 3,
    name: "EuroMed Pharmaceuticals",
    country: "Germany",
    city: "Berlin",
    email: "info@euromed.de",
    phone: "+49-30-5555-8888",
    established: "2008",
    medicines: 67,
    status: "Active",
  },
  {
    id: 4,
    name: "Asian Remedy Corp",
    country: "Taiwan",
    city: "Taipei",
    email: "enquiry@asianremedy.tw",
    phone: "+886-2-9876-5432",
    established: "2012",
    medicines: 34,
    status: "Active",
  },
  {
    id: 5,
    name: "BioTech Solutions",
    country: "Canada",
    city: "Toronto",
    email: "support@biotech.ca",
    phone: "+1-416-555-7890",
    established: "2015",
    medicines: 23,
    status: "Inactive",
  },
]

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState(sampleManufacturers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredManufacturers = manufacturers.filter((mfg) =>
    mfg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mfg.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mfg.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: number) => {
    setManufacturers(manufacturers.filter((mfg) => mfg.id !== id))
    toast.success("Manufacturer deleted successfully")
  }

  const handleAddManufacturer = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Manufacturer added successfully")
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manufacturers</h1>
          <p className="text-muted-foreground">
            Manage pharmaceutical manufacturers and suppliers
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                  <Input id="name" placeholder="e.g. Pharma Corp Ltd." required />
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
                  <Input id="established" type="number" placeholder="e.g. 2010" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@manufacturer.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1-XXX-XXX-XXXX" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 animate-gradient flex-1">
                  Add Manufacturer
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search manufacturers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Manufacturers Grid */}
      <div className="grid gap-4">
        {filteredManufacturers.map((manufacturer) => (
          <Card key={manufacturer.id} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{manufacturer.name}</h3>
                    <Badge
                      variant={manufacturer.status === "Active" ? "default" : "secondary"}
                      className={manufacturer.status === "Active" ? "bg-gradient-to-r from-primary to-primary/80 animate-gradient" : ""}
                    >
                      {manufacturer.status}
                    </Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {manufacturer.city}, {manufacturer.country}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {manufacturer.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {manufacturer.phone}
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">{manufacturer.medicines}</span> medicines supplied
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(manufacturer.id)}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredManufacturers.length === 0 && (
        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">No manufacturers found</p>
            <Button asChild>
              <Link href="/dashboard/manufacturers">Add your first manufacturer</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
