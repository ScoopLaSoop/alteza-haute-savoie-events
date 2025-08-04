import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Timeline } from "@/components/sections/Timeline";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { FAQ } from "@/components/sections/FAQ";
import { InteractiveMap } from "@/components/sections/InteractiveMap";
import { EventQuiz } from "@/components/sections/EventQuiz";
import { Team } from "@/components/sections/Team";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Contact } from "@/components/sections/Contact";
import { ContactModal } from "@/components/sections/ContactModal";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("accueil");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    
    // Smooth scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactModal = () => {
    setIsContactModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "services":
        return <Services onNavigate={handleNavigate} />;
      case "portfolio":
        return (
          <>
            <Portfolio />
            <BeforeAfter />
          </>
        );
      case "apropos":
        return (
          <>
            <About onNavigate={handleNavigate} />
            <Timeline />
            <Team />
          </>
        );
      case "contact":
        return <Contact />;
      case "quiz":
        return <EventQuiz />;
      case "faq":
        return <FAQ />;
      default:
        // Page d'accueil épurée selon le plan
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <About onNavigate={handleNavigate} />
            <ServicesPreview onNavigate={handleNavigate} />
            <Testimonials />
            
            {/* Bloc d'accroche "Projet à réaliser" */}
            <section className="py-16 px-4 bg-gradient-section-to-muted">
              <div className="container mx-auto max-w-4xl text-center">
                <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-3xl p-12 space-y-6">
                  <h2 className="text-3xl font-bold text-foreground">
                    Vous avez un projet d'événement ?
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Parlons-en dès maintenant ! Nos experts vous accompagnent de A à Z pour créer l'événement de vos rêves.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={handleContactModal}
                      size="lg"
                      className="min-w-[250px] bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-300 transform"
                    >
                      Demander un devis gratuit
                    </Button>
                    <Button 
                      onClick={() => handleNavigate("portfolio")}
                      variant="outline"
                      size="lg"
                      className="min-w-[250px]"
                    >
                      Découvrir nos réalisations
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-section-base">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="pt-20">
        {renderCurrentPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
