import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Volume2, Wine, Sofa, Shield, Sparkles } from "lucide-react";

interface ModificationsBlockProps {
  beforeGuests: number;
  afterGuests: number;
  setupTime: string;
}

export const ModificationsBlock = ({ beforeGuests, afterGuests, setupTime }: ModificationsBlockProps) => {
  const modifications = [
    {
      icon: Lightbulb,
      title: "Scénographie & éclairage",
      description: "Transformation complète de l'ambiance lumineuse"
    },
    {
      icon: Volume2,
      title: "Sonorisation & flux technique",
      description: "Installation audio/vidéo et gestion technique"
    },
    {
      icon: Wine,
      title: "Bar & service",
      description: "Mise en place du service de restauration"
    },
    {
      icon: Sofa,
      title: "Mobilier & déco",
      description: "Aménagement et décoration personnalisée"
    },
    {
      icon: Shield,
      title: "Logistique & sécurité",
      description: "Coordination et sécurisation de l'événement"
    },
    {
      icon: Sparkles,
      title: "Nettoyage & remise en état",
      description: "Remise en état parfaite des lieux"
    }
  ];

  return (
    <div className="mt-8 space-y-6">
      <Card className="bg-gradient-card border-border shadow-luxury">
        <CardContent className="p-6">
          <h4 className="text-xl font-luxury text-foreground mb-6 text-center">
            Ce que nous modifions
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {modifications.map((modification, index) => {
              const IconComponent = modification.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50 hover:bg-primary/10 transition-colors duration-200">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-elegant text-foreground text-sm font-medium">
                      {modification.title}
                    </h5>
                    <p className="text-xs text-muted-foreground font-elegant">
                      {modification.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro-preuves */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-border">
            <Badge variant="outline" className="text-foreground">
              Avant: {beforeGuests} invités
            </Badge>
            <Badge variant="outline" className="text-foreground">
              Après: {afterGuests} invités
            </Badge>
            <Badge variant="outline" className="text-foreground">
              Temps de montage: {setupTime}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};