import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Gift, PartyPopper, Building, Wine } from "lucide-react";
import mariageImg from "@/assets/service-mariage.jpg";
import anniversaireImg from "@/assets/service-anniversaire.jpg";
import evjfImg from "@/assets/service-evjf.jpg";
import corporateImg from "@/assets/service-corporate.jpg";

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export const Services = ({ onNavigate }: ServicesProps) => {
  const services = [
    {
      title: "Mariages",
      description: "Organisation de mariages sur-mesure, du design de la cérémonie à la coordination du jour J. Créez un mariage à votre image avec une attention particulière à chaque détail.",
      icon: Heart,
      image: mariageImg,
      highlights: ["Scénographie personnalisée", "Coordination jour J", "Gestion des prestataires"]
    },
    {
      title: "Anniversaires",
      description: "Conception de fêtes d'anniversaire mémorables, qu'il s'agisse d'une célébration intime en famille ou d'une grande soirée festive avec thème personnalisé.",
      icon: Gift,
      image: anniversaireImg,
      highlights: ["Thèmes personnalisés", "Décorations créatives", "Animations sur-mesure"]
    },
    {
      title: "EVJF/EVG",
      description: "Planification d'enterrements de vie de célibataire originaux et amusants. Activités surprises, soirées à thème, accessoires ludiques pour une expérience inoubliable.",
      icon: PartyPopper,
      image: evjfImg,
      highlights: ["Activités surprises", "Soirées à thème", "Accessoires ludiques"]
    },
    {
      title: "Événements d'entreprise",
      description: "Organisation professionnelle de séminaires, galas, team-building et soirées d'entreprise. Alliant créativité et exigence pour refléter l'image de votre entreprise.",
      icon: Building,
      image: corporateImg,
      highlights: ["Séminaires", "Galas", "Team-building"]
    },
    {
      title: "Bar (cocktails & softs)",
      description: "Service de bar complet avec barmen professionnels, cocktails créatifs et boissons sans alcool. Équipement moderne et service en tenue pour tous vos événements.",
      icon: Wine,
      image: corporateImg, // Temporary image
      highlights: ["Barmen/mixologues", "Cocktails personnalisés", "Service en tenue"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
            Nos Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant">
            ALTÉZA EVEN'T couvre une large gamme d'événements, chacun conçu avec passion et professionnalisme pour créer des moments inoubliables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className="group overflow-hidden bg-gradient-card border-border hover:shadow-luxury transition-all duration-500 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-luxury text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 font-elegant leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        <span className="text-foreground font-elegant">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => onNavigate("contact")}
            variant="default"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-8 py-4"
          >
            Demander un devis personnalisé
          </Button>
        </div>
      </div>
    </section>
  );
};