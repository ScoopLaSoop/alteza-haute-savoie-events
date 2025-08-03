import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-wedding.jpg";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-luxury text-white mb-6 animate-fade-in">
          ALTÉZA EVEN'T
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 font-elegant animate-fade-in [animation-delay:0.2s]">
          Agence événementielle d'exception en Haute-Savoie
        </p>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto font-elegant animate-fade-in [animation-delay:0.4s]">
          Créateurs de moments inoubliables, nous transformons vos rêves en réalité avec élégance, émotion et professionnalisme.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.6s]">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => onNavigate("services")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-8 py-4 text-lg"
          >
            Découvrir nos services
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onNavigate("contact")}
            className="border-white text-white hover:bg-white hover:text-background font-elegant px-8 py-4 text-lg"
          >
            Nous contacter
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};