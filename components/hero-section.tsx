import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
      <section className="relative bg-gradient-to-r from-brand-gray to-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Invertí en tu
                <span className="text-brand-black block">Futuro Inmobiliario</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Descubrí oportunidades únicas de inversión en desarrollos urbanos de alta calidad. Formá parte de
                proyectos exclusivos con la mejor ubicación y rentabilidad garantizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-brand-black hover:bg-brand-dark text-white">
                  <Link href="/forma-parte">Quiero Invertir</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/emprendimientos">Ver Proyectos</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-xl border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Necesitás ayuda para elegir tu inversión?</h3>
                <p className="text-gray-600 mb-4">Nuestros expertos te asesoran sin compromiso</p>
                <Button className="w-full bg-brand-black hover:bg-brand-dark text-white">Contactanos Ahora</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
