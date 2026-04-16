"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  FileText,
  Upload,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  Camera,
  Loader2,
  CheckCircle,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const prescriptionsData = [
  { id: "RX-001", patient: "John Doe", doctor: "Dr. Smith", date: "2026-04-01", medicines: ["Amoxicillin 500mg", "Paracetamol 500mg"], status: "Processed", aiConfidence: 95 },
  { id: "RX-002", patient: "Sarah Wilson", doctor: "Dr. Johnson", date: "2026-04-01", medicines: ["Cetirizine 10mg"], status: "Pending", aiConfidence: 88 },
  { id: "RX-003", patient: "Mike Brown", doctor: "Dr. Davis", date: "2026-03-31", medicines: ["Metformin 500mg", "Vitamin D3"], status: "Processed", aiConfidence: 92 },
  { id: "RX-004", patient: "Emily Davis", doctor: "Dr. Wilson", date: "2026-03-31", medicines: ["Omeprazole 20mg"], status: "Review", aiConfidence: 75 },
  { id: "RX-005", patient: "David Chen", doctor: "Dr. Lee", date: "2026-03-30", medicines: ["Aspirin 100mg", "Pantoprazole 40mg"], status: "Processed", aiConfidence: 98 },
]

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResult, setAiResult] = useState<string[] | null>(null)

  const filteredPrescriptions = prescriptionsData.filter((rx) =>
    rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAIExtract = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAiResult(["Amoxicillin 500mg - 3x daily", "Paracetamol 650mg - as needed", "Vitamin C 1000mg - 1x daily"])
    setIsProcessing(false)
    toast.success("AI extraction complete!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed": return "bg-green-100 text-green-700"
      case "Pending": return "bg-orange-100 text-orange-700"
      case "Review": return "bg-blue-100 text-blue-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processed": return <CheckCircle className="w-3 h-3" />
      case "Pending": return <Clock className="w-3 h-3" />
      case "Review": return <Eye className="w-3 h-3" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Prescriptions</h1>
          <p className="text-muted-foreground">
            Upload and process prescriptions with AI-powered OCR
          </p>
        </div>
        <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Upload Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload Prescription</DialogTitle>
              <DialogDescription>
                Upload a prescription image for AI-powered text extraction
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop your prescription image here
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports JPG, PNG, PDF (max 10MB)
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>

              {/* AI Extract Button */}
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleAIExtract}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Extract with AI
                  </>
                )}
              </Button>

              {/* AI Results */}
              {aiResult && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">AI Extracted Medicines</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">95% Confidence</Badge>
                  </div>
                  <div className="space-y-2">
                    {aiResult.map((med, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded bg-card border">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{med}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctor Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Doctor Name</Label>
                  <Input placeholder="Dr. Name" />
                </div>
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input placeholder="Patient name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes..." rows={2} />
              </div>

              <Button className="w-full" variant="outline" disabled={!aiResult}>
                Save Prescription
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "Total Prescriptions", value: "245", icon: FileText, color: "bg-primary/10 text-primary" },
          { label: "Processed Today", value: "12", icon: CheckCircle, color: "bg-green-500/10 text-green-500" },
          { label: "Pending Review", value: "5", icon: Clock, color: "bg-orange-500/10 text-orange-500" },
          { label: "AI Accuracy", value: "94%", icon: Sparkles, color: "bg-blue-500/10 text-blue-500" },
        ].map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search prescriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Prescriptions Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Prescriptions</CardTitle>
          <CardDescription>
            {filteredPrescriptions.length} prescriptions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Medicines</TableHead>
                <TableHead>AI Confidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((rx) => (
                <TableRow key={rx.id}>
                  <TableCell className="font-mono font-medium">{rx.id}</TableCell>
                  <TableCell className="font-medium">{rx.patient}</TableCell>
                  <TableCell className="text-muted-foreground">{rx.doctor}</TableCell>
                  <TableCell className="text-muted-foreground">{rx.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rx.medicines.slice(0, 2).map((med, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {med}
                        </Badge>
                      ))}
                      {rx.medicines.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{rx.medicines.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "border-0",
                      rx.aiConfidence >= 90 ? "bg-green-100 text-green-700" :
                      rx.aiConfidence >= 80 ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {rx.aiConfidence}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0 flex items-center gap-1 w-fit", getStatusColor(rx.status))}>
                      {getStatusIcon(rx.status)}
                      {rx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
        </CardContent>
      </Card>
    </div>
  )
}
