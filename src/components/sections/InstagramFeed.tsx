import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Instagram, Heart, MessageCircle, ExternalLink, Play } from "lucide-react";

export const InstagramFeed = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Simulation de posts Instagram
  const instagramPosts = [
    {
      id: 1,
      image: "🏰",
      type: "image",
      caption: "Mariage de rêve au Château d'Annecy ✨ Une journée magique pour Clara & Antoine",
      likes: 156,
      comments: 23,
      tags: ["#mariage", "#annecy", "#chateau"],
      location: "Château d'Annecy"
    },
    {
      id: 2,
      image: "🎥",
      type: "video",
      caption: "Behind the scenes de la préparation de ce magnifique gala corporate 🎬",
      likes: 89,
      comments: 12,
      tags: ["#corporate", "#behindthescenes", "#gala"],
      location: "Megève"
    },
    {
      id: 3,
      image: "💐",
      type: "image",
      caption: "Création florale sur-mesure pour un anniversaire exceptionnel 🌸",
      likes: 203,
      comments: 34,
      tags: ["#fleurs", "#anniversaire", "#decoration"],
      location: "Évian-les-Bains"
    },
    {
      id: 4,
      image: "🎉",
      type: "image",
      caption: "EVJF inoubliable au bord du lac Léman 💕 Team bride au top !",
      likes: 124,
      comments: 18,
      tags: ["#evjf", "#lacleman", "#teamBride"],
      location: "Thonon-les-Bains"
    },
    {
      id: 5,
      image: "🍾",
      type: "image",
      caption: "Toast de minuit pour ce superbe anniversaire ! Merci pour votre confiance ✨",
      likes: 167,
      comments: 28,
      tags: ["#anniversaire", "#celebration", "#toast"],
      location: "Chamonix"
    },
    {
      id: 6,
      image: "📸",
      type: "video",
      caption: "Timelapss de l'installation de cette décoration bohème chic 🌿",
      likes: 98,
      comments: 15,
      tags: ["#timelapse", "#decoration", "#boheme"],
      location: "Annecy"
    }
  ];

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <Instagram className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">@weddingplanner_hautesavoie</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Suivez nos créations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Découvrez en temps réel nos dernières réalisations et plongez dans les coulisses de nos événements d'exception
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {instagramPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="bg-gradient-card border-border shadow-md hover:shadow-luxury-hover transition-all duration-300 group cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              onClick={() => setSelectedPost(post)}
            >
              <CardContent className="p-0 relative aspect-square">
                {/* Image/Video Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  {post.image}
                  {post.type === "video" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Overlay avec stats */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </div>
                    <p className="text-xs font-elegant">{post.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Post Modal */}
        {selectedPost && (
          <Card className="bg-gradient-card border-border shadow-luxury max-w-2xl mx-auto mb-8 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center mr-3">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-luxury text-foreground">Wedding Planner Haute-Savoie</h3>
                    <p className="text-xs text-muted-foreground">{selectedPost.location}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedPost(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="mb-4">
                <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/40 rounded-lg flex items-center justify-center text-8xl">
                  {selectedPost.image}
                  {selectedPost.type === "video" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-elegant text-foreground leading-relaxed">
                  {selectedPost.caption}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-muted-foreground">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-sm">{selectedPost.likes} j'aime</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{selectedPost.comments} commentaires</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Voir sur Instagram
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {selectedPost.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats & CTA */}
        <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-luxury text-primary">2.5K</div>
              <div className="text-sm text-muted-foreground font-elegant">Abonnés</div>
            </div>
            <div>
              <div className="text-2xl font-luxury text-primary">150+</div>
              <div className="text-sm text-muted-foreground font-elegant">Publications</div>
            </div>
            <div>
              <div className="text-2xl font-luxury text-primary">98%</div>
              <div className="text-sm text-muted-foreground font-elegant">Engagement</div>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground font-elegant mb-4">
              Rejoignez notre communauté et ne ratez aucune de nos créations
            </p>
            <Button 
              variant="outline"
              size="lg"
              className="group border-2 border-white/50 dark:text-white text-foreground hover:bg-white/10 dark:hover:bg-white/10 hover:bg-foreground/5 hover:border-primary/70 font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              <Instagram className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Suivre sur Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};