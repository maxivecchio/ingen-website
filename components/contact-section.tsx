"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: '100%',
  height: '256px', // igual a h-64 en Tailwind
}

// Coordenadas ejemplo (Av. Principal 1234, Centro, Ciudad)
const center = {
  lat: -34.6037,  // Cambialas por las coordenadas reales
  lng: -58.3816,
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-16 lg:py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Contactanos</h2>
          <p className="text-xl text-gray-600">Estamos aquí para ayudarte con tu próxima inversión</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl h-full p-8 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envianos un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full flex-grow resize-none"
                  placeholder="Contanos sobre tu interés en invertir..."
                />
              </div>
              <Button type="submit" className="w-full bg-brand-black hover:bg-brand-dark text-white mt-auto">
                Enviar Mensaje
              </Button>
            </form>
          </div>


          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">Dirección</p>
                    <p className="text-gray-600">
                      Av. Principal 1234, Centro
                      <br />
                      Ciudad, Provincia 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 mt-1 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+52 1 984 879 0708</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 mt-1 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@urbandev.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 mt-1 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Horarios</p>
                    <p className="text-gray-600">
                      Lun - Vie: 9:00 - 18:00
                      <br />
                      Sáb: 9:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            {/* <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h3>
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div> */}

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h3>
              <div className="bg-gray-200 rounded-lg h-64 w-full overflow-hidden">
                <iframe
                  title="Mapa de Ubicación"
                  src="https://maps.google.com/maps?q=-34.6037,-58.3816&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
