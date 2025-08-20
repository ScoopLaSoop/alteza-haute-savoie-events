import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, Calendar, MessageCircle, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  onNavigate?: (page: string) => void;
}

export const Team = ({ onNavigate }: TeamProps) => {
  const teamMembers = [
    {
      id: 1,
      name: "Thomas Briche",
      role: "Créateur & Gestionnaire",
      specialities: ["Bar man", "Événements", "Gestion d'entreprise"],
      experience: "4 ans",
      image: "🍸",
      description: "Créateur passionné du projet ALTÉZA EVEN'T, Thomas s'occupe de la gestion globale de l'entreprise, du recrutement et de l'organisation des événements. Son expertise en bar et sa vision entrepreneuriale font de chaque événement une expérience unique.",
      events: 80,
      instagram: "https://www.instagram.com/thomas__brc_?igsh=MWtxYzNxemYxZHA3bg==",
      linkedin: null
    },
    {
      id: 2,
      name: "Lucas Provenzano",
      role: "Développeur & Gestionnaire Digital",
      specialities: ["Développement web", "Plateforme digitale", "Technologie"],
      experience: "3 ans",
      image: "💻",
      description: "Expert en développement web et gestion de plateformes digitales, Lucas s'occupe de tout l'aspect technologique d'ALTÉZA EVEN'T. Il assure la création et la maintenance du site web pour offrir une expérience digitale exceptionnelle.",
      events: null,
      instagram: "https://www.instagram.com/provenzano.lucas/?igsh=MWtxYzNxemYxZHA3bg%3D%3D#",
      linkedin: "https://www.linkedin.com/in/lucas-provenzano-a838212b6/"
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
            L'équipe de vos événements
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Une équipe passionnée et expérimentée, dédiée à la création d'événements exceptionnels qui marquent les esprits
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.id} 
              className="bg-gradient-card border-border shadow-luxury hover:shadow-luxury-hover transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${0.6 + index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {member.image.startsWith('/') ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full bg-gradient-accent rounded-full flex items-center justify-center text-4xl ${member.image.startsWith('/') ? 'hidden' : ''}`}>
                    {member.image.startsWith('/') ? member.name.charAt(0) : member.image}
                  </div>
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
                  <div className={`grid ${member.events ? 'grid-cols-2' : 'grid-cols-1'} gap-4 py-4`}>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="w-4 h-4 text-primary mr-1" />
                        <span className="text-lg font-luxury text-primary">{member.experience}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">d'expérience</span>
                    </div>
                    {member.events && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Award className="w-4 h-4 text-primary mr-1" />
                          <span className="text-lg font-luxury text-primary">{member.events}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">événements</span>
                      </div>
                    )}
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
                    {member.instagram && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-8 h-8 p-0 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => window.open(member.instagram, '_blank')}
                      >
                        <Instagram className="w-3 h-3" />
                      </Button>
                    )}
                    {member.linkedin && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-8 h-8 p-0 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => window.open(member.linkedin, '_blank')}
                      >
                        <Linkedin className="w-3 h-3" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-8 h-8 p-0 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                      onClick={() => window.open('mailto:contact@altezaevent.com')}
                    >
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
              <div className="text-2xl font-luxury text-primary mb-2">4</div>
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
          <Button 
            onClick={() => onNavigate ? onNavigate("contact") : window.location.href = "#contact"}
            variant="outline"
            size="lg"
            className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </section>
  );
};