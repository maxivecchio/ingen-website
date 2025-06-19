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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto a la izquierda */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              ¿Qué son las Inversiones Inmobiliarias?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Invertí en desarrollos urbanos desde la etapa de construcción y obtené rendimientos superiores al mercado
              tradicional con total seguridad y transparencia.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Accedé a oportunidades exclusivas con el respaldo de expertos y el potencial de zonas en crecimiento.
            </p>
          </div>

          {/* Cards a la derecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
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
  )
}
