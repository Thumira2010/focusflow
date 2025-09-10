import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stars, Mountain, Minimize2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BackgroundSelectorProps {
  currentTheme: "starry" | "landscape" | "minimal";
  onThemeChange: (theme: "starry" | "landscape" | "minimal") => void;
}

const themes = [
  {
    id: "starry" as const,
    name: "Starry Night",
    icon: Stars,
    preview: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    description: "Deep space vibes"
  },
  {
    id: "landscape" as const,
    name: "Calm Landscape", 
    icon: Mountain,
    preview: "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900",
    description: "Nature serenity"
  },
  {
    id: "minimal" as const,
    name: "Clean Minimal",
    icon: Minimize2,
    preview: "bg-gradient-to-br from-gray-100 via-slate-200 to-gray-300",
    description: "Pure focus"
  }
];

export const BackgroundSelector = ({ currentTheme, onThemeChange }: BackgroundSelectorProps) => {
  const currentThemeData = themes.find(theme => theme.id === currentTheme);
  const CurrentIcon = currentThemeData?.icon || Stars;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-glass-light/50 backdrop-blur-sm border-glass-border hover:bg-glass-light/70 transition-all duration-300"
        >
          <CurrentIcon className="w-4 h-4 mr-2" />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass" align="end">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Background Theme</h3>
            <p className="text-sm text-muted-foreground">Choose your focus environment</p>
          </div>
          
          <div className="grid gap-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = currentTheme === theme.id;
              
              return (
                <Card
                  key={theme.id}
                  className={`p-4 cursor-pointer transition-all duration-200 border-glass-border ${
                    isActive 
                      ? 'bg-primary/20 border-primary/30 shadow-glow-primary' 
                      : 'bg-glass-light/30 hover:bg-glass-light/50'
                  }`}
                  onClick={() => onThemeChange(theme.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${theme.preview} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{theme.name}</h4>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};