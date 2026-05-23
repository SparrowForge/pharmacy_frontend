import { Navbar } from "@/src/components/landing/navbar"
import { HeroSection } from "@/src/components/landing/hero-section"
import { FeaturesSection } from "@/src/components/landing/features-section"
import { AIFeaturesSection } from "@/src/components/landing/ai-features-section"
import { SystemPreviewSection } from "@/src/components/landing/system-preview-section"
import { HowItWorksSection } from "@/src/components/landing/how-it-works-section"
import { PricingSection } from "@/src/components/landing/pricing-section"
import { TestimonialsSection } from "@/src/components/landing/testimonials-section"
import { ContactSection } from "@/src/components/landing/contact-section"
import { Footer } from "@/src/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AIFeaturesSection />
      <SystemPreviewSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
