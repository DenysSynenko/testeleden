import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Calculator from "./pages/Calculator";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/eleden/CookieBanner";
import RouteScrollToTop from "./components/RouteScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/faq" element={<FAQ />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
