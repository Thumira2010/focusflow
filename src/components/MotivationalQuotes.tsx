import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Lightbulb } from "lucide-react";

const quotes = [
  {
    text: "The secret to getting ahead is getting started.",
    author: "Mark Twain",
    category: "Motivation"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
    category: "Productivity"
  },
  {
    text: "You don't have to be great to get started, but you have to get started to be great.",
    author: "Les Brown",
    category: "Getting Started"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Action"
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    category: "Consistency"
  },
  {
    text: "Deep work is like a superpower in our increasingly competitive twenty-first-century economy.",
    author: "Cal Newport",
    category: "Focus"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "Time"
  },
  {
    text: "Concentration is the secret of strength.",
    author: "Ralph Waldo Emerson",
    category: "Focus"
  }
];

const tips = [
  "💡 Try the 2-minute rule: If a task takes less than 2 minutes, do it now!",
  "🌊 Use background sounds to create a consistent work environment.",
  "🍅 The Pomodoro Technique helps maintain focus and prevents burnout.",
  "📱 Put your phone in another room to minimize distractions.",
  "🎯 Set a clear intention before each focus session.",
  "💧 Stay hydrated! Dehydration can affect concentration.",
  "🌿 Take breaks outside when possible for mental clarity.",
  "📝 Keep a notepad nearby to jot down distracting thoughts."
];

export const MotivationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [showTip, setShowTip] = useState(false);

  // Auto-rotate quotes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const toggleContent = () => {
    if (!showTip) {
      setCurrentTip(Math.floor(Math.random() * tips.length));
    }
    setShowTip(!showTip);
  };

  const quote = quotes[currentQuote];
  const tip = tips[currentTip];

  return (
    <Card className="bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass p-6 animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {showTip ? "💡 Focus Tip" : "✨ Daily Inspiration"}
          </h3>
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          {showTip ? (
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed max-w-2xl">
                {tip}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <blockquote className="text-xl text-foreground leading-relaxed max-w-2xl">
                "{quote.text}"
              </blockquote>
              <div className="flex items-center justify-center space-x-2">
                <cite className="text-muted-foreground font-medium">— {quote.author}</cite>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {quote.category}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center space-x-3 mt-6">
          <Button
            onClick={toggleContent}
            variant="outline"
            size="sm"
            className="bg-glass-light/50 backdrop-blur-sm border-glass-border hover:bg-glass-light/70"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showTip ? "Show Quote" : "Get Tip"}
          </Button>
          
          {!showTip && (
            <Button
              onClick={nextQuote}
              variant="outline"
              size="sm"
              className="bg-glass-light/50 backdrop-blur-sm border-glass-border hover:bg-glass-light/70"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Quote
            </Button>
          )}
        </div>

        <div className="mt-4 flex justify-center space-x-1">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuote && !showTip
                  ? 'bg-primary' 
                  : 'bg-muted/40'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};