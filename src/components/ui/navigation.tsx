import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "./button";
import { SimpleThemeToggle } from "./theme-toggle";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { key: "accueil", label: "Accueil" },
    { key: "services", label: "Services" },
    { key: "portfolio", label: "Portfolio" },
    { key: "apropos", label: "À propos" },
    { key: "quiz", label: "Quiz" },
    { key: "faq", label: "FAQ" },
    { key: "contact", label: "Contact" },
  ];

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/98 backdrop-blur-md border-b border-border shadow-luxury' 
            : 'bg-background/95 backdrop-blur-sm border-b border-border'
        }`}
        role="navigation"
        aria-label="Navigation principale"
        data-testid="main-navigation"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => handleNavigate("accueil")}
            className="text-2xl font-luxury text-primary hover:scale-105 transition-transform duration-300"
          >
            ALTÉZA EVEN'T
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                className={`text-sm font-elegant transition-all duration-300 hover:scale-105 ${
                  currentPage === item.key
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <SimpleThemeToggle />
            
            {/* CTA Button in Header */}
            <Button
              onClick={() => handleNavigate("contact")}
              variant="outline"
              size="sm"
              className="group border-2 border-primary/60 dark:border-white/50 dark:text-white text-foreground bg-white/10 dark:bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 hover:border-primary/80 dark:hover:border-primary/70 hover:text-primary dark:hover:text-primary font-elegant px-6 py-2 text-sm backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ml-4"
            >
              Demander un devis
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <SimpleThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="relative z-50 hover:bg-primary/10 transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
            <div className="relative w-6 h-6">
              <span className={`absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 top-2.5' : ''
              }`} />
              <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`} />
              <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 top-2.5' : ''
              }`} />
            </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isOpen 
          ? 'visible opacity-100' 
          : 'invisible opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Slide-in Menu */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-card border-l border-border shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="text-xl font-luxury text-primary">Menu</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-6">
              {navItems.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={`block w-full text-left px-6 py-4 text-lg font-elegant transition-all duration-300 hover:bg-primary/5 hover:border-r-4 hover:border-primary ${
                    currentPage === item.key
                      ? "text-primary bg-primary/10 border-r-4 border-primary"
                      : "text-foreground"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Footer with Contact Info */}
            <div className="p-6 border-t border-border bg-secondary/20">
              <div className="space-y-4">
                <Button
                  onClick={() => handleNavigate("contact")}
                  variant="outline"
                  size="lg"
                  className="group w-full border-2 border-white/50 dark:text-white text-foreground hover:bg-white/10 dark:hover:bg-white/10 hover:bg-foreground/5 hover:border-primary/70 font-elegant px-10 py-6 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  Demander un devis
                </Button>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <span>contact@altezaevent.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};