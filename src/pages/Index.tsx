import Header from "@/components/eleden/Header";
import Hero from "@/components/eleden/Hero";
import WorksSection from "@/components/eleden/WorksSection";
import Packages from "@/components/eleden/Packages";
import ContactCTA from "@/components/eleden/ContactCTA";
import Footer from "@/components/eleden/Footer";
import ScrollToTop from "@/components/eleden/ScrollToTop";
import FloatingParticles from "@/components/eleden/FloatingParticles";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Floating green particles */}
      <FloatingParticles />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        <Hero />
        <WorksSection />
        <div id="services">
          <Packages />
        </div>
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
