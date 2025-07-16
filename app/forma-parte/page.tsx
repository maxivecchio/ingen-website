"use client"

import { useCallback, useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Shield, Clock, Users, DollarSign, Calculator, CheckCircle, MessageCircle, MapPin } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { propertyService } from "@/components/api/properties-api"
import ContactFormFormaParte from "@/components/contact-secion-forma-parte"

export default function FormaPartePage() {
  const [investmentAmount, setInvestmentAmount] = useState(50000)
  const [selectedProject, setSelectedProject] = useState("")

  const investmentBenefits = [
    {
      icon: TrendingUp,
      title: "Alta Rentabilidad",
      description: "Retornos del 18% al 25% anual según el proyecto",
    },
    {
      icon: Shield,
      title: "Inversión Segura",
      description: "Respaldo legal completo y garantías reales",
    },
    {
      icon: Clock,
      title: "Plazos Definidos",
      description: "Proyectos con cronogramas claros de 12 a 24 meses",
    },
    {
      icon: Users,
      title: "Acompañamiento",
      description: "Asesoramiento personalizado durante todo el proceso",
    },
  ]

  const investmentOptions = [
    {
      name: "Inversor Inicial",
      minAmount: 25000,
      maxAmount: 75000,
      expectedReturn: "18-20%",
      features: ["Informes mensuales", "Acceso a plataforma", "Soporte básico"],
      color: "bg-blue-50 border-blue-200",
    },
    {
      name: "Inversor Premium",
      minAmount: 75000,
      maxAmount: 200000,
      expectedReturn: "20-23%",
      features: ["Informes quincenales", "Visitas a obra", "Soporte prioritario", "Descuentos en futuras inversiones"],
      color: "bg-rose-50 border-rose-200",
      popular: true,
    },
    {
      name: "Inversor VIP",
      minAmount: 200000,
      maxAmount: 500000,
      expectedReturn: "23-25%",
      features: [
        "Informes semanales",
        "Acceso exclusivo",
        "Asesor dedicado",
        "Participación en decisiones",
        "Beneficios especiales",
      ],
      color: "bg-amber-50 border-amber-200",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Alta Rentabilidad",
      description: "Proyectos con retorno de inversión superior al mercado tradicional",
    },
    {
      icon: Shield,
      title: "Inversión Segura",
      description: "Respaldo legal completo y transparencia en cada etapa del proyecto",
    },
    {
      icon: MapPin,
      title: "Ubicaciones Premium",
      description: "Desarrollos en las mejores zonas con alta plusvalía garantizada",
    },
    {
      icon: Users,
      title: "Acompañamiento",
      description: "Asesoramiento personalizado durante todo el proceso de inversión",
    },
  ]

  const projects = [
    { id: 1, name: "Residencial Vista Verde", expectedReturn: "18%", duration: "18 meses" },
    { id: 2, name: "Torres del Sol", expectedReturn: "22%", duration: "12 meses" },
    { id: 3, name: "Complejo Urbano Plaza", expectedReturn: "25%", duration: "24 meses" },
  ]

  const calculateReturns = (amount: any, returnRate: any) => {
    const rate = Number.parseFloat(returnRate.replace("%", "")) / 100
    return amount * rate
  }

 

  return (
    <div className="min-h-screen bg-white">
      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Formá Parte de Nuestros Proyectos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invertí en desarrollos inmobiliarios de alta calidad y obtené rendimientos superiores al mercado
              tradicional
            </p>
          </div>
        </section>


        {/* Investment Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Texto a la izquierda */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  ¿Por Qué Invertir con Nosotros?
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Formá parte de proyectos inmobiliarios cuidadosamente seleccionados, con alto potencial de rentabilidad y desarrollados por profesionales del sector.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Te acompañamos en cada paso del proceso con transparencia, seguridad jurídica y opciones accesibles desde montos bajos.
                </p>
              </div>

              {/* Cards a la derecha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {investmentBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gray transition">
                      <benefit.icon className="w-6 h-6 text-brand-black transition" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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


        {/* Contact Form */}
        <ContactFormFormaParte />
      </main>
    </div>
  )
}
