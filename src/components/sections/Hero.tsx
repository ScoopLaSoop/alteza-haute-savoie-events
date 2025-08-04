import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Mountain, Heart } from "lucide-react";
import heroImage from "@/assets/hero-wedding.jpg";
interface HeroProps {
  onNavigate: (page: string) => void;
}
export const Hero = ({
  onNavigate
}: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [{
    title: "ALTÉZA EVEN'T",
    subtitle: "Créateur d'événements d'exception",
    description: "Depuis les sommets enneigés aux rives du lac d'Annecy, nous orchestrons vos moments les plus précieux avec élégance et créativité.",
    image: heroImage
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-all duration-[8000ms] ease-in-out" style={{
        backgroundImage: `url(${heroSlides[currentSlide].image})`
      }} />
        
        {/* Floating Elements for Parallax Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{
          animationDelay: '0s'
        }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/20 rounded-full animate-float" style={{
          animationDelay: '2s'
        }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/40 rounded-full animate-float" style={{
          animationDelay: '4s'
        }} />
        </div>
      </div>
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Alpine Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8 animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            <Mountain className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">Agence événementielle de prestige en Haute-Savoie</span>
          </div>
          
          {/* Main Heading with Luxury Animation */}
          <h1 className="text-6xl md:text-8xl font-luxury text-white mb-8 leading-tight">
            <span className="inline-block animate-fade-in-up" style={{
            animationDelay: '0.4s'
          }}>
              ALTÉZA
            </span>
            <span className="block text-primary animate-fade-in-up" style={{
            animationDelay: '0.6s'
          }}>
              EVEN'T
            </span>
          </h1>
          
          {/* Dynamic Subheading */}
          <p className="text-2xl md:text-3xl text-white/95 mb-6 font-elegant leading-relaxed animate-fade-in-up" style={{
          animationDelay: '0.8s'
        }}>
            {heroSlides[currentSlide].subtitle}
          </p>
          
          {/* Description with Enhanced Styling */}
          <p className="text-lg md:text-xl text-white/85 mb-12 max-w-3xl mx-auto font-elegant leading-relaxed animate-fade-in-up" style={{
          animationDelay: '1s'
        }}>
            {heroSlides[currentSlide].description}
          </p>
          
          {/* Interactive Call to Action Buttons - CTA mis en avant */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{
          animationDelay: '1.2s'
        }}>
            
            
            <Button onClick={() => onNavigate("portfolio")} variant="outline" size="lg" className="group border-2 border-white/50 text-white hover:bg-white/10 hover:border-primary/70 font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Découvrir nos réalisations
            </Button>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{
          animationDelay: '1.4s'
        }}>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-luxury text-primary mb-2 group-hover:scale-110 transition-transform">200+</div>
              <div className="text-sm text-white/70 font-elegant">Événements réalisés</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-luxury text-primary mb-2 group-hover:scale-110 transition-transform">8</div>
              <div className="text-sm text-white/70 font-elegant">Années d'expérience</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-luxury text-primary mb-2 group-hover:scale-110 transition-transform">98%</div>
              <div className="text-sm text-white/70 font-elegant">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Slide Indicators (for future multiple slides) */}
      {heroSlides.length > 1 && <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => <button key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-primary scale-125' : 'bg-white/30 hover:bg-white/50'}`} onClick={() => setCurrentSlide(index)} />)}
        </div>}
    </section>;
};