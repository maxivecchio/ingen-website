"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección Principal",
      details: ["Av. Principal 1234, Piso 12", "Centro Empresarial Torre Norte", "Ciudad, Provincia 12345"],
    },
    {
      icon: Phone,
      title: "Teléfonos",
      details: ["+52 1 984 879 0708 (Principal)", "+52 1 984 879 0709 (Ventas)", "+52 1 984 879 0710 (Inversiones)"],
    },
    {
      icon: Mail,
      title: "Emails",
      details: ["info@urbandev.com", "ventas@urbandev.com", "inversiones@urbandev.com"],
    },
    {
      icon: Clock,
      title: "Horarios de Atención",
      details: ["Lunes a Viernes: 9:00 - 18:00", "Sábados: 9:00 - 14:00", "Domingos: Cerrado"],
    },
  ]

  const departments = [
    { value: "general", label: "Consulta General" },
    { value: "ventas", label: "Ventas de Propiedades" },
    { value: "inversiones", label: "Oportunidades de Inversión" },
    { value: "construccion", label: "Avances de Construcción" },
    { value: "soporte", label: "Soporte al Cliente" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contactanos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Ponete en contacto con nosotros para cualquier consulta sobre nuestros
              proyectos e inversiones
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Envianos un Mensaje</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo *
                          </label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
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
                            placeholder="+54 11 1234-5678"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Asunto *
                          </label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => setFormData({ ...formData, subject: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar asunto" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Mensaje *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Contanos en detalle sobre tu consulta..."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar Mensaje
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            const message =
                              "Hola! Me gustaría obtener más información sobre sus servicios y proyectos disponibles."
                            const whatsappUrl = `https://wa.me/5219848790708?text=${encodeURIComponent(message)}`
                            window.open(whatsappUrl, "_blank")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp Directo
                        </Button>
                      </div>

                      <p className="text-sm text-gray-500">
                        * Campos obligatorios. Nos pondremos en contacto contigo dentro de las 24 horas.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                            <info.icon className="h-6 w-6 text-rose-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-gray-600 text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Social Media */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguinos en Redes</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center hover:bg-rose-200 transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5 text-rose-600" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h2>
              <p className="text-xl text-gray-600">Visitanos en nuestras oficinas centrales</p>
            </div>

            <Card className="overflow-hidden shadow-lg">
              <div className="h-96 bg-gray-200 relative flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mapa Interactivo</h3>
                  <p className="text-gray-600 mb-4">
                    Av. Principal 1234, Centro Empresarial Torre Norte
                    <br />
                    Ciudad, Provincia 12345
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>
                      <strong>Transporte público:</strong> Líneas A, B y C - Estación Centro (5 min)
                    </p>
                    <p>
                      <strong>Estacionamiento:</strong> Disponible en el edificio (2hs gratuitas)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
              <p className="text-xl text-gray-600">Respuestas a las consultas más comunes</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cuál es el monto mínimo para invertir?</h3>
                  <p className="text-gray-600">
                    El monto mínimo de inversión es de $25,000. Ofrecemos diferentes planes según el monto invertido,
                    con beneficios adicionales para inversiones mayores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Qué garantías ofrecen?</h3>
                  <p className="text-gray-600">
                    Todos nuestros proyectos cuentan con respaldo legal completo, seguros de construcción y garantías
                    reales sobre los inmuebles desarrollados.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Con qué frecuencia recibo informes?</h3>
                  <p className="text-gray-600">
                    Los informes de avance se envían mensualmente para inversores iniciales, quincenalmente para premium
                    y semanalmente para inversores VIP.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ¿Puedo visitar las obras en construcción?
                  </h3>
                  <p className="text-gray-600">
                    Sí, organizamos visitas programadas a las obras para todos nuestros inversores. Los inversores
                    premium y VIP tienen acceso prioritario.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
