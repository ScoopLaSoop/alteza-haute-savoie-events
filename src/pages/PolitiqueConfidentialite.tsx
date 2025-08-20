import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PolitiqueConfidentialiteProps {
  onNavigate: (page: string) => void;
}

export const PolitiqueConfidentialite = ({ onNavigate }: PolitiqueConfidentialiteProps) => {
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
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-muted-foreground font-elegant">
              Protection et traitement de vos données personnelles
            </p>
          </div>

          {/* Content */}
          <Card className="bg-gradient-card border-border shadow-luxury">
            <CardContent className="p-8 space-y-8">
              
              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Responsable du traitement</h2>
                <div className="text-muted-foreground font-elegant space-y-2">
                  <p><strong>ALTÉZA EVEN'T</strong></p>
                  <p>Adresse : Haute-Savoie, France</p>
                  <p>Email : contact@altezaevent.com</p>
                  <p>Téléphone : +33 6 73 43 70 54</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Données collectées</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed mb-4">
                  Nous collectons les données personnelles suivantes :
                </p>
                <ul className="text-muted-foreground font-elegant space-y-2 ml-6 list-disc">
                  <li><strong>Données d'identité :</strong> nom, prénom</li>
                  <li><strong>Données de contact :</strong> adresse email, numéro de téléphone</li>
                  <li><strong>Données de projet :</strong> type d'événement, date, budget, nombre d'invités</li>
                  <li><strong>Données techniques :</strong> adresse IP, cookies techniques</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Finalités du traitement</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed mb-4">
                  Vos données sont utilisées pour :
                </p>
                <ul className="text-muted-foreground font-elegant space-y-2 ml-6 list-disc">
                  <li>Traiter vos demandes de devis et de contact</li>
                  <li>Organiser et gérer vos événements</li>
                  <li>Vous envoyer des informations sur nos services (avec votre consentement)</li>
                  <li>Améliorer nos services et notre site web</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Base légale</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Le traitement de vos données repose sur l'exécution du contrat pour nos prestations, 
                  votre consentement pour les communications marketing, et notre intérêt légitime pour 
                  l'amélioration de nos services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Conservation des données</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles 
                  elles ont été collectées, et au maximum 3 ans après la fin de notre relation commerciale, 
                  sauf obligation légale contraire.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Vos droits</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="text-muted-foreground font-elegant space-y-2 ml-6 list-disc">
                  <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                  <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> supprimer vos données dans certains cas</li>
                  <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement pour motif légitime</li>
                  <li><strong>Droit de limitation :</strong> limiter le traitement dans certains cas</li>
                </ul>
                <p className="text-muted-foreground font-elegant leading-relaxed mt-4">
                  Pour exercer ces droits, contactez-nous à : contact@altezaevent.com
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Sécurité</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Nous mettons en place des mesures techniques et organisationnelles appropriées pour 
                  protéger vos données contre la perte, l'utilisation abusive, l'accès non autorisé, 
                  la divulgation, l'altération ou la destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Cookies</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Notre site utilise uniquement des cookies techniques nécessaires au bon fonctionnement. 
                  Aucun cookie de traçage publicitaire n'est utilisé. Vous pouvez désactiver les cookies 
                  dans votre navigateur, mais cela peut affecter le fonctionnement du site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Contact</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité ou le traitement de 
                  vos données personnelles, vous pouvez nous contacter à contact@altezaevent.com ou 
                  au +33 6 73 43 70 54.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
