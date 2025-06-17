
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
import CustomToast from "@/components/CustomToast";

// Create a context to share toast state globally
import { createContext, useContext } from "react";

interface ToastContextType {
  showToast: (message: string) => void;
  toastMessage: string;
  isToastVisible: boolean;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useGlobalToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useGlobalToast must be used within ToastProvider');
  }
  return context;
};

// Custom hook for toast functionality
const useCustomToast = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  return {
    toastMessage,
    isToastVisible,
    showToast,
    hideToast,
  };
};

// Custom wrapper to listen route changes with location
function AppWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { toastMessage, isToastVisible, showToast, hideToast } = useCustomToast();

  useEffect(() => {
    setLoading(true);
    // Simulasi waktu tunggu loading, bisa disesuaikan respons API
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, isToastVisible, hideToast }}>
      {loading && <PageSpinner />}
      <CustomToast 
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={hideToast}
      />
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
    </ToastContext.Provider>
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
