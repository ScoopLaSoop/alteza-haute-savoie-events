import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, RotateCcw, Sparkles, Send, Calendar, MapPin, User, Mail, Phone, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clientService, devisService } from "@/lib/supabase";

export const EventQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    eventType: '',
    services: ''
  });
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "Quel type d'événement organisez-vous ?",
      options: [
        { label: "Mariage", value: "mariage", emoji: "💍" },
        { label: "Anniversaire", value: "anniversaire", emoji: "🎂" },
        { label: "Événement d'entreprise", value: "corporate", emoji: "🏢" },
        { label: "Celebration privée", value: "prive", emoji: "🎉" }
      ]
    },
    {
      id: 2,
      question: "Combien d'invités attendez-vous ?",
      options: [
        { label: "Moins de 50", value: "small", emoji: "👥" },
        { label: "50 à 100", value: "medium", emoji: "👥" },
        { label: "100 à 200", value: "large", emoji: "👥" },
        { label: "Plus de 200", value: "xlarge", emoji: "👥" }
      ]
    },
    {
      id: 3,
      question: "Quel style recherchez-vous ?",
      options: [
        { label: "Élégant et classique", value: "classic", emoji: "🎩" },
        { label: "Moderne et tendance", value: "modern", emoji: "✨" },
        { label: "Bohème et naturel", value: "boho", emoji: "🌿" },
        { label: "Luxueux et prestigieux", value: "luxury", emoji: "👑" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowForm(false);
    setShowThanks(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Récupérer les services sélectionnés depuis les réponses du quiz
      const [eventType, size, style, services] = answers;
      const servicesArray = services ? services.split(', ') : [];
      
      // Ajouter les services du formulaire si présents
      if (formData.services) {
        servicesArray.push(formData.services);
      }

      // Séparer nom et prénom depuis le champ name
      const nameParts = formData.name.trim().split(' ');
      const prenom = nameParts[0] || '';
      const nom = nameParts.slice(1).join(' ') || '';
      
      // Créer ou mettre à jour le client
      const client = await clientService.upsertClient({
        nom: nom || prenom, // Si pas de nom, utiliser le prénom
        prenom: nom ? prenom : '', // Si il y a un nom, le premier mot est le prénom
        email: formData.email,
        telephone: formData.phone
      });

      if (!client) {
        throw new Error("Erreur lors de la création du client");
      }

      // Créer la demande de devis avec les informations du quiz
      const demandeDevis = await devisService.createDemandeDevis({
        client_id: client.id,
        type_evenement: eventType || formData.eventType,
        date_evenement: formData.date || undefined,
        lieu_evenement: formData.location || undefined,
        services_demandes: servicesArray,
        message: `Quiz complété - Style: ${style}, Taille: ${size}. Services additionnels: ${formData.services}`,
        statut: "nouveau"
      });

      if (!demandeDevis) {
        throw new Error("Erreur lors de la création de la demande de devis");
      }

      toast({
        title: "Demande de devis envoyée avec succès ! 🎉",
        description: "Nous vous contacterons rapidement avec une proposition personnalisée.",
      });

      setShowThanks(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi du devis:", error);
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRecommendation = () => {
    const [eventType, size, style] = answers;
    
    // Logique simple de recommandation basée sur les réponses
    if (eventType === "mariage") {
      if (style === "luxury") {
        return {
          title: "Package Prestige Mariage",
          description: "Organisation complète avec lieux d'exception, décoration luxueuse et service premium",
          services: ["Coordination complète", "Décoration sur-mesure", "Traiteur gastronomique", "Service concierge"]
        };
      } else if (size === "medium" && style === "classic") {
        return {
          title: "Package Élégance Mariage", 
          description: "Mariage raffiné avec attention aux détails et service personnalisé",
          services: ["Coordination jour J", "Décoration élégante", "Prestataires sélectionnés", "Timeline détaillée"]
        };
      }
    } else if (eventType === "corporate") {
      return {
        title: "Package Corporate Premium",
        description: "Événement d'entreprise professionnel avec impact garanti",
        services: ["Gestion logistique", "Animation & shows", "Catering professionnel", "Support technique"]
      };
    }

    // Recommandation par défaut
    return {
      title: "Package Sur-Mesure",
      description: "Solution personnalisée adaptée à vos besoins spécifiques",
      services: ["Consultation gratuite", "Devis personnalisé", "Coordination adaptée", "Suivi dédié"]
    };
  };

  const recommendation = showResult ? getRecommendation() : null;

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <Sparkles className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">Quiz personnalisé</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Trouvez votre événement idéal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Répondez à quelques questions pour découvrir la formule parfaite pour votre événement
          </p>
        </div>

        <Card className="bg-gradient-card border-border shadow-luxury max-w-2xl mx-auto animate-scale-in">
          <CardContent className="p-8">
            {!showResult ? (
              <>
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-elegant text-muted-foreground">
                      Question {currentQuestion + 1} sur {questions.length}
                    </span>
                    <span className="text-sm font-elegant text-primary">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-luxury text-foreground mb-2">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      className="justify-start h-auto p-4 text-left hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <span className="text-2xl mr-4">{option.emoji}</span>
                      <span className="font-elegant">{option.label}</span>
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center animate-fade-in">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-luxury text-foreground mb-2">
                    Votre recommandation
                  </h3>
                </div>

                {recommendation && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-luxury text-primary mb-3">
                        {recommendation.title}
                      </h4>
                      <p className="text-muted-foreground font-elegant leading-relaxed">
                        {recommendation.description}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-luxury text-foreground mb-3">Services inclus :</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {recommendation.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="justify-center py-2">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="text-center">
                        <span className="font-elegant text-muted-foreground">Votre estimation sera établie sur devis.</span>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center pt-4">
                      <Button 
                        onClick={resetQuiz} 
                        variant="outline"
                        size="lg"
                        className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                      >
                        <RotateCcw className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Recommencer
                      </Button>
                      <Button 
                        variant="default"
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-10 py-6 text-lg transform hover:scale-105 transition-all duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowForm(true);
                          // Scroll vers le formulaire de manière fluide
                          setTimeout(() => {
                            const formElement = document.querySelector('[data-form-section]');
                            if (formElement) {
                              formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Modal */}
        {showForm && !showThanks && (
          <Card className="bg-gradient-card border-border shadow-luxury max-w-2xl mx-auto mt-8 animate-scale-in" data-form-section>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-luxury text-foreground mb-2">
                  Demandez votre devis personnalisé
                </h3>
                <p className="text-muted-foreground font-elegant">
                  Remplissez ce formulaire pour recevoir votre estimation détaillée
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center text-foreground font-elegant mb-2">
                      <User className="w-4 h-4 mr-2 text-primary" />
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-secondary/20 border-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="flex items-center text-foreground font-elegant mb-2">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-secondary/20 border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="flex items-center text-foreground font-elegant mb-2">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-secondary/20 border-border"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="flex items-center text-foreground font-elegant mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      Date souhaitée
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="bg-secondary/20 border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center text-foreground font-elegant mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Lieu de l'événement
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-secondary/20 border-border"
                    placeholder="Ville, lieu spécifique..."
                  />
                </div>

                <div>
                  <Label htmlFor="eventType" className="flex items-center text-foreground font-elegant mb-2">
                    Type d'événement
                  </Label>
                  <Input
                    id="eventType"
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                    className="bg-secondary/20 border-border"
                    placeholder="Mariage, anniversaire, corporate..."
                  />
                </div>

                <div>
                  <Label htmlFor="services" className="flex items-center text-foreground font-elegant mb-2">
                    Services souhaités
                  </Label>
                  <Textarea
                    id="services"
                    value={formData.services}
                    onChange={(e) => handleInputChange('services', e.target.value)}
                    className="bg-secondary/20 border-border min-h-[100px]"
                    placeholder="Décoration, traiteur, bar, animation..."
                  />
                </div>

                <div className="flex gap-4 justify-center pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    size="lg"
                    className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                    onClick={() => setShowForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="default"
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-10 py-6 text-lg transform hover:scale-105 transition-all duration-300 min-w-[200px] disabled:opacity-50 disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Thank You Page */}
        {showThanks && (
          <Card className="bg-gradient-card border-border shadow-luxury max-w-2xl mx-auto mt-8 animate-scale-in">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              
              <h3 className="text-2xl font-luxury text-foreground mb-4">
                Merci pour votre demande !
              </h3>
              
              <p className="text-muted-foreground font-elegant mb-6">
                Votre demande de devis a été envoyée avec succès. Notre équipe vous contactera dans les 24–48h pour discuter de votre projet.
              </p>
              
              <div className="flex flex-col items-center space-y-4 px-4 sm:px-0">
                <Button 
                  variant="default"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-6 sm:px-10 py-6 text-base sm:text-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-[280px]"
                  onClick={() => window.open('https://calendly.com', '_blank')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prendre rendez-vous
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-6 sm:px-10 py-6 text-base sm:text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-[280px]"
                  onClick={resetQuiz}
                >
                  <RotateCcw className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Nouveau quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};