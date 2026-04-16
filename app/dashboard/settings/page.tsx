"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Receipt,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Save,
  Upload,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your pharmacy settings and preferences
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="invoice" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Invoice
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Tax
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic pharmacy information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Pharmacy Name</Label>
                  <Input defaultValue="PharmaSmart Main Branch" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 555-0100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" defaultValue="contact@pharmasmart.com" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea 
                  defaultValue="123 Medical Drive, Suite 100&#10;New York, NY 10001"
                  rows={3}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (&#8364;)</SelectItem>
                      <SelectItem value="gbp">GBP (&#163;)</SelectItem>
                      <SelectItem value="bdt">BDT (&#2547;)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoice Settings */}
        <TabsContent value="invoice">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
              <CardDescription>Customize your invoice appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Business Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG up to 2MB. Recommended: 200x200px
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Invoice Prefix</Label>
                <Input defaultValue="INV-" className="max-w-xs" />
              </div>
              <div className="space-y-2">
                <Label>Invoice Footer Text</Label>
                <Textarea 
                  defaultValue="Thank you for your business! For any queries, please contact us at support@pharmasmart.com"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Terms & Conditions</Label>
                <Textarea 
                  defaultValue="1. All sales are final. 2. Returns accepted within 7 days with receipt. 3. Prescription medicines cannot be returned."
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">Show QR Code</p>
                  <p className="text-sm text-muted-foreground">Display payment QR code on invoices</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Settings */}
        <TabsContent value="tax">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and exemptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Tax Rate (%)</Label>
                  <Input type="number" defaultValue="7.5" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label>Tax ID / VAT Number</Label>
                  <Input defaultValue="TAX-123456789" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Tax Exemptions</Label>
                <div className="space-y-3">
                  {[
                    { category: "Prescription Medicines", exempt: true },
                    { category: "Over-the-Counter", exempt: false },
                    { category: "Medical Devices", exempt: true },
                    { category: "Cosmetics", exempt: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <span className="font-medium">{item.category}</span>
                      <Switch defaultChecked={item.exempt} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { title: "Low Stock Alerts", description: "Get notified when products fall below minimum stock", default: true },
                  { title: "Expiry Warnings", description: "Receive alerts for medicines expiring within 30 days", default: true },
                  { title: "New Order Notifications", description: "Alert when new orders are placed", default: true },
                  { title: "Daily Sales Summary", description: "Receive daily sales report via email", default: false },
                  { title: "AI Insights", description: "Get notified about AI predictions and suggestions", default: true },
                  { title: "System Updates", description: "Notifications about new features and updates", default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Low Stock Threshold</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" defaultValue="50" className="max-w-[100px]" />
                  <span className="text-muted-foreground">units</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alert when stock falls below this number
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { title: "Two-Factor Authentication", description: "Add extra security to your account", default: false },
                  { title: "Session Timeout", description: "Auto logout after 30 minutes of inactivity", default: true },
                  { title: "Login Notifications", description: "Get notified of new device logins", default: true },
                  { title: "Password Expiry", description: "Require password change every 90 days", default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Change Password</Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">New Password</Label>
                    <Input type="password" />
                  </div>
                </div>
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
