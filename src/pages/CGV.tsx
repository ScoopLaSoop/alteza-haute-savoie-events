import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CGVProps {
  onNavigate: (page: string) => void;
}

export const CGV = ({ onNavigate }: CGVProps) => {
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
              Conditions Générales de Vente
            </h1>
            <p className="text-xl text-muted-foreground font-elegant">
              Conditions applicables à nos prestations événementielles
            </p>
          </div>

          {/* Content */}
          <Card className="bg-gradient-card border-border shadow-luxury">
            <CardContent className="p-8 space-y-8">
              
              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 1 - Objet</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Les présentes conditions générales de vente s'appliquent à toutes les prestations de services 
                  d'organisation d'événements proposées par ALTÉZA EVEN'T. Elles définissent les droits et 
                  obligations des parties dans le cadre de la vente de prestations événementielles.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 2 - Prestations</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed mb-4">
                  ALTÉZA EVEN'T propose les prestations suivantes :
                </p>
                <ul className="text-muted-foreground font-elegant space-y-2 ml-6 list-disc">
                  <li>Organisation complète d'événements (mariages, anniversaires, événements d'entreprise)</li>
                  <li>Coordination jour J</li>
                  <li>Conseil et accompagnement personnalisé</li>
                  <li>Décoration et mise en scène</li>
                  <li>Service de bar événementiel</li>
                  <li>Gestion des prestataires</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 3 - Devis et commande</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Tout devis établi par ALTÉZA EVEN'T est valable 30 jours. La commande n'est définitive 
                  qu'après signature du devis par le client et versement d'un acompte de 30% du montant total. 
                  Le solde est exigible 15 jours avant la date de l'événement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 4 - Prix et modalités de paiement</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Les prix sont indiqués en euros TTC. Les modalités de paiement acceptées sont : virement 
                  bancaire, chèque, espèces (dans la limite légale). Tout retard de paiement entraînera 
                  l'application de pénalités de retard au taux de 3 fois le taux d'intérêt légal.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 5 - Annulation</h2>
                <div className="text-muted-foreground font-elegant leading-relaxed space-y-3">
                  <p><strong>En cas d'annulation par le client :</strong></p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Plus de 6 mois avant l'événement : remboursement de 70% des sommes versées</li>
                    <li>Entre 3 et 6 mois : remboursement de 50% des sommes versées</li>
                    <li>Entre 1 et 3 mois : remboursement de 30% des sommes versées</li>
                    <li>Moins d'1 mois : aucun remboursement</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 6 - Responsabilité</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  ALTÉZA EVEN'T s'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution 
                  de ses prestations. Sa responsabilité ne peut être engagée en cas de force majeure, 
                  d'annulation de dernière minute par un prestataire tiers, ou de non-respect par le client 
                  de ses obligations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-luxury text-foreground mb-4">Article 7 - Droit applicable et litiges</h2>
                <p className="text-muted-foreground font-elegant leading-relaxed">
                  Les présentes CGV sont soumises au droit français. En cas de litige, les parties 
                  s'efforceront de trouver une solution amiable. À défaut, les tribunaux français 
                  seront seuls compétents.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
