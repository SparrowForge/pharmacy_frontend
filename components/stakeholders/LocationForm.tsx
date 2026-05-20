'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export default function LocationForm() {
  const divisions = [
    { label: 'Dhaka', value: 'dhaka' },
    { label: 'Khulna', value: 'khulna' },
    { label: 'Rajshahi', value: 'rajshahi' },
  ]

  const districts = [
    { label: 'Gazipur', value: 'gazipur' },
    { label: 'Jessore', value: 'jessore' },
    { label: 'Bogura', value: 'bogura' },
  ]

  const upazilas = [
    { label: 'Sadar', value: 'sadar' },
    { label: 'Kaliakair', value: 'kaliakair' },
  ]

  const unions = [
    { label: 'Union 1', value: 'union-1' },
    { label: 'Union 2', value: 'union-2' },
  ]

  const thanas = [
    { label: 'Uttara', value: 'uttara' },
    { label: 'Mirpur', value: 'mirpur' },
    { label: 'Banani', value: 'banani' },
  ]

  const postalCodes = [
    { label: '1206', value: '1206' },
    { label: '1212', value: '1212' },
    { label: '1340', value: '1340' },
  ]

  const regions = [
    { label: 'North Region', value: 'north' },
    { label: 'South Region', value: 'south' },
    { label: 'Central Region', value: 'central' },
  ]

  const zones = [
    { label: 'Zone A', value: 'zone-a' },
    { label: 'Zone B', value: 'zone-b' },
    { label: 'Zone C', value: 'zone-c' },
  ]

  const routes = [
    { label: 'Route 1', value: 'route-1' },
    { label: 'Route 2', value: 'route-2' },
    { label: 'Route 3', value: 'route-3' },
  ]

  const lines = [
    { label: 'Line 1', value: 'line-1' },
    { label: 'Line 2', value: 'line-2' },
    { label: 'Line 3', value: 'line-3' },
  ]

  const SelectField = ({
    label,
    items,
  }: {
    label: string
    items: { label: string; value: string }[]
  }) => (
    <div className="w-full space-y-2">
      <Label>{label}</Label>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Location Details
      </h4>

      {/* Division + District */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField label="Division/State" items={divisions} />
        <SelectField label="District" items={districts} />
      </div>

      {/* Upazila + Union */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField label="Upazila" items={upazilas} />
        <SelectField label="Union" items={unions} />
      </div>

      {/* Thana + Postal */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField label="Thana" items={thanas} />
        <SelectField label="Postal Code" items={postalCodes} />
      </div>

      {/* Region */}
      <SelectField label="Region" items={regions} />

      {/* Zone + Route + Line */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SelectField label="Zone" items={zones} />
        <SelectField label="Route" items={routes} />
        <SelectField label="Line" items={lines} />
      </div>
    </div>
  )
}