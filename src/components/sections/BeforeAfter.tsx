import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, ArrowLeftRight, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const BeforeAfter = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();

  const projects = [
    {
      title: "Transformation Château d'Annecy",
      type: "Mariage de prestige",
      before: "🏰",
      after: "💒",
      description: "Transformation complète de la grande salle du château pour un mariage de 150 invités. Passage d'un espace vide à un décor romantique et raffiné.",
      details: {
        before: "Salle vide avec murs en pierre apparente",
        after: "Décoration florale luxueuse, éclairage tamisé, drapés en soie"
      },
      stats: {
        budget: "25 000€",
        duration: "3 jours",
        guests: "150 invités"
      }
    },
    {
      title: "Métamorphose Villa Lac Léman",
      type: "Événement corporate",
      before: "🏢",
      after: "🎭",
      description: "Transformation d'une villa classique en espace de gala moderne pour le lancement produit d'une entreprise tech.",
      details: {
        before: "Salon traditionnel avec mobilier classique",
        after: "Espace high-tech avec éclairage LED, écrans interactifs"
      },
      stats: {
        budget: "40 000€",
        duration: "2 jours",
        guests: "200 participants"
      }
    },
    {
      title: "Rénovation Chalet Montagne",
      type: "Anniversaire familial",
      before: "🏔️",
      after: "🎉",
      description: "Adaptation d'un chalet traditionnel en espace festif pour un anniversaire des 70 ans avec 80 membres de la famille.",
      details: {
        before: "Chalet rustique avec décoration montagnarde",
        after: "Espace chaleureux mêlant tradition et modernité festive"
      },
      stats: {
        budget: "15 000€",
        duration: "1 jour",
        guests: "80 invités"
      }
    }
  ];

  const updateSliderPosition = (clientX: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      updateSliderPosition(e.clientX, e.currentTarget);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateSliderPosition(e.clientX, e.currentTarget);
  };

  // Gestion des événements tactiles pour mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX, e.currentTarget);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX, e.currentTarget);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <Wand2 className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">Transformations spectaculaires</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Avant / Après
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Découvrez comment nous transformons des espaces ordinaires en lieux d'exception pour vos événements
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-elegant ${
                activeProject === index
                  ? 'bg-primary text-primary-foreground shadow-gold'
                  : 'bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-foreground'
              }`}
            >
              {project.type}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Before/After Viewer */}
            <div className="animate-fade-in-left">
              <Card className="bg-gradient-card border-border shadow-luxury overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="relative h-96 cursor-ew-resize select-none"
                    onMouseMove={handleSliderMove}
                    onClick={handleClick}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    style={{ 
                      touchAction: "none",
                      WebkitUserSelect: "none",
                      userSelect: "none"
                    }}
                  >
                    {/* Before Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">{projects[activeProject].before}</div>
                        <Badge variant="outline" className="text-xs">AVANT</Badge>
                      </div>
                    </div>

                    {/* After Image */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                      <div className="text-center">
                        <div className="text-8xl mb-4">{projects[activeProject].after}</div>
                        <Badge className="text-xs bg-primary text-primary-foreground">APRÈS</Badge>
                      </div>
                    </div>

                    {/* Slider Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-ew-resize pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    />
                    
                    {/* Slider Control Button */}
                    <div 
                      className={`absolute z-20 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 pointer-events-none ${
                        isMobile ? "w-12 h-12" : "w-8 h-8"
                      } ${isDragging ? "scale-110 shadow-xl" : "hover:scale-105"}`}
                      style={{ 
                        left: `${sliderPosition}%`, 
                        top: "50%", 
                        transform: "translate(-50%, -50%)" 
                      }}
                    >
                      <ArrowLeftRight className={`text-primary transition-all duration-200 ${
                        isMobile ? "w-6 h-6" : "w-4 h-4"
                      } ${isDragging && "scale-110"}`} />
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-elegant backdrop-blur-sm pointer-events-none">
                      <span className="hidden md:inline">Glissez ou cliquez pour comparer</span>
                      <span className="md:hidden">👆 Touchez et glissez</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Details */}
            <div className="animate-fade-in-right">
              <Card className="bg-gradient-card border-border shadow-luxury">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Badge className="mb-4 bg-primary/20 text-primary">
                      {projects[activeProject].type}
                    </Badge>
                    <h3 className="text-3xl font-luxury text-foreground mb-4">
                      {projects[activeProject].title}
                    </h3>
                    <p className="text-muted-foreground font-elegant leading-relaxed">
                      {projects[activeProject].description}
                    </p>
                  </div>

                  {/* Before/After Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <h4 className="flex items-center text-lg font-elegant text-foreground">
                        <div className="w-4 h-4 bg-muted rounded mr-3"></div>
                        Avant
                      </h4>
                      <p className="text-sm text-muted-foreground font-elegant">
                        {projects[activeProject].details.before}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="flex items-center text-lg font-elegant text-foreground">
                        <Sparkles className="w-4 h-4 text-primary mr-3" />
                        Après
                      </h4>
                      <p className="text-sm text-muted-foreground font-elegant">
                        {projects[activeProject].details.after}
                      </p>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                    <div className="text-center">
                      <div className="text-xl font-luxury text-primary mb-1">
                        {projects[activeProject].stats.budget}
                      </div>
                      <div className="text-xs text-muted-foreground font-elegant">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-luxury text-primary mb-1">
                        {projects[activeProject].stats.duration}
                      </div>
                      <div className="text-xs text-muted-foreground font-elegant">Installation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-luxury text-primary mb-1">
                        {projects[activeProject].stats.guests}
                      </div>
                      <div className="text-xs text-muted-foreground font-elegant">Capacité</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <p className="text-muted-foreground font-elegant mb-4">
              Imaginez ce que nous pourrions créer pour votre événement
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-elegant text-primary">100% des transformations dépassent les attentes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};