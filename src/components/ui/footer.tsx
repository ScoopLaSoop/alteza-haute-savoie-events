import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Instagram, Mountain } from "lucide-react";
interface FooterProps {
  onNavigate: (page: string) => void;
}
export const Footer = ({
  onNavigate
}: FooterProps) => {
  return <footer className="bg-background/95 border-t border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        {/* CTA de rappel dans le footer */}
        <div className="text-center mb-12">
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo et description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-luxury text-primary">ALTÉZA EVEN'T</h3>
            <p className="text-muted-foreground font-elegant leading-relaxed">
              Agence événementielle de prestige en Haute-Savoie. Nous créons des moments d'exception avec élégance et créativité.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigation</h4>
            <div className="space-y-2">
              {[{
              key: "services",
              label: "Nos Services"
            }, {
              key: "portfolio",
              label: "Portfolio"
            }, {
              key: "apropos",
              label: "À propos"
            }, {
              key: "quiz",
              label: "Quiz Événement"
            }, {
              key: "faq",
              label: "FAQ"
            }].map(item => <button key={item.key} onClick={() => onNavigate(item.key)} className="block text-muted-foreground hover:text-primary transition-colors font-elegant">
                  {item.label}
                </button>)}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-elegant">Haute-Savoie, France</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-elegant">+33 6 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-elegant">contact@alteza-event.fr</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="font-elegant">© 2024 ALTÉZA EVEN'T. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-primary transition-colors font-elegant">
              Mentions légales
            </button>
            <button className="hover:text-primary transition-colors font-elegant">
              CGV
            </button>
            <button className="hover:text-primary transition-colors font-elegant">
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>;
};