import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 lg:py-32"
      style={{ backgroundImage: "url('/portadaweb.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Invertí en tu
              <span className="text-white block">Futuro Inmobiliario</span>
            </h1>
            <p className="md:text-xl text-white mb-8 leading-relaxed">
              Descubrí oportunidades únicas de inversión en desarrollos urbanos de alta calidad. Formá parte de
              proyectos exclusivos con la mejor ubicación y rentabilidad garantizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-black hover:bg-brand-dark text-white">
                <Link href="/forma-parte">Quiero Invertir</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white bg-transparent hover:text-white hover:bg-white/10">
                <Link href="/emprendimientos">Ver Proyectos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
