import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { MobileBeforeAfterSlider } from "@/components/ui/mobile-before-after-slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModificationsBlock } from "@/components/sections/ModificationsBlock";
import { ChevronLeft, ChevronRight, Eye, Play, X, MapPin, Calendar, Users, Award } from "lucide-react";
import mariageImg from "@/assets/service-mariage.jpg";
import anniversaireImg from "@/assets/service-anniversaire.jpg";
import evjfImg from "@/assets/service-evjf.jpg";
import corporateImg from "@/assets/service-corporate.jpg";
import heroImg from "@/assets/hero-wedding.jpg";

export const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const portfolioItems = [
    {
      title: "Mariage de prestige au Château",
      category: "Mariage",
      description: "Un mariage féérique dans un château de Haute-Savoie avec vue sur les montagnes, décorations florales somptueuses et réception en plein air.",
      image: heroImg,
      location: "Château d'Annecy",
      date: "15 juin 2024",
      guests: 150,
      budget: "35 000€",
      details: ["150 invités", "Cérémonie + Réception", "Décoration florale"],
      gallery: [heroImg, mariageImg],
      beforeImage: heroImg,
      afterImage: mariageImg,
      testimonial: {
        text: "Une journée absolument magique ! Chaque détail était parfait.",
        author: "Marie & Pierre Dubois"
      },
      challenges: "Gestion de la météo capricieuse et coordination de 15 prestataires",
      solution: "Installation de chapiteaux transparents et planning détaillé"
    },
    {
      title: "Mariage romantique en montagne",
      category: "Mariage",
      description: "Cérémonie intimiste face aux sommets alpins, suivie d'une réception chaleureuse avec décoration naturelle et élégante.",
      image: mariageImg,
      location: "Chamonix",
      date: "28 août 2024",
      guests: 80,
      budget: "22 000€",
      details: ["80 invités", "Cérémonie outdoor", "Ambiance montagne"],
      gallery: [mariageImg, heroImg],
      beforeImage: mariageImg,
      afterImage: heroImg,
      testimonial: {
        text: "Un cadre de rêve pour notre union, tout était parfait !",
        author: "Sophie & Marc"
      },
      challenges: "Accès difficile au site en montagne",
      solution: "Transport 4x4 pour le matériel et sentier sécurisé pour les invités"
    },
    {
      title: "Anniversaire des 50 ans - Thème Or",
      category: "Anniversaire",
      description: "Célébration élégante avec thématique dorée, mise en scène sophistiquée et animations personnalisées pour une soirée mémorable.",
      image: anniversaireImg,
      location: "Villa du Lac",
      date: "12 septembre 2024",
      guests: 100,
      budget: "18 000€",
      details: ["100 invités", "Thème doré", "DJ + Animations"],
      gallery: [anniversaireImg, corporateImg],
      beforeImage: anniversaireImg,
      afterImage: corporateImg,
      testimonial: {
        text: "Une soirée inoubliable qui a dépassé toutes mes attentes !",
        author: "Claire Martin"
      },
      challenges: "Décoration thématique complexe avec contraintes de budget",
      solution: "Partenariats locaux et créativité pour optimiser les coûts"
    },
    {
      title: "EVJF Glamour à Annecy",
      category: "EVJF",
      description: "Enterrement de vie de jeune fille chic et festif avec activités spa, brunch glamour et soirée dansante au bord du lac.",
      image: evjfImg,
      location: "Annecy",
      date: "5 mai 2024",
      guests: 12,
      budget: "3 500€",
      details: ["12 participantes", "Spa + Brunch", "Soirée lac"],
      gallery: [evjfImg, anniversaireImg],
      beforeImage: evjfImg,
      afterImage: anniversaireImg,
      testimonial: {
        text: "Le plus bel EVJF possible ! Mes amies en parlent encore.",
        author: "Sarah et ses amies"
      },
      challenges: "Coordination de multiples activités sur une journée",
      solution: "Planning minuté et transport privé entre les lieux"
    },
    {
      title: "Séminaire Corporate Innovation",
      category: "Entreprise",
      description: "Événement d'entreprise moderne avec conférences inspirantes, team-building créatif et dîner de gala pour 200 collaborateurs.",
      image: corporateImg,
      location: "Centre de Congrès Megève",
      date: "20 octobre 2024",
      guests: 200,
      budget: "45 000€",
      details: ["200 participants", "Conférences", "Team building"],
      gallery: [corporateImg, heroImg],
      beforeImage: corporateImg,
      afterImage: heroImg,
      testimonial: {
        text: "Un événement corporate d'exception qui a fédéré nos équipes.",
        author: "Jean-Michel Rousseau, DG TechAlpes"
      },
      challenges: "Logistique complexe et besoins techniques spécifiques",
      solution: "Équipe technique dédiée et répétitions préalables"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const categories = ["Tous", "Mariage", "Anniversaire", "EVJF", "Entreprise"];
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredItems = selectedCategory === "Tous" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openLightbox = (project: any) => {
    setSelectedProject(project);
    setLightboxOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up">
            Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Découvrez nos réalisations et laissez-vous inspirer par la diversité et la qualité de nos événements organisés en Haute-Savoie.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`font-elegant transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground shadow-gold" 
                    : "border-border text-foreground hover:bg-secondary hover:scale-105"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Carousel */}
        <div className="relative mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Card className="overflow-hidden bg-gradient-card border-border shadow-luxury">
            {/* Mobile-first: fixed aspect ratio to avoid bad cropping + swipe */}
            <div
              className="relative aspect-[4/5] sm:aspect-[3/4] md:h-[500px] md:aspect-auto touch-pan-y select-none"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                setDragX(0);
                setIsTouching(true);
              }}
              onTouchMove={(e) => {
                if (touchStartX.current !== null) {
                  const dx = e.touches[0].clientX - touchStartX.current;
                  setDragX(dx);
                }
              }}
              onTouchEnd={() => {
                if (Math.abs(dragX) > 50) {
                  dragX < 0 ? nextSlide() : prevSlide();
                }
                setDragX(0);
                setIsTouching(false);
                touchStartX.current = null;
              }}
            >
              <div
                className={`absolute inset-0 will-change-transform ${isTouching ? '' : 'transition-transform duration-200 ease-out'}`}
                style={{ transform: dragX ? `translateX(${dragX}px)` : undefined }}
              >
                <img 
                  src={portfolioItems[currentIndex].image} 
                  alt={portfolioItems[currentIndex].title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Enhanced Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                  <div className="max-w-4xl grid md:grid-cols-3 gap-4 md:gap-6">
                    <div className="md:col-span-2">
                      <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-elegant inline-block mb-3 backdrop-blur-sm">
                        {portfolioItems[currentIndex].category}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-luxury mb-3">
                        {portfolioItems[currentIndex].title}
                      </h3>
                      <p className="text-white/90 font-elegant mb-4 line-clamp-3 md:line-clamp-none">
                        {portfolioItems[currentIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        {portfolioItems[currentIndex].details.map((detail) => (
                          <span key={detail} className="bg-white/10 px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-white/80">
                        <MapPin className="w-4 h-4 mr-2" />
                        {portfolioItems[currentIndex].location}
                      </div>
                      <div className="flex items-center text-sm text-white/80">
                        <Calendar className="w-4 h-4 mr-2" />
                        {portfolioItems[currentIndex].date}
                      </div>
                      <div className="flex items-center text-sm text-white/80">
                        <Users className="w-4 h-4 mr-2" />
                        {portfolioItems[currentIndex].guests} invités
                      </div>
                      <Button 
                        onClick={() => openLightbox(portfolioItems[currentIndex])}
                        variant="outline"
                        size="sm"
                        className="mt-2 md:mt-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons - hidden on mobile to avoid overlap */}
              <Button
                aria-label="Slide précédent"
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="hidden md:inline-flex absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                aria-label="Slide suivant"
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Dots Indicator - centered on mobile */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {portfolioItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Aller au slide ${index + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-primary scale-110" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredItems.map((item, index) => (
            <Card 
              key={`${item.title}-${index}`} 
              className="group overflow-hidden bg-gradient-card border-border hover:shadow-luxury transition-all duration-500 cursor-pointer animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-4 text-xs text-white/80 mb-2">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {item.guests}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-luxury text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground font-elegant leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.details.slice(0, 2).map((detail) => (
                      <span key={detail} className="bg-secondary px-2 py-1 rounded text-xs font-elegant text-foreground">
                        {detail}
                      </span>
                    ))}
                  </div>
                  <Award className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-border">
            {selectedProject && (
              <div className="space-y-6">
                {/* Header */}
                <div className="relative">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-elegant inline-block mb-2 backdrop-blur-sm">
                      {selectedProject.category}
                    </div>
                    <h3 className="text-2xl font-luxury">{selectedProject.title}</h3>
                  </div>
                </div>

                {/* Project Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-luxury text-foreground">Détails du projet</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-primary mr-3" />
                        <span className="font-elegant text-foreground">{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-primary mr-3" />
                        <span className="font-elegant text-foreground">{selectedProject.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-primary mr-3" />
                        <span className="font-elegant text-foreground">{selectedProject.guests} invités</span>
                      </div>
                      <div className="bg-secondary p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground font-elegant">Budget indicatif</p>
                        <p className="text-lg font-luxury text-primary">{selectedProject.budget}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-luxury text-foreground">Défis & Solutions</h4>
                    <div className="space-y-3">
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground font-elegant mb-2">Défi principal :</p>
                        <p className="text-foreground font-elegant">{selectedProject.challenges}</p>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm text-primary font-elegant mb-2">Notre solution :</p>
                        <p className="text-foreground font-elegant">{selectedProject.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Before/After Slider */}
                <div className="space-y-4">
                  <h4 className="text-xl font-luxury text-foreground">Transformation avant/après</h4>
                  {isMobile ? (
                    <MobileBeforeAfterSlider
                      beforeImage={selectedProject.beforeImage}
                      afterImage={selectedProject.afterImage}
                      beforeAlt={`${selectedProject.title} - avant transformation`}
                      afterAlt={`${selectedProject.title} - après transformation`}
                      className="h-64 md:h-96"
                    />
                  ) : (
                    <BeforeAfterSlider
                      beforeImage={selectedProject.beforeImage}
                      afterImage={selectedProject.afterImage}
                      beforeAlt={`${selectedProject.title} - avant transformation`}
                      afterAlt={`${selectedProject.title} - après transformation`}
                      className="h-64 md:h-96"
                    />
                  )}
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" className="text-sm">
                      Voir plus d'images
                    </Button>
                  </div>
                </div>

                {/* Modifications Block */}
                <ModificationsBlock
                  beforeGuests={selectedProject.guests - 30}
                  afterGuests={selectedProject.guests}
                  setupTime="5 h"
                />

                {/* Testimonial */}
                <div className="bg-gradient-accent/10 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-elegant italic mb-2">
                        "{selectedProject.testimonial.text}"
                      </p>
                      <p className="text-sm text-primary font-elegant">
                        — {selectedProject.testimonial.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground font-elegant mb-6">
            Chaque événement est unique et reflète la personnalité de nos clients. 
            Découvrez comment nous pouvons créer le vôtre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-8 py-4"
            >
              Discuter de votre projet
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 font-elegant px-8 py-4"
            >
              <Play className="w-5 h-5 mr-2" />
              Voir nos vidéos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};