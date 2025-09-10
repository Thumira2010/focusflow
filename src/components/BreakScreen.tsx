import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coffee, Eye, Droplets, Wind, X } from "lucide-react";

interface BreakScreenProps {
  onClose: () => void;
  studyMode: 1 | 2 | 3;
}

const breakTips = [
  {
    icon: Eye,
    title: "Rest Your Eyes",
    description: "Look at something 20 feet away for 20 seconds to reduce eye strain.",
    duration: "20 seconds"
  },
  {
    icon: Droplets,
    title: "Stay Hydrated",
    description: "Drink a glass of water to keep your brain functioning optimally.",
    duration: "30 seconds"
  },
  {
    icon: Wind,
    title: "Deep Breathing",
    description: "Take 5 deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.",
    duration: "60 seconds"
  }
];

export const BreakScreen = ({ onClose, studyMode }: BreakScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [currentTip, setCurrentTip] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onClose]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % breakTips.length);
    }, 15000); // Change tip every 15 seconds

    return () => clearInterval(tipInterval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((300 - timeLeft) / 300) * 100;
  
  const tip = breakTips[currentTip];
  const TipIcon = tip.icon;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass p-6 animate-scale-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Coffee className="w-6 h-6 text-secondary animate-float" />
            <h2 className="text-2xl font-bold text-foreground">Break Time!</h2>
          </div>
          <p className="text-muted-foreground">
            You're in study mode {studyMode} - Time to recharge
          </p>
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <Progress value={progress} className="h-2 bg-muted/30" />
        </div>

        {/* Break Activity */}
        <div className="text-center mb-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
          <TipIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground mb-1">{tip.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
          <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
            {tip.duration}
          </span>
        </div>

        {/* Tip Indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {breakTips.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTip ? 'bg-secondary' : 'bg-muted/40'
              }`}
            />
          ))}
        </div>

        {/* Skip Break Button */}
        <Button
          onClick={onClose}
          variant="outline"
          className="w-full border-glass-border bg-glass-light/50 backdrop-blur-sm hover:bg-glass-light/70"
        >
          <X className="w-4 h-4 mr-2" />
          Skip Break
        </Button>
      </Card>
    </div>
  );
};