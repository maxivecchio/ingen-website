"use client"

import { useParams } from "next/navigation"
import PropertyDetail from "./property-detail"

export default function PropertyPage() {
  const params = useParams()
  const propertyId = params.id as string
  
  console.log("propertyId", propertyId)

  return <PropertyDetail propertyId={propertyId} />
}
