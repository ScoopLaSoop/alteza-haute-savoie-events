import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Marie & Pierre Dubois",
      role: "Mariés du 15 juin 2024",
      company: "Mariage au Château d'Annecy",
      content: "ALTÉZA EVEN'T a transformé notre rêve en réalité. Chaque détail était parfait, de la décoration florale aux petites attentions qui ont fait toute la différence. Nos invités parlent encore de cette journée magique !",
      rating: 5,
      image: "👰‍♀️"
    },
    {
      name: "Jean-Michel Rousseau",
      role: "Directeur Général",
      company: "TechAlpes Industries",
      content: "Pour notre gala annuel, nous avions besoin d'un événement à la hauteur de notre réputation. L'équipe d'ALTÉZA a dépassé toutes nos attentes avec une soirée d'exception qui a marqué nos 500 invités.",
      rating: 5,
      image: "🏢"
    },
    {
      name: "Sarah et ses amies",
      role: "EVJF mémorable",
      company: "Enterrement de vie de jeune fille",
      content: "Un week-end inoubliable en Haute-Savoie ! ALTÉZA EVEN'T a organisé des activités surprises parfaites, un spa relaxant et une soirée festive. Tout était pensé dans les moindres détails.",
      rating: 5,
      image: "🎉"
    },
    {
      name: "Claire & Antoine Martin",
      role: "50 ans de mariage",
      company: "Noces d'or familiales",
      content: "Célébrer 50 ans d'amour méritait une fête à la hauteur. ALTÉZA EVEN'T a créé une atmosphère chaleureuse et élégante qui a ému toute notre famille. Un moment d'émotion pure.",
      rating: 5,
      image: "💝"
    }
  ];

  const partners = [
    { name: "Château d'Annecy", logo: "🏰" },
    { name: "Hôtel des Alpes", logo: "🏔️" },
    { name: "Villa du Lac Léman", logo: "🌊" },
    { name: "Domaine de Haute-Savoie", logo: "🍷" },
    { name: "Palais des Congrès", logo: "🏛️" },
    { name: "Resort Mont-Blanc", logo: "⛷️" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-section-to-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Découvrez les témoignages de nos clients qui ont vécu des moments d'exception grâce à ALTÉZA EVEN'T
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <Card className="bg-gradient-card border-border shadow-luxury animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg md:text-xl text-foreground font-elegant leading-relaxed mb-8 max-w-2xl">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  {/* Rating Stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{testimonials[currentTestimonial].image}</div>
                    <div className="text-left">
                      <div className="font-luxury text-foreground text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-primary text-sm font-elegant">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-muted-foreground text-sm font-elegant">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-primary group-hover:text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-primary group-hover:text-white" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-luxury text-foreground mb-8">
            Nos partenaires de prestige
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <Card key={partner.name} className="group bg-secondary border-border hover:shadow-gold transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {partner.logo}
                  </div>
                  <span className="text-xs text-muted-foreground font-elegant text-center group-hover:text-foreground transition-colors">
                    {partner.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground font-elegant mb-4">
            Rejoignez nos clients satisfaits
          </p>
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Star className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-elegant text-primary">98% de clients recommandent nos services</span>
          </div>
        </div>
      </div>
    </section>
  );
};