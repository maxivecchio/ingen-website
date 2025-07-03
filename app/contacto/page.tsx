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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
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
                        <Button type="submit" className="flex-1 bg-brand-black hover:bg-black/80">
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
                            const whatsappUrl = `https://wa.me/5491139549810?text=${encodeURIComponent(message)}`
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
                          <div className="w-12 h-12 bg-brand-gray rounded-lg flex items-center justify-center">
                            <info.icon className="h-6 w-6 text-brand-black" />
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
                          className="w-10 h-10 bg-brand-gray rounded-lg flex items-center justify-center hover:bg-black/10 transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="h-5 w-5 text-brand-black" />
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
              <div className="h-96 bg-gray-200 relative">
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
            </Card>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-xl font-bold text-gray-900 text-center mb-6">
              Preguntas Frecuentes
            </h4>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Cuál es el monto mínimo para invertir?</AccordionTrigger>
                <AccordionContent>
                  Podés invertir desde USD 5.000 en cualquiera de nuestros proyectos habilitados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>¿Qué rentabilidad ofrecen las inversiones?</AccordionTrigger>
                <AccordionContent>
                  Dependiendo del proyecto, estimamos retornos anuales entre el 8% y el 12%. Siempre brindamos un informe detallado previo a invertir.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>¿Puedo invertir si estoy fuera de Argentina?</AccordionTrigger>
                <AccordionContent>
                  Sí. Aceptamos inversores del exterior y ofrecemos acompañamiento legal y fiscal para cada caso.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>¿Qué pasa si el proyecto se retrasa?</AccordionTrigger>
                <AccordionContent>
                  Mantenemos comunicación constante y reportes mensuales. En caso de demoras, se ajustan los plazos estimados sin perder tu inversión.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>¿Qué documentación necesito para invertir?</AccordionTrigger>
                <AccordionContent>
                  Solo necesitás tu DNI o pasaporte vigente. Nosotros nos encargamos del resto con firma digital y contrato electrónico.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  )
}
