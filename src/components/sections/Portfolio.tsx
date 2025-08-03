import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import mariageImg from "@/assets/service-mariage.jpg";
import anniversaireImg from "@/assets/service-anniversaire.jpg";
import evjfImg from "@/assets/service-evjf.jpg";
import corporateImg from "@/assets/service-corporate.jpg";
import heroImg from "@/assets/hero-wedding.jpg";

export const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const portfolioItems = [
    {
      title: "Mariage de prestige au Château",
      category: "Mariage",
      description: "Un mariage féérique dans un château de Haute-Savoie avec vue sur les montagnes, décorations florales somptueuses et réception en plein air.",
      image: heroImg,
      details: ["150 invités", "Cérémonie + Réception", "Décoration florale"]
    },
    {
      title: "Mariage romantique en montagne",
      category: "Mariage",
      description: "Cérémonie intimiste face aux sommets alpins, suivie d'une réception chaleureuse avec décoration naturelle et élégante.",
      image: mariageImg,
      details: ["80 invités", "Cérémonie outdoor", "Ambiance montagne"]
    },
    {
      title: "Anniversaire des 50 ans - Thème Or",
      category: "Anniversaire",
      description: "Célébration élégante avec thématique dorée, mise en scène sophistiquée et animations personnalisées pour une soirée mémorable.",
      image: anniversaireImg,
      details: ["100 invités", "Thème doré", "DJ + Animations"]
    },
    {
      title: "EVJF Glamour à Annecy",
      category: "EVJF",
      description: "Enterrement de vie de jeune fille chic et festif avec activités spa, brunch glamour et soirée dansante au bord du lac.",
      image: evjfImg,
      details: ["12 participantes", "Spa + Brunch", "Soirée lac"]
    },
    {
      title: "Séminaire Corporate Innovation",
      category: "Entreprise",
      description: "Événement d'entreprise moderne avec conférences inspirantes, team-building créatif et dîner de gala pour 200 collaborateurs.",
      image: corporateImg,
      details: ["200 participants", "Conférences", "Team building"]
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

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
            Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant mb-8">
            Découvrez nos réalisations et laissez-vous inspirer par la diversité et la qualité de nos événements organisés en Haute-Savoie.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`font-elegant ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border text-foreground hover:bg-secondary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Carousel */}
        <div className="relative mb-16">
          <Card className="overflow-hidden bg-gradient-card border-border">
            <div className="relative h-96 md:h-[500px]">
              <img 
                src={portfolioItems[currentIndex].image} 
                alt={portfolioItems[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-2xl">
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-elegant inline-block mb-3">
                    {portfolioItems[currentIndex].category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-luxury mb-3">
                    {portfolioItems[currentIndex].title}
                  </h3>
                  <p className="text-white/90 font-elegant mb-4">
                    {portfolioItems[currentIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {portfolioItems[currentIndex].details.map((detail) => (
                      <span key={detail} className="bg-white/10 px-3 py-1 rounded-full text-sm font-elegant">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 right-8 flex space-x-2">
                {portfolioItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card key={`${item.title}-${index}`} className="group overflow-hidden bg-gradient-card border-border hover:shadow-luxury transition-all duration-500 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-elegant backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-luxury text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-elegant leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.details.map((detail) => (
                    <span key={detail} className="bg-secondary px-2 py-1 rounded text-xs font-elegant text-foreground">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground font-elegant mb-6">
            Chaque événement est unique et reflète la personnalité de nos clients. 
            Découvrez comment nous pouvons créer le vôtre.
          </p>
          <Button 
            variant="default"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-8 py-4"
          >
            Discuter de votre projet
          </Button>
        </div>
      </div>
    </section>
  );
};