"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Filter, Search } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { propertyService, propertyTypeService, statusService } from "@/components/api/properties-api"
import { getImageUrl } from "@/lib/utils"

// Dynamically import the map component with SSR disabled
const DynamicPropertiesMap = dynamic(() => import("@/components/properties-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[600px] bg-gray-200 flex items-center justify-center">
      <div className="text-gray-600">Cargando mapa...</div>
    </div>
  ),
})

export function FilterPopover({ label, options, selected, onChange }: any) {
  const isObjectWithId = label === "Tipo de propiedad" || label === "Estado de la propiedad"

  const isChecked = (option: any) => {
    if (isObjectWithId) {
      return selected === option._id
    }

    if (option.label && selected?.label) {
      return selected.label === option.label
    }

    return selected === option
  }

  const handleToggle = (option: any) => {
    if (isObjectWithId) {
      const value = option._id
      onChange(selected === value ? "all" : value)
    } else if (option.label) {
      onChange(selected?.label === option.label ? null : option)
    } else {
      onChange(selected === option ? null : option)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between rounded-xl h-12 bg-transparent">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-2">
          {options.map((option: any) => (
            <label key={isObjectWithId ? option._id : option.label || option} className="flex items-center space-x-2">
              <Checkbox checked={isChecked(option)} onCheckedChange={() => handleToggle(option)} />
              <span className="text-sm text-gray-700">{isObjectWithId ? option.name : option.label || option}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function PropiedadesPage() {
  const [properties, setProperties] = useState<any>([])
  const [propertiesTypes, setPropertiesTypes] = useState<any>([])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [propertiesStatuses, setPropertiesStatuses] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const [priceRangeFilter, setPriceRangeFilter] = useState<{
    label: string
    min: number
    max?: number
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageStatus, setCurrentPageStatus] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })

  const priceRanges = [
    { label: "$0 - $50,000", min: 0, max: 50000 },
    { label: "$50,000 - $100,000", min: 50000, max: 100000 },
    { label: "$100,000 - $200,000", min: 100000, max: 200000 },
    { label: "$200,000 - $350,000", min: 200000, max: 350000 },
    { label: "$350,000+", min: 350000, max: undefined },
  ]

  const loadProperties = useCallback(async () => {
    try {
      const filters: any = {
        page: currentPage,
        property_type: selectedType !== "all" ? selectedType : undefined,
        limit: 12,
        search: searchTerm || undefined,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
      }

      if (priceRangeFilter) {
        filters.min_price = priceRangeFilter.min
        if (priceRangeFilter.max !== undefined) {
          filters.max_price = priceRangeFilter.max
        }
      }

      console.log("Loading properties with filters:", filters)

      setLoading(true)
      const response = await propertyService.getAll(filters)
      console.log("Properties loaded:", response)
      setProperties(response.data)
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, priceRangeFilter, searchTerm, selectedType, selectedStatus])

  const loadPropertyTypes = useCallback(async () => {
    try {
      const response = await propertyTypeService.getAll({ limit: "all" })
      console.log(response)
      setPropertiesTypes(response.data)
    } catch (error) {
      console.error("Error loading property types:", error)
    }
  }, [])

  const loadStatus = useCallback(async () => {
    const filters = {
      page: currentPageStatus,
      limit: "all",
    }
    try {
      setLoading(true)

      const response = await statusService.getAll(filters)
      console.log(response)
      setPropertiesStatuses(response.data)
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPageStatus])

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  useEffect(() => {
    loadPropertyTypes()
  }, [loadPropertyTypes])

  const handleWhatsAppContact = (property: any) => {
    const message = `Hola! Me interesa la propiedad "${property.name}" ubicada en ${property.location} con precio de $${property.price.toLocaleString()}. ¿Podrían brindarme más información?`
    const whatsappUrl = `https://wa.me/5493515521325?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

  const router = useRouter()

  const goToNextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section>
        <div className="w-full h-[400px] sm:h-[600px]">
          <DynamicPropertiesMap properties={properties} />
        </div>
      </section>

      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nuestras Propiedades</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontrá la propiedad perfecta entre nuestra selección de casas, departamentos y lofts
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-xl sm:rounded-3xl p-3 sm:p-10 shadow-md">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <Filter className="h-6 w-6 text-rose-600 mr-3 max-sm:hidden" />
                  Buscá tu próxima propiedad
                </h3>
                <p className="text-gray-600">Filtrá por tipo, precio, dormitorios o ubicación</p>
              </div>

              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar por nombre o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 w-full text-lg rounded-xl border-gray-300 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Popover 1: Tipo */}
                <FilterPopover
                  label="Tipo de propiedad"
                  options={propertiesTypes}
                  selected={selectedType}
                  onChange={(selected: any) => setSelectedType(selected)}
                />

                {/* Popover 2: Precio */}
                <FilterPopover
                  label="Rango de precio"
                  options={priceRanges}
                  selected={priceRangeFilter}
                  onChange={(selected: any) => setPriceRangeFilter(selected)}
                />

                {/* Popover 3: Estado de la propiedad */}
                <FilterPopover
                  label="Estado de la propiedad"
                  options={propertiesStatuses}
                  selected={selectedStatus}
                  onChange={(selected: any) => setSelectedStatus(selected)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{properties.length} Propiedades Encontradas</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property: any) => (
                <div key={property._id} className="px-3">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={
                          property.files?.find((file: any) => file.position === 0)
                            ? getImageUrl(property.files.find((file: any) => file.position === 0))
                            : "/placeholder.svg"
                        }
                        alt={property.name}
                        width={400}
                        height={400}
                        className="w-full h-52 object-cover"
                      />

                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: property.status?.color || "#9CA3AF" }}
                        >
                          {property.status?.name || "Sin estado"}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span className="bg-brand-black text-white px-2 py-1 rounded text-xs font-medium capitalize">
                          {property.property_type_id?.name || "Sin tipo"}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>

                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        <span className="text-sm">{property.address_id?.address_line}</span>
                      </div>

                      <div>
                        <p className="line-clamp-3 text-sm">{property.description || "Sin descripción"}</p>
                      </div>

                      <Button
                        onClick={() => router.push(`/propiedades/${property._id}`)}
                        className="w-full mt-2"
                        variant="outline"
                      >
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {(pagination.page - 1) * pagination.limit + 1}-
                {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} propiedades
                {searchTerm && ` (búsqueda: "${searchTerm}")`}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrevPage}
                  onClick={goToPreviousPage}
                  className="shadow-sm bg-transparent"
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground px-2">
                  Página {pagination.page} de {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={goToNextPage}
                  className="shadow-sm bg-transparent"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
