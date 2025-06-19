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

export default function PropiedadesPage() {
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    bedrooms: "all",
    location: "all",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const properties = [
    {
      id: 1,
      name: "Casa Moderna Vista Verde",
      location: "Zona Norte, Ciudad",
      price: 285000,
      type: "casa",
      image: "/placeholder.svg?height=300&width=400",
      beds: 3,
      baths: 2,
      area: "120 m²",
      status: "Disponible",
      description: "Hermosa casa moderna con jardín privado y acabados de lujo",
      features: ["Jardín", "Garage", "Terraza", "Cocina equipada"],
    },
    {
      id: 2,
      name: "Departamento Torres del Sol",
      location: "Centro Histórico",
      price: 195000,
      type: "departamento",
      image: "/placeholder.svg?height=300&width=400",
      beds: 2,
      baths: 2,
      area: "85 m²",
      status: "Vendido",
      description: "Departamento en torre premium con vista panorámica",
      features: ["Balcón", "Gimnasio", "Piscina", "Seguridad 24hs"],
    },
    {
      id: 3,
      name: "Penthouse Plaza Central",
      location: "Zona Comercial",
      price: 450000,
      type: "departamento",
      image: "/placeholder.svg?height=300&width=400",
      beds: 4,
      baths: 3,
      area: "180 m²",
      status: "Disponible",
      description: "Exclusivo penthouse con terraza privada y jacuzzi",
      features: ["Terraza privada", "Jacuzzi", "Vestidor", "Doble altura"],
    },
    {
      id: 4,
      name: "Casa Familiar Parque",
      location: "Zona Residencial",
      price: 320000,
      type: "casa",
      image: "/placeholder.svg?height=300&width=400",
      beds: 4,
      baths: 3,
      area: "150 m²",
      status: "En Venta",
      description: "Amplia casa familiar cerca de parques y colegios",
      features: ["Patio trasero", "Garage doble", "Estudio", "Lavadero"],
    },
    {
      id: 5,
      name: "Loft Urbano Centro",
      location: "Centro de la Ciudad",
      price: 165000,
      type: "loft",
      image: "/placeholder.svg?height=300&width=400",
      beds: 1,
      baths: 1,
      area: "65 m²",
      status: "Disponible",
      description: "Moderno loft con diseño industrial y ubicación privilegiada",
      features: ["Diseño industrial", "Techos altos", "Ventanales", "Amoblado"],
    },
    {
      id: 6,
      name: "Duplex Residencial Norte",
      location: "Zona Norte, Ciudad",
      price: 380000,
      type: "casa",
      image: "/placeholder.svg?height=300&width=400",
      beds: 3,
      baths: 3,
      area: "140 m²",
      status: "Disponible",
      description: "Duplex con diseño contemporáneo y espacios amplios",
      features: ["Duplex", "Parrilla", "Patio", "Cochera"],
    },
  ]

  const handleWhatsAppContact = (property) => {
    const message = `Hola! Me interesa la propiedad "${property.name}" ubicada en ${property.location} con precio de $${property.price.toLocaleString()}. ¿Podrían brindarme más información?`
    const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const filteredProperties = properties.filter((property) => {
    const matchesType = filters.type === "all" || property.type === filters.type
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nuestras Propiedades</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontrá la propiedad perfecta entre nuestra selección de casas, departamentos y lofts
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Filter className="h-5 w-5 text-rose-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Filtrar Propiedades</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nombre o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="casa">Casas</SelectItem>
                    <SelectItem value="departamento">Departamentos</SelectItem>
                    <SelectItem value="loft">Lofts</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rango de precio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los precios</SelectItem>
                    <SelectItem value="0-200000">$0 - $200,000</SelectItem>
                    <SelectItem value="200000-350000">$200,000 - $350,000</SelectItem>
                    <SelectItem value="350000+">$350,000+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.bedrooms} onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Dormitorios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier cantidad</SelectItem>
                    <SelectItem value="1">1 dormitorio</SelectItem>
                    <SelectItem value="2">2 dormitorios</SelectItem>
                    <SelectItem value="3">3 dormitorios</SelectItem>
                    <SelectItem value="4+">4+ dormitorios</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({ type: "all", priceRange: "all", bedrooms: "all", location: "all" })
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
        <section className="py-16">
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          property.status === "Disponible"
                            ? "bg-green-600 text-white"
                            : property.status === "Vendido"
                              ? "bg-gray-600 text-white"
                              : "bg-blue-600 text-white"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-lg font-bold">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-rose-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
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

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.beds}
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.baths}
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        {property.area}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Características:</p>
                      <div className="flex flex-wrap gap-1">
                        {property.features.map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-rose-600 hover:bg-rose-700"
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
