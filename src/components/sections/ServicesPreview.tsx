import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Utensils, Camera, Sparkles, Wine } from "lucide-react";
interface ServicesPreviewProps {
  onNavigate: (page: string) => void;
}
export const ServicesPreview = ({
  onNavigate
}: ServicesPreviewProps) => {
  const services = [{
    icon: Calendar,
    title: "Organisation d'événements",
    description: "Mariages, anniversaires, événements corporatifs"
  }, {
    icon: Utensils,
    title: "Service traiteur",
    description: "Cuisine raffinée et service impeccable"
  }, {
    icon: Wine,
    title: "Bar (cocktails & softs)",
    description: "Service de bar complet avec barmen professionnels"
  }, {
    icon: Sparkles,
    title: "Décoration sur-mesure",
    description: "Ambiances uniques et personnalisées"
  }];
  return <section className="py-12 px-4 bg-gradient-card-to-base">
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
          return <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50">
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
              </Card>;
        })}
        </div>

        {/* CTA après la section Services */}
        <div className="text-center">
          <Card className="group hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-primary/20 hover:border-primary/50 max-w-sm mx-auto">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Vous avez un projet ? Parlons-en !
              </h3>
              <p className="text-muted-foreground">
                Chaque événement est unique. Découvrez comment nous pouvons transformer votre vision en réalité.
              </p>
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => onNavigate("services")} 
                  variant="outline" 
                  size="lg" 
                  className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-6 py-3 text-sm sm:text-base backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  Découvrir nos services
                </Button>
                <Button 
                  onClick={() => onNavigate("contact")} 
                  variant="default"
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-6 py-3 text-sm sm:text-base transform hover:scale-105 transition-all duration-300"
                >
                  Obtenir un devis personnalisé
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};