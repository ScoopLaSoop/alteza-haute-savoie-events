import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wine, Users, Settings, Sparkles, Check, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

export const ServiceBar = () => {
  const services = [
    {
      category: "Équipe",
      icon: Users,
      title: "Professionnels expérimentés",
      items: [
        "Barmen diplômés et mixologues créatifs",
        "Service en tenue professionnelle élégante", 
        "Formation aux protocoles de service haut de gamme",
        "Maîtrise des techniques de flair bartending"
      ]
    },
    {
      category: "Matériel",
      icon: Settings,
      title: "Équipement professionnel",
      items: [
        "Comptoir bar modulable et design",
        "Verrerie professionnelle et élégante",
        "Machine à glaçons et réfrigération",
        "Poste d'eau intégré et gestion des déchets"
      ]
    },
    {
      category: "Offre",
      icon: Wine,
      title: "Carte diversifiée",
      items: [
        "Cocktails signatures et classiques revisités",
        "Large sélection de boissons sans alcool",
        "Option service barista avec café d'exception",
        "Mocktails créatifs pour tous les goûts"
      ]
    },
    {
      category: "Options",
      icon: Sparkles,
      title: "Personnalisation",
      items: [
        "Customisation du comptoir aux couleurs de l'événement",
        "Branding personnalisé sur verres et accessoires",
        "Système de verres consignés éco-responsable",
        "Animation cocktail avec démonstration"
      ]
    }
  ];

  const advantages = [
    "Service clé en main de A à Z",
    "Adaptation à tous types d'événements",
    "Respect des normes d'hygiène strictes",
    "Gestion responsable de l'alcool",
    "Devis transparent sans surprise"
  ];

  return (
    <div className="min-h-screen bg-gradient-section-base">
      <Navigation currentPage="services" onNavigate={() => {}} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
                Service Bar Événementiel
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-luxury text-foreground mb-6 animate-fade-in-up">
                Bar Professionnel pour Vos Événements
              </h1>
              
              <p className="text-xl text-muted-foreground font-elegant mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Service de bar complet avec barmen experts, cocktails créatifs et équipement professionnel. 
                Une expérience gustative mémorable pour tous vos invités.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Button size="lg" className="min-w-[250px] bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-300 transform">
                  Demander un devis Bar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="min-w-[250px]">
                  Voir nos réalisations
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-20 bg-gradient-card-to-base">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
                Notre Service Bar Complet
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant">
                Un service professionnel qui s'adapte à tous vos événements, du cocktail d'entreprise au mariage de prestige
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="bg-gradient-card border-border shadow-luxury hover:shadow-gold transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {service.category}
                          </Badge>
                          <h3 className="text-xl font-luxury text-foreground">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {service.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start">
                            <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground font-elegant">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Advantages */}
            <Card className="bg-gradient-accent/10 border-primary/20 shadow-luxury animate-fade-in-up">
              <CardContent className="p-8">
                <h3 className="text-2xl font-luxury text-foreground mb-6 text-center">
                  Pourquoi choisir notre service bar ?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center p-4 bg-card/50 rounded-lg">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground font-elegant">{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-section-to-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-luxury text-foreground mb-6">
                Prêt à sublimer votre événement ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 font-elegant">
                Contactez-nous pour un devis personnalisé et découvrez comment notre service bar 
                peut transformer votre événement en expérience inoubliable.
              </p>
              <Button size="lg" className="min-w-[300px] bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-300 transform">
                Demander un devis Bar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer onNavigate={() => {}} />
    </div>
  );
};