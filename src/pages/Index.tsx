import Header from "@/components/eleden/Header";
import Hero from "@/components/eleden/Hero";
import Packages from "@/components/eleden/Packages";
import WhoWeWorkWith from "@/components/eleden/WhoWeWorkWith";
import FAQ from "@/components/eleden/FAQ";
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
        <div id="services">
          <Packages />
        </div>
        <WhoWeWorkWith />
        <FAQ />
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
