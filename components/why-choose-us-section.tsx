"use client";
import { Star, MapPin, Award, Users, Clock, Shield } from "lucide-react";
import { useEffect } from "react";

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: MapPin,
      title: "Mejores Ubicaciones",
      description:
        "Seleccionamos terrenos en zonas de alta plusvalía y crecimiento urbano",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Materiales premium y acabados de primera calidad en todos nuestros proyectos",
    },
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Más de 15 años de experiencia en desarrollo inmobiliario",
    },
    {
      icon: Clock,
      title: "Entrega a Tiempo",
      description: "Cumplimos con los plazos establecidos en cada proyecto",
    },
    {
      icon: Shield,
      title: "Transparencia Total",
      description: "Informes mensuales de avance y uso transparente de fondos",
    },
    {
      icon: Users,
      title: "Servicio postventa",
      description: "Acompañamiento y asistencia luego de la compra",
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-neutral-100 dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 items-center mb-16">
          {/* Texto izquierda */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-6">
              Somos líderes en desarrollo urbano con un historial comprobado de éxito.
            </p>
            <p className="text-neutral-700 dark:text-neutral-400">
              Nuestros proyectos combinan ubicación estratégica, calidad superior y transparencia total, asegurando resultados excepcionales para cada inversor.
            </p>
          </div>

          {/* Cards derecha */}
          <div className="grid sm:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 shadow-sm hover:shadow-md transition border border-neutral-200 dark:border-neutral-800"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-4">
                  <reason.icon className="h-6 w-6 text-black dark:text-neutral-100" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {reason.title}
                </h3>
                <p className="text-neutral-700 dark:text-neutral-400 text-sm">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reseñas deshabilitadas */}
        {/* 
        <div className="my-8">
          <div className="elfsight-app-xxxxxxx" data-elfsight-app-lazy></div>
        </div> 
        */}
      </div>
    </section>
  );
}
