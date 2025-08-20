import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Maximize2, Users, Calendar, Award } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken] = useState("pk.eyJ1Ijoic2Nvb3BsYXNvb3AiLCJhIjoiY21kdmV4NTMyMXBrNzJqc2FpZGZ6OWs0YSJ9.iJpsK0bGuYD85L4XRZtIVw");
  const [showTokenInput] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Événements géolocalisés en Haute-Savoie
  const events = [
    {
      id: 1,
      title: "Mariage Château d'Annecy",
      type: "Mariage",
      location: "Annecy",
      coordinates: [6.1296, 45.8992] as [number, number],
      date: "15 juin 2024",
      guests: 150,
      description: "Mariage de prestige dans un château historique avec vue sur le lac",
      budget: "35 000€",
      image: "🏰"
    },
    {
      id: 2,
      title: "Corporate Megève",
      type: "Entreprise",
      location: "Megève",
      coordinates: [6.6168, 45.8564] as [number, number],
      date: "20 octobre 2024",
      guests: 200,
      description: "Séminaire d'entreprise dans une station de ski de luxe",
      budget: "45 000€",
      image: "🏢"
    },
    {
      id: 3,
      title: "Mariage Chamonix",
      type: "Mariage",
      location: "Chamonix",
      coordinates: [6.8694, 45.9237] as [number, number],
      date: "28 août 2024",
      guests: 80,
      description: "Cérémonie en montagne face au Mont Blanc",
      budget: "22 000€",
      image: "⛰️"
    },
    {
      id: 4,
      title: "EVJF Annecy",
      type: "EVJF",
      location: "Annecy",
      coordinates: [6.1296, 45.8992] as [number, number],
      date: "5 mai 2024",
      guests: 12,
      description: "Enterrement de vie de jeune fille glamour au bord du lac",
      budget: "3 500€",
      image: "🎉"
    },
    {
      id: 5,
      title: "Anniversaire Thonon",
      type: "Anniversaire",
      location: "Thonon-les-Bains",
      coordinates: [6.4815, 46.3717] as [number, number],
      date: "12 septembre 2024",
      guests: 100,
      description: "Célébration d'anniversaire avec vue sur le lac Léman",
      budget: "18 000€",
      image: "🎂"
    },
    {
      id: 6,
      title: "Gala Évian",
      type: "Entreprise",
      location: "Évian-les-Bains",
      coordinates: [6.5883, 46.4008] as [number, number],
      date: "15 novembre 2024",
      guests: 250,
      description: "Gala de fin d'année dans un palace thermal",
      budget: "55 000€",
      image: "🥂"
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [6.3, 45.95] as [number, number], // Centre sur la Haute-Savoie
      zoom: 9,
      pitch: 45,
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Ajouter les marqueurs pour chaque événement
    events.forEach((event) => {
      // Créer un élément de marqueur personnalisé
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="marker-content" style="
          background: linear-gradient(135deg, hsl(43 85% 65%) 0%, hsl(43 75% 55%) 100%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 3px solid white;
          transition: all 0.3s ease;
        ">${event.image}</div>
      `;

      // Ajouter des effets hover
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
      });
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
      });

      // Créer le marqueur
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(event.coordinates)
        .addTo(map.current!);

      // Ajouter un popup au clic
      markerElement.addEventListener('click', () => {
        setSelectedEvent(event);
        
        // Centrer la carte sur cet événement
        map.current?.flyTo({
          center: event.coordinates as [number, number],
          zoom: 12,
          duration: 1000
        });
      });
    });

    // Ajouter un effet d'atmosphère
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(25, 25, 35)',
        'high-color': 'rgb(45, 45, 65)',
        'horizon-blend': 0.1,
      });
    });
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken]);

  const getEventsByType = (type: string) => {
    return events.filter(event => event.type === type).length;
  };

  const eventTypes = ["Mariage", "Entreprise", "EVJF", "Anniversaire"];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6 animate-fade-in-up">
            <MapPin className="w-5 h-5 text-primary mr-3" />
            <span className="text-sm font-elegant text-primary">Nos réalisations en Haute-Savoie</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-luxury text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Carte interactive
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-elegant animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Explorez nos événements organisés à travers la Haute-Savoie et découvrez la richesse de notre territoire
          </p>
        </div>

        {/* Token Input (pour Mapbox) */}
        {showTokenInput && (
          <div className="max-w-md mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-luxury text-foreground mb-4">Configuration Mapbox</h3>
                <p className="text-sm text-muted-foreground font-elegant mb-4">
                  Pour afficher la carte interactive, veuillez obtenir votre token Mapbox gratuit sur{' '}
                  <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    mapbox.com
                  </a>
                </p>
                <div className="flex gap-2">
                  <div className="text-center">
                    <p className="text-muted-foreground font-elegant">Token Mapbox configuré</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Carte */}
          <div className="lg:col-span-2 animate-fade-in-left">
            <Card className="bg-gradient-card border-border shadow-luxury overflow-hidden">
              <CardContent className="p-0">
                <div 
                  ref={mapContainer} 
                  className="h-96 lg:h-[500px] w-full relative"
                  style={{ display: showTokenInput ? 'none' : 'block' }}
                />
                {showTokenInput && (
                  <div className="h-96 lg:h-[500px] w-full bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground font-elegant">Carte interactive bientôt disponible</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec stats et détails */}
          <div className="space-y-6 animate-fade-in-right">
            {/* Stats par type d'événement */}
            <Card className="bg-gradient-card border-border shadow-luxury">
              <CardContent className="p-6">
                <h3 className="text-xl font-luxury text-foreground mb-6">Répartition par type</h3>
                <div className="space-y-4">
                  {eventTypes.map((type) => {
                    const count = getEventsByType(type);
                    const percentage = (count / events.length) * 100;
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-elegant text-foreground">{type}</span>
                          <Badge variant="outline" className="text-xs">
                            {count} événement{count > 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-gradient-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Événement sélectionné */}
            {selectedEvent && (
              <Card className="bg-gradient-card border-border shadow-luxury animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-luxury text-foreground">Détails</h3>
                    <div className="text-2xl">{selectedEvent.image}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-luxury text-primary">
                      {selectedEvent.title}
                    </h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedEvent.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {selectedEvent.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        {selectedEvent.guests} participants
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground font-elegant text-sm leading-relaxed">
                      {selectedEvent.description}
                    </p>
                    
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Budget</span>
                        <span className="font-luxury text-primary">{selectedEvent.budget}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations générales */}
            <Card className="bg-gradient-card border-border shadow-luxury">
              <CardContent className="p-6">
                <h3 className="text-xl font-luxury text-foreground mb-4">Zone d'intervention</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-primary mr-3" />
                    <span className="font-elegant text-foreground">Haute-Savoie & limitrophes</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-elegant">
                    Annecy, Chamonix, Megève, Évian, Thonon, et toute la région alpine
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-luxury text-primary">{events.length}+</div>
                        <div className="text-xs text-muted-foreground font-elegant">Lieux d'exception</div>
                      </div>
                      <div>
                        <div className="text-lg font-luxury text-primary">50km</div>
                        <div className="text-xs text-muted-foreground font-elegant">Rayon moyen</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground font-elegant mb-4">
            Explorez nos lieux partenaires et imaginez votre événement
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="group border-2 border-white/50 dark:text-white text-foreground hover:bg-white/10 dark:hover:bg-white/10 hover:bg-foreground/5 hover:border-primary/70 font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            <Navigation className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Découvrir nos lieux d'exception
          </Button>
        </div>
      </div>
    </section>
  );
};