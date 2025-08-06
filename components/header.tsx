"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import TabComponentFrame from "./TabComponentFrame"
import Image from "next/image" // Import Image component

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
    // "Contacto" will be handled as a separate button
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-[40]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/logo.png" width={120} height={32} alt="INGEN DESARROLLOS Logo" className="h-8 w-auto" />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden min-[1300px]:flex space-x-8">
            <TabComponentFrame
              tabs={navigation}
              /* disabledList={["Construcción"]} */
              setActiveTab={(tab) => console.log(tab)}
            />
          </nav>
          {/* Contact Info and Button */}
          <div className="hidden min-[1300px]:flex items-center space-x-4">
            <Button asChild className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium">
              <Link href="/contacto">Contacto</Link>
            </Button>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              +54 935 1552-1325
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="min-[1300px]:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 shadow-lg inset-x-0">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Contact Button */}
              <Button asChild className="w-full bg-black text-white hover:bg-gray-800 mt-2">
                <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
                  Contacto
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
