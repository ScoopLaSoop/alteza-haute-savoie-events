import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Home, Info } from "lucide-react";

export const TextesThomas = () => {
  const homeVariants = [
    {
      version: "V1",
      h1: "Des événements impeccables, sans prise de tête.",
      subtitle: "Organisation clé en main. Mariages, privés, entreprises. Réponse sous 24–48 h."
    },
    {
      version: "V2", 
      h1: "On s'occupe de tout, vous profitez.",
      subtitle: "Scénographie, bar, technique, staff. Exécution nette, timing carré."
    },
    {
      version: "V3",
      h1: "Votre événement, notre obsession.",
      subtitle: "Conception, production, logistique. Devis sur mesure, suivi sérieux."
    }
  ];

  const aboutVariants = [
    {
      version: "V1",
      text: "Équipe basée en Haute-Savoie. Promesse: accompagnement honnête, délais maîtrisés, exécution propre."
    },
    {
      version: "V2",
      text: "Studio événementiel indépendant. Créativité utile + rigueur opérationnelle pour des expériences efficaces."
    },
    {
      version: "V3", 
      text: "Agence de terrain: repérage, planning, fournisseurs fiables, sécurité, budget. Un interlocuteur unique."
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-section-base py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            Zone de travail - Thomas
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-luxury text-foreground mb-6">
            Textes prêts à copier
          </h1>
          
          <p className="text-lg text-muted-foreground font-elegant max-w-3xl mx-auto">
            3 variantes de contenus pour l'accueil et la page à propos. 
            Cliquez sur les textes pour les copier.
          </p>
        </div>

        {/* Accueil - H1 + Sous-texte */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Home className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-3xl font-luxury text-foreground">
              Accueil - H1 + Sous-texte
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {homeVariants.map((variant, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-luxury hover:shadow-gold transition-all duration-300">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-4">
                    {variant.version}
                  </Badge>
                  
                  <div className="space-y-4">
                    <div 
                      className="cursor-pointer p-4 bg-secondary/20 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                      onClick={() => copyToClipboard(variant.h1)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground font-elegant">H1</span>
                        <Copy className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-xl font-luxury text-foreground">
                        {variant.h1}
                      </h3>
                    </div>
                    
                    <div 
                      className="cursor-pointer p-4 bg-secondary/20 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                      onClick={() => copyToClipboard(variant.subtitle)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground font-elegant">Sous-titre</span>
                        <Copy className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground font-elegant">
                        {variant.subtitle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* À propos - Paragraphe */}
        <section>
          <div className="flex items-center mb-8">
            <Info className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-3xl font-luxury text-foreground">
              À propos - Paragraphe
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aboutVariants.map((variant, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-luxury hover:shadow-gold transition-all duration-300">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-4">
                    {variant.version}
                  </Badge>
                  
                  <div 
                    className="cursor-pointer p-4 bg-secondary/20 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                    onClick={() => copyToClipboard(variant.text)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground font-elegant">Paragraphe</span>
                      <Copy className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground font-elegant leading-relaxed">
                      {variant.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-accent/10 border-primary/20 shadow-luxury max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-luxury text-foreground mb-4">
                Instructions d'utilisation
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground font-elegant">
                <p>• Cliquez sur n'importe quel bloc de texte pour le copier automatiquement</p>
                <p>• Testez les différentes variantes pour voir celle qui correspond le mieux</p>
                <p>• Cette page est cachée du public, accessible uniquement via l'URL directe</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};