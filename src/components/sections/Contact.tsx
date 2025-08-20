import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactModal } from "./ContactModal";
import { clientService, devisService } from "@/lib/supabase";

export const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Créer ou mettre à jour le client
      const client = await clientService.upsertClient({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone
      });

      if (!client) {
        throw new Error("Erreur lors de la création du client");
      }

      // Créer une demande de devis générale pour le contact
      const demandeDevis = await devisService.createDemandeDevis({
        client_id: client.id,
        type_evenement: "Contact général",
        services_demandes: ["Contact général"],
        message: formData.message,
        statut: "nouveau"
      });

      if (!demandeDevis) {
        throw new Error("Erreur lors de la création de la demande");
      }

      toast({
        title: "Message envoyé avec succès ! ✅",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });
      
      setFormData({ nom: "", prenom: "", email: "", telephone: "", message: "" });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
              Contactez-nous
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-elegant">
              Partagez-nous votre vision et laissez-nous créer ensemble l'événement de vos rêves en Haute-Savoie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Form */}
            <div className="flex justify-center">
              <Card className="bg-gradient-card border-border shadow-luxury w-full max-w-lg flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-luxury text-foreground mb-6">
                    Décrivez-nous votre projet
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nom" className="block text-sm font-elegant text-foreground mb-2">
                          Nom *
                        </label>
                        <Input
                          id="nom"
                          name="nom"
                          type="text"
                          required
                          value={formData.nom}
                          onChange={handleInputChange}
                          className="bg-secondary border-border focus:border-primary"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="prenom" className="block text-sm font-elegant text-foreground mb-2">
                          Prénom *
                        </label>
                        <Input
                          id="prenom"
                          name="prenom"
                          type="text"
                          required
                          value={formData.prenom}
                          onChange={handleInputChange}
                          className="bg-secondary border-border focus:border-primary"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-elegant text-foreground mb-2">
                        Adresse e-mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder="votre@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-elegant text-foreground mb-2">
                        Numéro de téléphone
                      </label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="bg-secondary border-border focus:border-primary"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-elegant text-foreground mb-2">
                        Décrivez votre projet *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-secondary border-border focus:border-primary min-h-[120px]"
                        placeholder="Parlez-nous de votre événement : type, date, nombre d'invités, budget approximatif..."
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 justify-center items-center mt-auto">
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        variant="outline"
                        size="lg"
                        className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-6 py-3 text-sm backdrop-blur-sm transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none w-full max-w-[200px] text-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                            Envoyer ma demande
                          </>
                        )}
                      </Button>
                      <ContactModal>
                        <Button 
                          variant="default" 
                          size="lg"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-6 py-3 text-sm transform hover:scale-105 transition-all duration-300 w-full max-w-[200px] text-center"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contact rapide
                        </Button>
                      </ContactModal>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="flex justify-center">
              <Card className="bg-gradient-card border-border shadow-luxury w-full max-w-lg flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="space-y-6 w-full">
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl font-luxury text-foreground mb-4">
                        Restons en contact
                      </h3>
                      <p className="text-muted-foreground font-elegant mb-6 leading-relaxed">
                        Notre équipe est à votre disposition pour répondre à toutes vos questions 
                        et vous accompagner dans la réalisation de votre événement d'exception.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-secondary/20 rounded-lg">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-luxury text-foreground mb-1">Téléphone</h4>
                          <a href="tel:+33673437054" className="text-muted-foreground hover:text-primary transition-colors font-elegant">
                            +33 6 73 43 70 54
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-secondary/20 rounded-lg">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-luxury text-foreground mb-1">E-mail</h4>
                          <a href="mailto:contact@altezaevent.com" className="text-muted-foreground hover:text-primary transition-colors font-elegant">
                            contact@altezaevent.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-secondary/20 rounded-lg">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-luxury text-foreground mb-1">Zone d'intervention</h4>
                          <p className="text-muted-foreground font-elegant">
                            Haute-Savoie et régions limitrophes
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-luxury text-foreground mb-3">Réponse rapide garantie</h4>
                      <p className="text-sm text-muted-foreground font-elegant leading-relaxed">
                        Nous nous engageons à vous répondre dans les 24 heures suivant la réception 
                        de votre demande. Pour les urgences, n'hésitez pas à nous appeler directement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};