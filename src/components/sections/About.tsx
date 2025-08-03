import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, MapPin } from "lucide-react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About = ({ onNavigate }: AboutProps) => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Notre passion pour l'événementiel guide chaque projet, créant des expériences authentiques et mémorables."
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Une équipe expérimentée qui maîtrise tous les aspects de l'organisation d'événements en Haute-Savoie."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Un engagement sans faille vers l'excellence, du premier contact jusqu'au jour J de votre événement."
    },
    {
      icon: MapPin,
      title: "Local",
      description: "Une connaissance approfondie des plus beaux lieux de Haute-Savoie et des meilleurs prestataires locaux."
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
              À propos d'ALTÉZA EVEN'T
            </h2>
            <p className="text-lg text-muted-foreground font-elegant leading-relaxed">
              Découvrez l'âme de notre agence événementielle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-luxury text-foreground mb-6">
                Notre Histoire
              </h3>
              <div className="space-y-4 text-muted-foreground font-elegant leading-relaxed">
                <p>
                  Née de la passion pour l'art de recevoir et l'amour de la Haute-Savoie, 
                  ALTÉZA EVEN'T est une agence événementielle qui transforme vos rêves en réalité.
                </p>
                <p>
                  Fondée par une équipe d'experts passionnés, notre agence puise son inspiration 
                  dans la beauté naturelle des Alpes françaises pour créer des événements d'exception 
                  qui marquent les esprits.
                </p>
                <p>
                  Chaque membre de notre équipe apporte son expertise unique, forgée par des années 
                  d'expérience dans l'organisation d'événements prestigieux. Nous connaissons 
                  intimement les plus beaux lieux de la région et collaborons avec les meilleurs 
                  prestataires locaux.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-card rounded-2xl p-8 border border-border">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-luxury text-foreground mb-4">Notre Mission</h4>
                  <p className="text-muted-foreground font-elegant">
                    Créer des moments inoubliables qui reflètent votre personnalité 
                    et dépassent vos attentes, dans le cadre exceptionnel de la Haute-Savoie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="bg-gradient-card border-border hover:shadow-gold transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-luxury text-foreground mb-3">{value.title}</h4>
                    <p className="text-sm text-muted-foreground font-elegant leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-luxury text-foreground mb-4">
              Prêt à créer votre événement d'exception ?
            </h3>
            <p className="text-muted-foreground mb-6 font-elegant">
              Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons le réaliser.
            </p>
            <Button 
              onClick={() => onNavigate("contact")}
              variant="default"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-8 py-4"
            >
              Démarrer votre projet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};