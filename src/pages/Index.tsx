import Header from "@/components/eleden/Header";
import Hero from "@/components/eleden/Hero";
import Outcomes from "@/components/eleden/Outcomes";
import Portfolio from "@/components/eleden/Portfolio";
import SystemSection from "@/components/eleden/SystemSection";
import About from "@/components/eleden/About";
import Packages from "@/components/eleden/Packages";
import FAQ from "@/components/eleden/FAQ";
import ContactCTA from "@/components/eleden/ContactCTA";
import Footer from "@/components/eleden/Footer";
import ScrollToTop from "@/components/eleden/ScrollToTop";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main>
        <Hero />
        <Outcomes />
        <Portfolio />
        <SystemSection />
        <About />
        <Packages />
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
