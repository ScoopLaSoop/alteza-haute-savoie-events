import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./button";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "accueil", label: "Accueil" },
    { key: "services", label: "Services" },
    { key: "portfolio", label: "Portfolio" },
    { key: "apropos", label: "À propos" },
    { key: "quiz", label: "Quiz" },
    { key: "faq", label: "FAQ" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-luxury text-primary">
          ALTÉZA EVEN'T
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`text-sm font-elegant transition-colors ${
                currentPage === item.key
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* CTA Button in Header */}
          <Button
            onClick={() => onNavigate("contact")}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground ml-4 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 transition-all duration-300 transform"
          >
            Demander un devis
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-elegant transition-colors ${
                    currentPage === item.key
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};