import Image from "next/image";

export default function CompanyStats() {
  /* 
  Lucas Rodríguez – Socio Resp. Comercial
  Martín Rodríguez – Socio Resp. Administración/Finanzas
  David Salomón - Socio Resp. Arquitecto
  Agus Pedraza - Arquitecto
  Natalia Giraudo - Arquitecta
  Tomás Toranzo - Arquitecto
  Roberto Colazo - Administración
  Tomás Palacios – Resp. Marketing */

  const team = [
    {
      name: "David Salomón",
      role: "Socio Resp. Arquitecto",
      image: "/david.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Lucas Rodríguez",
      role: "Socio Resp. Comercial",
      image: "/lucas.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Martín Rodríguez",
      role: "Socio Resp. Administración/Finanzas",
      image: "/martin.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Agus Pedraza",
      role: "Arquitecto",
      image: "/agus.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Natalia Giraudo",
      role: "Arquitecta",
      image: "/nati.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Tomás Toranzo",
      role: "Arquitecto",
      image: "/tomi.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Roberto Colazo",
      role: "Administración",
      image: "/robert2.jpeg",
      description: "PONER DESCRIPCION",
    },
    {
      name: "Tomás Palacios",
      role: "Resp. Marketing",
      image: "/tomas.jpeg",
      description: "PONER DESCRIPCION",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ¿Qué hacemos?
          </h2>
          <p className="md:text-xl text-gray-600 max-w-3xl mx-auto">
            En Ingen Desarrollos elevamos tu estilo de vida. Nuestros proyectos están pensados para familias y personas que buscan su hogar ideal, pero también para inversores que valoran la solidez, la estética y el crecimiento sostenido.
          </p>
          <p className="md:text-xl mt-5 text-gray-600 max-w-3xl mx-auto">
            Nuestro diferencial está en cómo hacemos las cosas: con visión, compromiso y una estética cuidada que se siente en cada terminación, cada textura y cada línea de diseño. Apostamos a transformar el entorno urbano a través de obras que dialogan con la ciudad, generando valor a largo plazo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-rose-600 font-medium mb-3">{member.role}</p>
              {/* <p className="text-sm text-gray-600">{member.description}</p> */}
            </div>
          ))}
        </div>

        {/* <div className="bg-brand-gray rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Crear desarrollos urbanos sustentables que mejoren la calidad de vida de las personas mientras generamos
              oportunidades de inversión rentables y seguras para nuestros socios. Nos comprometemos con la excelencia, la
              transparencia y la innovación en cada proyecto.
            </p>
          </div> */}
      </div>
    </section>
  );
}
