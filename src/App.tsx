import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CookieBanner from "./components/eleden/CookieBanner";
import RouteScrollToTop from "./components/RouteScrollToTop";

/* Eager-load the home page (critical path) */
import Index from "./pages/Index";

/* Lazy-load all other pages — not needed on first paint */
const Impressum  = lazy(() => import("./pages/Impressum"));
const Privacy    = lazy(() => import("./pages/Privacy"));
const About      = lazy(() => import("./pages/About"));
const Calculator = lazy(() => import("./pages/Calculator"));
const FAQ        = lazy(() => import("./pages/FAQ"));
const Work       = lazy(() => import("./pages/Work"));
const NotFound   = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 min
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteScrollToTop />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/"           element={<Index />} />
                <Route path="/impressum"  element={<Impressum />} />
                <Route path="/privacy"    element={<Privacy />} />
                <Route path="/about"      element={<About />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/faq"        element={<FAQ />} />
                <Route path="/work"       element={<Work />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*"           element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieBanner />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
