import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundSelector } from "@/components/BackgroundSelector";

interface MobileHeaderProps {
  currentTheme: "starry" | "landscape" | "minimal";
  onThemeChange: (theme: "starry" | "landscape" | "minimal") => void;
}

export const MobileHeader = ({ currentTheme, onThemeChange }: MobileHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden relative z-50 p-4 border-b border-glass-border bg-gradient-glass backdrop-blur-glass">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
            <span className="text-primary-foreground font-bold text-sm">🎯</span>
          </div>
          <h1 className="text-lg font-bold bg-gradient-neon bg-clip-text text-transparent">
            Focus Flow
          </h1>
        </div>

        {/* Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-80 bg-gradient-glass backdrop-blur-glass border-glass-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Theme</h3>
                <ThemeToggle />
              </div>

              {/* Background Selector */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Background</h3>
                <BackgroundSelector 
                  currentTheme={currentTheme} 
                  onThemeChange={onThemeChange} 
                />
              </div>

              {/* About */}
              <div className="pt-6 border-t border-glass-border">
                <p className="text-xs text-muted-foreground">
                  Focus Flow v1.0<br />
                  Built for focused minds ✨
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};