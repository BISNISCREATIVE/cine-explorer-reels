
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import MovieDetail from "@/pages/MovieDetail";
import TrailerPage from "@/pages/TrailerPage";
import Favorites from "@/pages/Favorites";
import Search from "@/pages/Search";
import NotFound from "./pages/NotFound";
import PageSpinner from "@/components/ui/PageSpinner";

// Custom wrapper to listen route changes with location
function AppWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulasi waktu tunggu loading, bisa disesuaikan respons API
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <PageSpinner />}
      <div className="min-h-screen bg-black" style={{ filter: loading ? "blur(2px)" : "none" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/trailer/:id" element={<TrailerPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppWithLoader />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
