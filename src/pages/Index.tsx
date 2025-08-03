import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Timeline } from "@/components/sections/Timeline";
import { Portfolio } from "@/components/sections/Portfolio";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("accueil");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    
    // Smooth scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "services":
        return <Services onNavigate={handleNavigate} />;
      case "portfolio":
        return <Portfolio />;
      case "apropos":
        return <About onNavigate={handleNavigate} />;
      case "contact":
        return <Contact />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Services onNavigate={handleNavigate} />
            <Timeline />
            <Portfolio />
            <BeforeAfter />
            <Testimonials />
            <About onNavigate={handleNavigate} />
            <FAQ />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="pt-20">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
