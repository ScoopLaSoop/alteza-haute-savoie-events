import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  Lightbulb, 
  Calendar, 
  Settings, 
  CheckCircle,
  Sparkles,
  Users,
  Camera
} from "lucide-react";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  details: string[];
}

export const Timeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Premier contact",
      description: "Nous découvrons votre vision et vos besoins",
      icon: MessageCircle,
      color: "text-blue-400",
      details: [
        "Échange téléphonique ou rendez-vous personnalisé",
        "Analyse de vos besoins et objectifs",
        "Première estimation budgétaire",
        "Présentation de notre approche"
      ]
    },
    {
      id: 2,
      title: "Conception créative",
      description: "Élaboration du concept sur-mesure",
      icon: Lightbulb,
      color: "text-yellow-400",
      details: [
        "Brainstorming créatif avec notre équipe",
        "Moodboard et planches d'inspiration",
        "Sélection des prestataires partenaires",
        "Présentation du concept final"
      ]
    },
    {
      id: 3,
      title: "Planification détaillée",
      description: "Organisation méticuleuse de chaque aspect",
      icon: Calendar,
      color: "text-green-400",
      details: [
        "Rétroplanning précis des étapes",
        "Réservation des lieux et prestataires",
        "Gestion des invitations et RSVP",
        "Coordination logistique complète"
      ]
    },
    {
      id: 4,
      title: "Préparation finale",
      description: "Mise en place et répétitions",
      icon: Settings,
      color: "text-purple-400",
      details: [
        "Installation et décoration sur site",
        "Tests techniques (son, éclairage)",
        "Brief final avec tous les intervenants",
        "Répétition générale si nécessaire"
      ]
    },
    {
      id: 5,
      title: "Jour J - Réalisation",
      description: "Coordination parfaite de votre événement",
      icon: Sparkles,
      color: "text-primary",
      details: [
        "Supervision complète sur site",
        "Gestion en temps réel des imprévus",
        "Coordination de tous les prestataires",
        "Assistance continue aux organisateurs"
      ]
    },
    {
      id: 6,
      title: "Suivi post-événement",
      description: "Bilan et valorisation de l'événement",
      icon: Camera,
      color: "text-pink-400",
      details: [
        "Debriefing avec retours participants",
        "Livraison photos/vidéos officielles",
        "Rapport détaillé de l'événement",
        "Recommandations pour futurs projets"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up">
            Notre méthode en 6 étapes
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            De la première idée au jour J, découvrez notre processus d'accompagnement personnalisé pour créer votre événement d'exception
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-primary text-primary-foreground shadow-gold'
                        : 'bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    <span className="font-elegant text-sm hidden sm:block">{step.title}</span>
                    <span className="font-elegant text-sm sm:hidden">{step.id}</span>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-accent transition-all duration-500 ease-out"
                  style={{ width: `${((activeStep + 1) / timelineSteps.length) * 100}%` }}
                />
              </div>
              <div className="absolute inset-0 flex justify-between">
                {timelineSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full -mt-1 transition-all duration-300 ${
                      index <= activeStep ? 'bg-primary scale-125' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active Step Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Step Details */}
            <Card className="bg-gradient-card border-border shadow-luxury animate-fade-in-left">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4`}>
                    {(() => {
                      const IconComponent = timelineSteps[activeStep].icon;
                      return <IconComponent className={`w-8 h-8 ${timelineSteps[activeStep].color}`} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-luxury text-foreground mb-2">
                      Étape {timelineSteps[activeStep].id}
                    </h3>
                    <h4 className="text-xl font-elegant text-primary">
                      {timelineSteps[activeStep].title}
                    </h4>
                  </div>
                </div>

                <p className="text-muted-foreground font-elegant text-lg mb-6 leading-relaxed">
                  {timelineSteps[activeStep].description}
                </p>

                <div className="space-y-3">
                  {timelineSteps[activeStep].details.map((detail, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-elegant">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visual Representation */}
            <div className="relative animate-fade-in-right">
              <Card className="bg-gradient-card border-border shadow-luxury overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-80 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-6 h-full">
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className="border border-primary/20 animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Central Icon */}
                    <div className="relative z-10">
                      {(() => {
                        const IconComponent = timelineSteps[activeStep].icon;
                        return (
                          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-luxury-glow">
                            <IconComponent className={`w-16 h-16 ${timelineSteps[activeStep].color}`} />
                          </div>
                        );
                      })()}
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-primary/40 rounded-full animate-float" />
                    <div className="absolute top-8 right-8 w-2 h-2 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-6 left-8 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent/50 rounded-full animate-float" style={{ animationDelay: '3s' }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="group px-6 py-3 border-2 border-white/50 dark:text-white text-foreground rounded-full hover:bg-white/10 dark:hover:bg-white/10 hover:bg-foreground/5 hover:border-primary/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-elegant backdrop-blur-sm transform hover:scale-105 disabled:transform-none"
            >
              Étape précédente
            </button>
            <button
              onClick={() => setActiveStep(Math.min(timelineSteps.length - 1, activeStep + 1))}
              disabled={activeStep === timelineSteps.length - 1}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-elegant transform hover:scale-105 disabled:transform-none"
            >
              Étape suivante
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};