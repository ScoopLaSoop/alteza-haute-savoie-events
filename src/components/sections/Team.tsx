import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, Calendar, MessageCircle, Instagram, Linkedin } from "lucide-react";

export const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sophie Dubois",
      role: "Fondatrice & Wedding Planner",
      specialities: ["Mariages de prestige", "Coordination jour J", "Décoration"],
      experience: "8 ans",
      image: "👩‍💼",
      description: "Passionnée par la création d'événements uniques, Sophie transforme vos rêves en réalité avec un souci du détail incomparable.",
      events: 120
    },
    {
      id: 2,
      name: "Marie Lenoir",
      role: "Event Manager Corporate",
      specialities: ["Événements d'entreprise", "Séminaires", "Galas"],
      experience: "6 ans",
      image: "👩‍💻",
      description: "Experte en événementiel corporate, Marie orchestre des événements professionnels marquants et impactants.",
      events: 85
    },
    {
      id: 3,
      name: "Julie Martin",
      role: "Créatrice & Décoratrice",
      specialities: ["Design floral", "Scénographie", "Tendances"],
      experience: "5 ans",
      image: "🎨",
      description: "Artiste dans l'âme, Julie crée des ambiances magiques et des décors sur-mesure qui émerveilleront vos invités.",
      events: 95
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <Users className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">Notre équipe</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Les artisanes de vos événements
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Une équipe passionnée et expérimentée, dédiée à la création d'événements exceptionnels qui marquent les esprits
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.id} 
              className="bg-gradient-card border-border shadow-luxury hover:shadow-luxury-hover transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-luxury text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-elegant font-medium">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-muted-foreground font-elegant text-sm leading-relaxed">
                    {member.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="w-4 h-4 text-primary mr-1" />
                        <span className="text-lg font-luxury text-primary">{member.experience}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">d'expérience</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-4 h-4 text-primary mr-1" />
                        <span className="text-lg font-luxury text-primary">{member.events}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">événements</span>
                    </div>
                  </div>

                  {/* Specialities */}
                  <div>
                    <h4 className="text-sm font-luxury text-foreground mb-2">Spécialités</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialities.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-2 pt-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                      <Instagram className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                      <Linkedin className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <Card className="bg-gradient-secondary border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-luxury text-primary mb-2">300+</div>
              <div className="text-sm text-muted-foreground font-elegant">Événements réalisés</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-luxury text-primary mb-2">19</div>
              <div className="text-sm text-muted-foreground font-elegant">Années d'expérience</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-luxury text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground font-elegant">Clients satisfaits</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-luxury text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground font-elegant">Partenaires experts</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <p className="text-muted-foreground font-elegant mb-4">
            Rencontrons-nous pour discuter de votre projet
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-elegant px-8 py-4">
            <MessageCircle className="w-5 h-5 mr-2" />
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </section>
  );
};