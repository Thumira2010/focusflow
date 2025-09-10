import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Zap, Target, Trophy } from "lucide-react";

interface StudyModeSelectorProps {
  currentMode: 1 | 2 | 3;
  onModeChange: (mode: 1 | 2 | 3) => void;
}

const studyModes = [
  {
    id: 1 as const,
    name: "Quick Focus",
    duration: "1 Hour",
    sessions: "2x 25min + 1x 10min break",
    icon: Zap,
    description: "Perfect for short tasks and quick bursts of productivity",
    color: "text-primary"
  },
  {
    id: 2 as const,
    name: "Deep Work",
    duration: "2 Hours", 
    sessions: "4x 25min + 3x 10min breaks",
    icon: Target,
    description: "Ideal for focused work sessions and complex projects",
    color: "text-secondary"
  },
  {
    id: 3 as const,
    name: "Marathon Mode",
    duration: "3 Hours",
    sessions: "6x 25min + 5x 10min breaks",
    icon: Trophy,
    description: "For deep dives into challenging material and extensive study",
    color: "text-warning"
  }
];

export const StudyModeSelector = ({ currentMode, onModeChange }: StudyModeSelectorProps) => {
  return (
    <Card className="bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass p-4 lg:p-6 animate-fade-in">
      <div className="text-center mb-4 lg:mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg lg:text-xl font-semibold text-foreground">
            Study Mode
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose your focus session duration with guided breaks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
        {studyModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = currentMode === mode.id;
          
          return (
            <Button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              variant={isSelected ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-start space-y-2 transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-primary shadow-glow-primary border-primary/50' 
                  : 'bg-muted/20 border-glass-border hover:bg-muted/30 hover:border-primary/30'
              }`}
            >
              <div className="flex items-center space-x-2 w-full">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-primary-foreground' : mode.color}`} />
                <span className={`font-semibold text-sm ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {mode.name}
                </span>
              </div>
              
              <div className="text-left w-full">
                <p className={`text-xs font-medium ${isSelected ? 'text-primary-foreground/90' : 'text-foreground/70'}`}>
                  {mode.duration}
                </p>
                <p className={`text-xs ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {mode.sessions}
                </p>
                <p className={`text-xs mt-1 ${isSelected ? 'text-primary-foreground/60' : 'text-muted-foreground/80'}`}>
                  {mode.description}
                </p>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};