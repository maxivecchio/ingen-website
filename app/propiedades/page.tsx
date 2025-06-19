"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Bed, Bath, Square, Filter, Search, MessageCircle } from "lucide-react"
import Image from "next/image"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
/* @ts-ignore */
import L from "leaflet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

export function FilterPopover({ label, options, selected, onChange }: any) {
  const handleToggle = (option: any) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item: any) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between rounded-xl h-12"
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-2">
          {options.map((option: any) => (
            <label key={option} className="flex items-center space-x-2">
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}


export default function PropiedadesPage() {
  const [filters, setFilters] = useState<any>({
    type: [],
    priceRange: [],
    bedrooms: [],
    location: [],
  })

  const [searchTerm, setSearchTerm] = useState("")

  const properties = [
    {
      id: 1,
      name: "Casa Moderna Vista Verde",
      location: "Zona Norte, Ciudad",
      price: 285000,
      type: "casa",
      image: "/imagen-prueba-2.jpg",
      beds: 3,
      baths: 2,
      area: "120 m²",
      status: "Disponible",
      description: "Hermosa casa moderna con jardín privado y acabados de lujo",
      features: ["Jardín", "Garage", "Terraza", "Cocina equipada"],
      coordinates: { lat: -34.5205, lng: -58.4901 },
    },
    {
      id: 2,
      name: "Departamento Torres del Sol",
      location: "Centro Histórico",
      price: 195000,
      type: "departamento",
      image: "/imagen-prueba-2.jpg",
      beds: 2,
      baths: 2,
      area: "85 m²",
      status: "Vendido",
      description: "Departamento en torre premium con vista panorámica",
      features: ["Balcón", "Gimnasio", "Piscina", "Seguridad 24hs"],
      coordinates: { lat: -34.6075, lng: -58.3789 },
    },
    {
      id: 3,
      name: "Penthouse Plaza Central",
      location: "Zona Comercial",
      price: 450000,
      type: "departamento",
      image: "/imagen-prueba-2.jpg",
      beds: 4,
      baths: 3,
      area: "180 m²",
      status: "Disponible",
      description: "Exclusivo penthouse con terraza privada y jacuzzi",
      features: ["Terraza privada", "Jacuzzi", "Vestidor", "Doble altura"],
      coordinates: { lat: -34.6037, lng: -58.3816 },
    },
    {
      id: 4,
      name: "Casa Familiar Parque",
      location: "Zona Residencial",
      price: 320000,
      type: "casa",
      image: "/imagen-prueba-2.jpg",
      beds: 4,
      baths: 3,
      area: "150 m²",
      status: "En Venta",
      description: "Amplia casa familiar cerca de parques y colegios",
      features: ["Patio trasero", "Garage doble", "Estudio", "Lavadero"],
      coordinates: { lat: -34.5809, lng: -58.4372 },
    },
    {
      id: 5,
      name: "Loft Urbano Centro",
      location: "Centro de la Ciudad",
      price: 165000,
      type: "loft",
      image: "/imagen-prueba-2.jpg",
      beds: 1,
      baths: 1,
      area: "65 m²",
      status: "Disponible",
      description: "Moderno loft con diseño industrial y ubicación privilegiada",
      features: ["Diseño industrial", "Techos altos", "Ventanales", "Amoblado"],
      coordinates: { lat: -34.6104, lng: -58.3755 },
    },
    {
      id: 6,
      name: "Duplex Residencial Norte",
      location: "Zona Norte, Ciudad",
      price: 380000,
      type: "casa",
      image: "/imagen-prueba-2.jpg",
      beds: 3,
      baths: 3,
      area: "140 m²",
      status: "Disponible",
      description: "Duplex con diseño contemporáneo y espacios amplios",
      features: ["Duplex", "Parrilla", "Patio", "Cochera"],
      coordinates: { lat: -34.5152, lng: -58.4713 },
    },
  ]

  const handleWhatsAppContact = (property: any) => {
    const message = `Hola! Me interesa la propiedad "${property.name}" ubicada en ${property.location} con precio de $${property.price.toLocaleString()}. ¿Podrían brindarme más información?`
    const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filters.type.length === 0 || filters.type.includes(capitalize(property.type))
    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.some((loc: string) =>
        property.location.toLowerCase().includes(loc.toLowerCase())
      )
    const matchesBedrooms =
      filters.bedrooms.length === 0 || filters.bedrooms.includes(String(property.beds))
    const matchesPrice =
      filters.priceRange.length === 0 ||
      filters.priceRange.some((range: string) => {
        const price = property.price
        if (range === "$0 - $200,000") return price <= 200000
        if (range === "$200,000 - $350,000") return price > 200000 && price <= 350000
        if (range === "$350,000+") return price > 350000
        return true
      })

    return matchesSearch && matchesType && matchesLocation && matchesBedrooms && matchesPrice
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section>
        <div className="w-full h-[600px]">
          <MapContainer
            /* @ts-ignore */
            center={[-34.6, -58.39]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              /* @ts-ignore */
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {properties.map((project) => (
              <Marker
                key={project.id}
                position={[project.coordinates.lat, project.coordinates.lng]}
              >
                <Popup>
                  <strong>{project.name}</strong>
                  <br />
                  {project.location}
                  <br />
                  {project.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nuestras Propiedades
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontrá la propiedad perfecta entre nuestra selección de casas, departamentos y lofts
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-3xl p-10 shadow-md">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <Filter className="h-6 w-6 text-rose-600 mr-3" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Popover 1: Tipo */}
                <FilterPopover
                  label="Tipo de propiedad"
                  options={["Casa", "Departamento", "Loft"]}
                  selected={filters.type}
                  onChange={(selected: any) => setFilters({ ...filters, type: selected })}
                />

                {/* Popover 2: Precio */}
                <FilterPopover
                  label="Rango de precio"
                  options={["$0 - $200,000", "$200,000 - $350,000", "$350,000+"]}
                  selected={filters.priceRange}
                  onChange={(selected: any) => setFilters({ ...filters, priceRange: selected })}
                />

                {/* Popover 3: Dormitorios */}
                <FilterPopover
                  label="Dormitorios"
                  options={["1", "2", "3", "4+"]}
                  selected={filters.bedrooms}
                  onChange={(selected: any) => setFilters({ ...filters, bedrooms: selected })}
                />

                {/* Popover 4: Ubicación */}
                <FilterPopover
                  label="Ubicación"
                  options={["Zona Norte", "Centro Histórico", "Zona Comercial", "Zona Residencial", "Centro"]}
                  selected={filters.location}
                  onChange={(selected: any) => setFilters({ ...filters, location: selected })}
                />
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  variant="ghost"
                  className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setFilters({ type: [], priceRange: [], bedrooms: [], location: [] })
                    setSearchTerm("")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{filteredProperties.length} Propiedades Encontradas</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === "Vendido"
                          ? "bg-green-600/70 text-white"
                          : property.status === "Disponible"
                            ? "bg-blue-600/70 text-white"
                            : property.status === "En Venta"
                              ? "bg-purple-600/70 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                      >
                        {property.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-md font-bold">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-brand-black text-white px-2 py-1 rounded text-xs font-medium capitalize">
                        {property.type}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{property.description}</p>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-brand-black hover:bg-brand-black/80"
                        onClick={() => handleWhatsAppContact(property)}
                        disabled={property.status === "Vendido"}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {property.status === "Vendido" ? "Vendido" : "Consultar por WhatsApp"}
                      </Button>
                      <Button variant="outline" className="w-full">
                        Ver Detalles Completos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
