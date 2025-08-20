import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, MapPin } from "lucide-react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About = ({ onNavigate }: AboutProps) => {
  return (
    <section className="py-8 px-4 bg-gradient-muted-to-card">
      <div className="container mx-auto max-w-6xl">
        {/* Brève section "Qui sommes-nous" - Version épurée pour la home */}
        <div className="text-center mb-6 space-y-6">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-8">
            Qui sommes-nous ?
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl text-muted-foreground font-elegant leading-relaxed">
              ALTÉZA EVEN'T est votre agence événementielle de prestige, fondée par un passionné de longue date. 
              Nous créons des événements sur mesure portés par une expertise professionnelle acquise au sein des plus grands palaces de la Côte d'Azur et de Genève.
            </p>
            <p className="text-lg text-muted-foreground/80 font-elegant leading-relaxed">
              Depuis toujours, transformer une idée en réalité est bien plus qu'un métier : c'est une vocation. 
              Grâce à un savoir-faire exigeant, une attention aux détails et une approche personnalisée, nous faisons de chaque événement un moment d'exception.
            </p>
          </div>
          
          {/* Section intégrée pour en savoir plus */}
          <div className="mt-6 mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-white/5 to-primary/10 border border-white/20 rounded-xl p-6 max-w-md">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-elegant text-foreground">
                    En savoir plus sur notre équipe
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Découvrez notre passion et notre expertise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};