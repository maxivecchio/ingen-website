"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Shield,
  Clock,
  Users,
  DollarSign,
  Calculator,
  CheckCircle,
  MessageCircle,
  MapPin,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { propertyService } from "@/components/api/properties-api";
import ContactFormFormaParte from "@/components/contact-secion-forma-parte";

export default function FormaPartePage() {
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [selectedProject, setSelectedProject] = useState("");

  const investmentBenefits = [
    {
      icon: TrendingUp,
      title: "Alta Rentabilidad",
      description: "Retornos de inversión superior al mercado tradicional",
    },
    {
      icon: Shield,
      title: "Inversión Segura",
      description: "Respaldo legal completo y garantías reales",
    },
    {
      icon: Clock,
      title: "Plazos Definidos",
      description: "Proyectos con cronogramas claros y etapas planificadas desde el inicio",
    },
    {
      icon: Users,
      title: "Servicio postventa",
      description: "Acompañamiento y asistencia luego de la compra",
    },
  ];

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
      features: [
        "Informes quincenales",
        "Visitas a obra",
        "Soporte prioritario",
        "Descuentos en futuras inversiones",
      ],
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
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Alta Rentabilidad",
      description:
        "Proyectos con retorno de inversión superior al mercado tradicional",
    },
    {
      icon: Shield,
      title: "Inversión Segura",
      description:
        "Respaldo legal completo y transparencia en cada etapa del proyecto",
    },
    {
      icon: MapPin,
      title: "Ubicaciones Premium",
      description:
        "Desarrollos en las mejores zonas con alta plusvalía garantizada",
    },
    {
      icon: Users,
      title: "Acompañamiento",
      description:
        "Asesoramiento personalizado durante todo el proceso de inversión",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Residencial Vista Verde",
      expectedReturn: "18%",
      duration: "18 meses",
    },
    {
      id: 2,
      name: "Torres del Sol",
      expectedReturn: "22%",
      duration: "12 meses",
    },
    {
      id: 3,
      name: "Complejo Urbano Plaza",
      expectedReturn: "25%",
      duration: "24 meses",
    },
  ];

  const calculateReturns = (amount: any, returnRate: any) => {
    const rate = Number.parseFloat(returnRate.replace("%", "")) / 100;
    return amount * rate;
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-gray to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Formá Parte de Nuestros Proyectos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invertí en desarrollos inmobiliarios de alta calidad y obtené
              rendimientos superiores al mercado tradicional
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
                  Formá parte de proyectos inmobiliarios cuidadosamente
                  seleccionados, con alto potencial de rentabilidad y
                  desarrollados por profesionales del sector.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Te acompañamos en cada paso del proceso con transparencia,
                  seguridad jurídica y opciones accesibles desde montos bajos.
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
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

        {/* Contact Form */}
        <ContactFormFormaParte />
      </main>
    </div>
  );
}
