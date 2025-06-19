import { TrendingUp, Shield, MapPin, Users } from "lucide-react"

export default function InvestmentSection() {
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

  return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">¿Qué son las Inversiones Inmobiliarias?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invertí en desarrollos urbanos desde la etapa de construcción y obtené rendimientos superiores al mercado
              tradicional con total seguridad y transparencia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gray rounded-full mb-6">
                    <benefit.icon className="h-8 w-8 text-brand-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}
