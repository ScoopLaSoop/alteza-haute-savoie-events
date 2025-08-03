import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, RotateCcw, Sparkles } from "lucide-react";

export const EventQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

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
      question: "Quel est votre budget approximatif ?",
      options: [
        { label: "Moins de 10 000€", value: "budget1", emoji: "💰" },
        { label: "10 000€ - 25 000€", value: "budget2", emoji: "💰" },
        { label: "25 000€ - 50 000€", value: "budget3", emoji: "💰" },
        { label: "Plus de 50 000€", value: "budget4", emoji: "💰" }
      ]
    },
    {
      id: 4,
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
  };

  const getRecommendation = () => {
    const [eventType, size, budget, style] = answers;
    
    // Logique simple de recommandation basée sur les réponses
    if (eventType === "mariage") {
      if (budget === "budget4" && style === "luxury") {
        return {
          title: "Package Prestige Mariage",
          description: "Organisation complète avec lieux d'exception, décoration luxueuse et service premium",
          services: ["Coordination complète", "Décoration sur-mesure", "Traiteur gastronomique", "Service concierge"],
          estimatedPrice: "40 000€ - 80 000€"
        };
      } else if (size === "medium" && style === "classic") {
        return {
          title: "Package Élégance Mariage",
          description: "Mariage raffiné avec attention aux détails et service personnalisé",
          services: ["Coordination jour J", "Décoration élégante", "Prestataires sélectionnés", "Timeline détaillée"],
          estimatedPrice: "15 000€ - 35 000€"
        };
      }
    } else if (eventType === "corporate") {
      return {
        title: "Package Corporate Premium",
        description: "Événement d'entreprise professionnel avec impact garanti",
        services: ["Gestion logistique", "Animation & shows", "Catering professionnel", "Support technique"],
        estimatedPrice: "20 000€ - 60 000€"
      };
    }

    // Recommandation par défaut
    return {
      title: "Package Sur-Mesure",
      description: "Solution personnalisée adaptée à vos besoins spécifiques",
      services: ["Consultation gratuite", "Devis personnalisé", "Coordination adaptée", "Suivi dédié"],
      estimatedPrice: "Sur devis"
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
                      <div className="flex items-center justify-between">
                        <span className="font-elegant text-muted-foreground">Estimation :</span>
                        <span className="font-luxury text-primary text-lg">
                          {recommendation.estimatedPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center pt-4">
                      <Button onClick={resetQuiz} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Recommencer
                      </Button>
                      <Button className="bg-primary text-primary-foreground">
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};