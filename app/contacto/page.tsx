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
import ContactFomrContacto from "@/components/contact-form-contacto"

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
      details: ["Av. Principal 1234, Piso 123", "Centro Empresarial", "Ciudad, Provincia 12345"],
    },
    {
      icon: Phone,
      title: "Teléfonos",
      details: ["+54 9 11 2345-6789 (Principal)", "+54 9 11 2345-6789 (Ventas)", "+54 9 11 2345-6789 (Inversiones)"],
    },
    {
      icon: Mail,
      title: "Emails",
      details: ["contacto@ingendesarrollos.com.ar"],
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
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 dark:from-neutral-800 dark:to-neutral-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contactanos</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Ponete en contacto con nosotros para cualquier consulta sobre nuestros
              proyectos e inversiones
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <ContactFomrContacto />

        {/* Map Section */}
        <section className="py-16 bg-gray-50 dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Nuestra Ubicación</h2>
              <p className="text-xl text-gray-600 dark:text-white">Visitanos en nuestras oficinas centrales</p>
            </div>

            <Card className="overflow-hidden shadow-lg">
              <div className=" bg-gray-200 relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210.55965921263282!2d-63.26071728050357!3d-32.393580095367156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cc4308a4d1c5bb%3A0x33971dd52b68922c!2sIngen%20Desarrollos!5e0!3m2!1ses!2sar!4v1753390438845!5m2!1ses!2sar" width="100%" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </Card>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-16 dark:bg-black transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Preguntas Frecuentes
            </h4>

            <Accordion
              type="single"
              collapsible
              className="max-w-3xl mx-auto space-y-4"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  ¿Por qué invertir en un proyecto de Ingen?
                </AccordionTrigger>
                <AccordionContent>
                  Porque combinamos diseño moderno, materiales de primera
                  calidad y ubicaciones estratégicas que aseguran alta
                  rentabilidad y plusvalía futura.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  ¿Qué diferencia a Ingen de otras desarrolladoras?
                </AccordionTrigger>
                <AccordionContent>
                  Nuestro enfoque está en crear viviendas modernas con ubicaciones privilegiadas y detalles diferenciales como mayor iluminación natural, eficiencia en el uso del espacio y terminaciones de alta calidad, sumado a un trato personalizado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  ¿Ofrecen planes de financiación?
                </AccordionTrigger>
                <AccordionContent>
                  Sí, contamos con planes de pago flexibles durante la etapa de
                  obra, adaptados a las necesidades de cada cliente para que
                  acceder a tu nuevo hogar sea más simple.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  ¿En qué barrios o zonas están ubicados los proyectos?
                </AccordionTrigger>
                <AccordionContent>
                  Trabajamos principalmente en barrios de alto valor y zonas
                  urbanas en crecimiento, seleccionadas estratégicamente para
                  garantizar seguridad, accesibilidad y potencial de
                  valorización.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  ¿Cómo puedo obtener más información o asesoramiento?
                </AccordionTrigger>
                <AccordionContent>
                  Podés contactarnos a través del formulario web, WhatsApp o
                  visitarnos en nuestras oficinas. Un asesor te acompañará en
                  todo el proceso.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  )
}
