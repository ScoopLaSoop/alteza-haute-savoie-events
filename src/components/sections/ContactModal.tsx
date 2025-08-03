import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const ContactModal = ({ isOpen, onClose, children }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
    typeEvenement: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ nom: "", email: "", telephone: "", message: "", typeEvenement: "" });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const eventTypes = [
    { label: "Mariage", emoji: "💍" },
    { label: "Entreprise", emoji: "🏢" },
    { label: "EVJF/EVG", emoji: "🎉" },
    { label: "Anniversaire", emoji: "🎂" },
    { label: "Autre", emoji: "✨" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-4xl bg-gradient-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-luxury text-center text-foreground">
            Parlons de votre projet
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Formulaire */}
          <div className="space-y-6">
            {isSubmitted ? (
              <div className="text-center py-12 animate-scale-in">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-luxury text-foreground mb-2">Message envoyé !</h3>
                <p className="text-muted-foreground font-elegant">
                  Nous reviendrons vers vous sous 24h
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-luxury text-foreground mb-4">Type d'événement</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {eventTypes.map((type) => (
                      <Button
                        key={type.label}
                        variant={formData.typeEvenement === type.label ? "default" : "outline"}
                        className="flex flex-col h-auto py-3 px-2"
                        onClick={() => setFormData({ ...formData, typeEvenement: type.label })}
                      >
                        <span className="text-lg mb-1">{type.emoji}</span>
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      name="nom"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                    <Input
                      name="telephone"
                      placeholder="Téléphone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="bg-secondary border-border"
                    />
                  </div>
                  
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary border-border"
                  />
                  
                  <Textarea
                    name="message"
                    placeholder="Décrivez votre projet en quelques mots..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="bg-secondary border-border resize-none"
                  />
                  
                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-luxury text-foreground mb-4">Nos coordonnées</h3>
              <div className="space-y-4">
                <Card className="bg-gradient-secondary border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-elegant text-foreground">+33 6 12 34 56 78</p>
                        <p className="text-xs text-muted-foreground">Lun-Ven 9h-18h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-secondary border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-elegant text-foreground">contact@wedding-planner.fr</p>
                        <p className="text-xs text-muted-foreground">Réponse sous 24h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-secondary border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-elegant text-foreground">Haute-Savoie & région</p>
                        <p className="text-xs text-muted-foreground">Déplacement 50km</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <MessageCircle className="w-5 h-5 text-primary mr-2" />
                <span className="font-luxury text-primary">Consultation gratuite</span>
              </div>
              <p className="text-sm text-muted-foreground font-elegant">
                Premier échange de 30 minutes offert pour discuter de votre projet et définir vos besoins.
              </p>
            </div>

            <div>
              <h4 className="font-luxury text-foreground mb-3">Nos spécialités</h4>
              <div className="flex flex-wrap gap-2">
                {["Mariage de prestige", "Events corporate", "Célébrations privées", "Coordination jour J"].map((spec) => (
                  <Badge key={spec} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};