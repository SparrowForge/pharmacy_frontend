'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BasicInfoForm } from './BasicInfoForm'
import LocationForm from './LocationForm'

export function StakeholderTabs() {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted p-1">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="location">Location Details</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="mt-6">
        <BasicInfoForm />
      </TabsContent>

      <TabsContent value="location" className="mt-6">
        <LocationForm />
      </TabsContent>
    </Tabs>
  )
}