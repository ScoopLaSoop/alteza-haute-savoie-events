import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, MapPin } from "lucide-react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About = ({ onNavigate }: AboutProps) => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-background/50 to-muted/20">
      <div className="container mx-auto max-w-6xl">
        {/* Brève section "Qui sommes-nous" - Version épurée pour la home */}
        <div className="text-center mb-12 space-y-8">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-8">
            Qui sommes-nous ?
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl text-muted-foreground font-elegant leading-relaxed">
              ALTÉZA EVEN'T est votre agence événementielle de prestige en Haute-Savoie. 
              Nous orchestrons vos moments les plus précieux avec élégance et créativité.
            </p>
            <p className="text-lg text-muted-foreground/80 font-elegant leading-relaxed">
              Des sommets enneigés aux rives du lac d'Annecy, nous transformons vos rêves en réalité 
              grâce à notre expertise locale et notre passion pour l'excellence.
            </p>
          </div>
          
          {/* CTA vers la page À propos pour plus de détails */}
          <div className="pt-8">
            <Button 
              onClick={() => onNavigate("apropos")}
              variant="outline"
              size="lg"
              className="group hover:bg-primary/5 hover:border-primary/50"
            >
              <Users className="w-5 h-5 mr-3 group-hover:text-primary transition-colors" />
              En savoir plus sur notre équipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};