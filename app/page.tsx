import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import InvestmentSection from "@/components/investment-section"
import ProjectsSection from "@/components/projects-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import PropertiesSection from "@/components/properties-section"
import AboutUsSection from "@/components/about-us-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <InvestmentSection />
        <ProjectsSection />
        <WhyChooseUsSection />
        <PropertiesSection />
        <AboutUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
