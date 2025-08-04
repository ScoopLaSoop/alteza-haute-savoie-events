import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Utensils, Camera, Sparkles } from "lucide-react";

interface ServicesPreviewProps {
  onNavigate: (page: string) => void;
}

export const ServicesPreview = ({ onNavigate }: ServicesPreviewProps) => {
  const services = [
    {
      icon: Calendar,
      title: "Organisation d'événements",
      description: "Mariages, anniversaires, événements corporatifs"
    },
    {
      icon: Utensils,
      title: "Service traiteur",
      description: "Cuisine raffinée et service impeccable"
    },
    {
      icon: Camera,
      title: "Captation photo/vidéo",
      description: "Immortalisez vos moments précieux"
    },
    {
      icon: Sparkles,
      title: "Décoration sur-mesure",
      description: "Ambiances uniques et personnalisées"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl font-bold text-foreground">
            Nos Services d'Exception
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            De la conception à la réalisation, nous orchestrons chaque détail pour créer des événements inoubliables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA après la section Services */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground">
              Vous avez un projet ? Parlons-en !
            </h3>
            <p className="text-muted-foreground max-w-md">
              Chaque événement est unique. Découvrez comment nous pouvons transformer votre vision en réalité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => onNavigate("services")}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Découvrir nos services
              </Button>
              <Button 
                onClick={() => onNavigate("contact")}
                size="lg"
                className="min-w-[200px] bg-primary hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-300 transform"
              >
                Obtenir un devis gratuit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};