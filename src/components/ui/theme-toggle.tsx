import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '@/contexts/theme-context';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Clair', icon: Sun },
    { value: 'dark' as const, label: 'Sombre', icon: Moon },
    { value: 'system' as const, label: 'Système', icon: Monitor },
  ];

  const currentThemeOption = themeOptions.find(option => option.value === theme);
  const CurrentIcon = currentThemeOption?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-primary/10 transition-colors duration-300"
        >
          <CurrentIcon className="h-5 w-5 transition-all duration-300" />
          <span className="sr-only">Basculer le thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-gradient-card border-border shadow-luxury backdrop-blur-md"
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`cursor-pointer hover:bg-primary/5 transition-colors ${
                theme === option.value ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="font-elegant">{option.label}</span>
              {theme === option.value && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Composant simple pour mobile (toggle direct)
export function SimpleThemeToggle() {
  const { actualTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative hover:bg-primary/10 transition-all duration-300 hover:scale-110"
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 transition-all duration-300 ${
          actualTheme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        }`} />
        <Moon className={`absolute inset-0 transition-all duration-300 ${
          actualTheme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
      <span className="sr-only">Basculer le thème</span>
    </Button>
  );
}
