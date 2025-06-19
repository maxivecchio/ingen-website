"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Emprendimientos", href: "/emprendimientos" },
    { name: "Propiedades", href: "/propiedades" },
    { name: "Forma Parte", href: "/forma-parte" },
    { name: "Construcción", href: "/construccion" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Novedades", href: "/novedades" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
      <header className="bg-white shadow-sm border-b">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-brand-black">
                UrbanDev
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-brand-dark px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                +52 1 984 879 0708
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                  {navigation.map((item) => (
                      <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-dark hover:bg-brand-gray"
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                  ))}
                </div>
              </div>
          )}
        </div>
      </header>
  )
}
