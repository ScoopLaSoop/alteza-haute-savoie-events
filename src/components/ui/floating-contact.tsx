import { useState, useEffect } from "react";
import { Button } from "./button";
import { MessageCircle, Phone, Mail, X, Send, Loader2 } from "lucide-react";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useToast } from "@/hooks/use-toast";
import { clientService, devisService } from "@/lib/supabase";

interface FloatingContactProps {
  onNavigateToContact?: () => void;
}

export const FloatingContact = ({ onNavigateToContact }: FloatingContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickForm, setQuickForm] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  // Show FAB after scroll (after hero section)
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when form is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Séparer nom et prénom depuis le champ name
      const nameParts = quickForm.name.trim().split(' ');
      const prenom = nameParts[0] || '';
      const nom = nameParts.slice(1).join(' ') || '';
      
      // Créer ou mettre à jour le client
      const client = await clientService.upsertClient({
        nom: nom || prenom, // Si pas de nom, utiliser le prénom
        prenom: nom ? prenom : '', // Si il y a un nom, le premier mot est le prénom
        email: "", // Email non requis pour contact rapide
        telephone: quickForm.phone
      });

      if (!client) {
        throw new Error("Erreur lors de la création du client");
      }

      // Créer une demande de devis rapide
      const demandeDevis = await devisService.createDemandeDevis({
        client_id: client.id,
        type_evenement: "Contact rapide FAB",
        services_demandes: ["Contact rapide"],
        message: quickForm.message,
        statut: "nouveau"
      });

      if (!demandeDevis) {
        throw new Error("Erreur lors de la création de la demande");
      }

      toast({
        title: "Message envoyé avec succès ! ✅",
        description: "Nous vous recontacterons rapidement.",
      });
      
      setQuickForm({ name: "", phone: "", message: "" });
      setIsOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        title: "Erreur lors de l'envoi ❌",
        description: `Détails: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setQuickForm(prev => ({ ...prev, [field]: value }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury hover:shadow-gold hover:scale-110 transition-all duration-300 group"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      {/* Quick Contact Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <Card className="relative w-full max-w-md bg-gradient-card border-border shadow-2xl animate-scale-in">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-luxury text-foreground">Contact rapide</h3>
                  <p className="text-sm text-muted-foreground font-elegant">
                    Laissez-nous vos coordonnées
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Contact Form */}
              <form onSubmit={handleQuickSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Votre nom *"
                    value={quickForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="bg-secondary/20 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <Input
                    type="tel"
                    placeholder="Votre téléphone *"
                    value={quickForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="bg-secondary/20 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <Textarea
                    placeholder="Votre message..."
                    value={quickForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-secondary/20 border-border focus:border-primary min-h-[100px]"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground text-center mb-3 font-elegant">
                  Ou contactez-nous directement
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary/5"
                    onClick={() => window.open('tel:+33450123456')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary/5"
                    onClick={() => window.open('mailto:contact@alteza-event.fr')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
                
                {onNavigateToContact && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-primary hover:bg-primary/5"
                    onClick={() => {
                      onNavigateToContact();
                      setIsOpen(false);
                    }}
                  >
                    Formulaire complet
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
