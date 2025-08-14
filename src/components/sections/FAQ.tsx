import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle, Download, Phone } from "lucide-react";
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const categories = [{
    id: "general",
    name: "Questions générales"
  }, {
    id: "planning",
    name: "Planification"
  }, {
    id: "budget",
    name: "Budget & Devis"
  }, {
    id: "logistique",
    name: "Logistique"
  }];
  const faqData: FAQItem[] = [{
    category: "general",
    question: "Combien de temps à l'avance dois-je vous contacter ?",
    answer: "Nous recommandons de nous contacter 6 à 9 mois à l'avance pour les événements importants (mariages, galas) et 2 à 3 mois pour les événements plus simples. Nous acceptons aussi les demandes de dernière minute selon nos disponibilités."
  }, {
    category: "general",
    question: "Intervenez-vous uniquement en Haute-Savoie ?",
    answer: "Notre zone d'intervention principale est la Haute-Savoie, mais nous organisons également des événements dans les départements limitrophes (Savoie, Ain, Suisse voisine) selon la nature et l'ampleur du projet."
  }, {
    category: "general",
    question: "Proposez-vous des prestations partielles ?",
    answer: "Absolument ! Nous adaptons nos services à vos besoins : coordination jour J uniquement, conseil et planification, décoration seule, ou accompagnement complet de A à Z."
  }, {
    category: "planning",
    question: "Comment se déroule la planification d'un événement ?",
    answer: "Notre processus se déroule en 6 étapes : premier contact, conception créative, planification détaillée, préparation finale, coordination le jour J, et suivi post-événement. Chaque étape est validée avec vous."
  }, {
    category: "planning",
    question: "Combien de réunions prévoyez-vous ?",
    answer: "Nous organisons généralement 3-5 réunions selon la complexité : brief initial, présentation du concept, validation finale, plus des points réguliers par téléphone ou visio."
  }, {
    category: "planning",
    question: "Gérez-vous les imprévus le jour J ?",
    answer: "C'est notre expertise ! Nous avons toujours des plans B et notre équipe sur site gère tous les imprévus (météo, retards, problèmes techniques) pour que vous puissiez profiter sereinement de votre événement."
  }, {
    category: "budget",
    question: "Comment établissez-vous vos tarifs ?",
    answer: "Nos tarifs dépendent de plusieurs facteurs : type d'événement, nombre d'invités, complexité, prestations incluses. Nous proposons toujours un devis personnalisé gratuit après notre premier échange."
  }, {
    category: "budget",
    question: "Proposez-vous des facilités de paiement ?",
    answer: "Oui, nous proposons un échelonnement des paiements : acompte à la signature, paiements intermédiaires selon l'avancement, et solde après l'événement."
  }, {
    category: "budget",
    question: "Les devis incluent-ils tous les prestataires ?",
    answer: "Nos devis sont transparents et détaillés. Ils incluent nos honoraires et peuvent inclure nos partenaires prestataires selon votre choix. Vous gardez toujours la liberté de choisir vos propres prestataires."
  }, {
    category: "logistique",
    question: "Avez-vous vos propres équipements ?",
    answer: "Nous disposons d'une sélection d'équipements de base et travaillons avec un réseau de partenaires de confiance pour tout le matériel spécialisé (son, éclairage, mobilier, décoration)."
  }, {
    category: "logistique",
    question: "Gérez-vous l'hébergement des invités ?",
    answer: "Bien sûr ! Nous pouvons nous occuper de la réservation d'hôtels, chambres d'hôtes ou locations pour vos invités, avec des tarifs préférentiels négociés."
  }, {
    category: "logistique",
    question: "Que se passe-t-il en cas de mauvais temps ?",
    answer: "Nous préparons toujours des solutions alternatives : locations de chapiteaux, espaces de repli couverts, adaptation du programme. La météo ne gâchera jamais votre événement !"
  }];
  const filteredFAQ = faqData
    .filter(item => item.category === activeCategory)
    .sort((a, b) => b.answer.length - a.answer.length); // Trier par longueur décroissante
  const toggleItem = (index: number) => {
    setOpenItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <HelpCircle className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">Toutes vos réponses</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            Questions fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{
          animationDelay: '0.4s'
        }}>
            Retrouvez les réponses aux questions les plus courantes sur nos services et notre processus d'organisation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{
          animationDelay: '0.6s'
        }}>
            {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 font-elegant ${activeCategory === category.id ? 'bg-primary text-primary-foreground shadow-gold' : 'bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-foreground'}`}>
                {category.name}
              </button>)}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12 animate-fade-in-up" style={{
          animationDelay: '0.8s'
        }}>
            {filteredFAQ.map((item, index) => <Card key={index} className="bg-gradient-card border-border shadow-luxury">
                <CardContent className="p-0">
                  <button onClick={() => toggleItem(index)} className="w-full p-6 text-left hover:bg-primary/5 transition-colors duration-200 flex items-center justify-between">
                    <h3 className="font-elegant text-foreground text-lg pr-4">
                      {item.question}
                    </h3>
                    {openItems.includes(index) ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                  </button>
                  
                  {openItems.includes(index) && <div className="px-6 pb-6 animate-fade-in-up">
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground font-elegant leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>}
                </CardContent>
              </Card>)}
          </div>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{
          animationDelay: '1s'
        }}>
            

            <Card className="bg-gradient-card border-border shadow-luxury">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-luxury text-foreground mb-3">
                  Consultation gratuite
                </h3>
                <p className="text-muted-foreground font-elegant mb-4 text-sm">
                  Votre question n'est pas listée ? Contactez-nous pour un échange personnalisé de 30 minutes.
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Prendre rendez-vous
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 animate-fade-in-up" style={{
          animationDelay: '1.2s'
        }}>
            <p className="text-muted-foreground font-elegant mb-4">
              Vous avez d'autres questions ? Notre équipe est là pour vous aider
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
                <Phone className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-elegant text-primary">Réponse sous 24–48 h garantie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};