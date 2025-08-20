import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MentionsLegalesProps {
  onNavigate: (page: string) => void;
}

export const MentionsLegales = ({ onNavigate }: MentionsLegalesProps) => {
  return (
    <div className="min-h-screen bg-gradient-section-base">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={() => onNavigate("accueil")}
              className="mb-6 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
            <h1 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
              Mentions Légales
            </h1>
            <p className="text-xl text-muted-foreground font-elegant">
              Informations légales et réglementaires
            </p>
          </div>

          {/* Content */}
          <Card className="bg-gradient-card border-border shadow-luxury">
            <CardContent className="p-8 space-y-8">
              
              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Éditeur du site</h2>
                <div className="text-muted-foreground font-elegant space-y-2">
                  <p><strong>Raison sociale :</strong> ALTÉZA EVEN'T</p>
                  <p><strong>Forme juridique :</strong> Micro-entreprise</p>
                  <p><strong>Adresse :</strong> Haute-Savoie, France</p>
                  <p><strong>Téléphone :</strong> +33 6 73 43 70 54</p>
                  <p><strong>Email :</strong> contact@altezaevent.com</p>
                  <p><strong>Directeur de publication :</strong> Thomas Briche</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Hébergement</h2>
                <div className="text-muted-foreground font-elegant space-y-2">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p><strong>Site web :</strong> https://vercel.com</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Propriété intellectuelle</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                  les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Responsabilité</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour 
                  à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions. 
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien 
                  vouloir le signaler par email à contact@altezaevent.com.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Données personnelles</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit 
                  d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation 
                  du traitement. Vous pouvez exercer ces droits en vous adressant à contact@altezaevent.com.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Cookies</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Ce site utilise des cookies techniques nécessaires au bon fonctionnement du site. 
                  Aucun cookie de traçage ou publicitaire n'est utilisé sans votre consentement.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
