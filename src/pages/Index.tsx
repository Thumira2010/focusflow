import { useState } from "react";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import { MotivationalQuotes } from "@/components/MotivationalQuotes";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { MobileHeader } from "@/components/MobileHeader";
import { StudyModeSelector } from "@/components/StudyModeSelector";
import { BreakScreen } from "@/components/BreakScreen";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<"starry" | "landscape" | "minimal">("starry");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [studyMode, setStudyMode] = useState<1 | 2 | 3>(1);
  const [showBreakScreen, setShowBreakScreen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number>(0);

  const backgroundClasses = {
    starry: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    landscape: "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900", 
    minimal: "bg-gradient-to-br from-gray-100 via-slate-200 to-gray-300 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900"
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgroundClasses[currentTheme]}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon-cyan rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neon-pink rounded-full animate-float opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-purple rounded-full animate-float opacity-70" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block relative z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
              <span className="text-primary-foreground font-bold text-lg">🎯</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Focus Flow
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <BackgroundSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader 
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* Break Screen Overlay */}
      {showBreakScreen && (
        <BreakScreen 
          onClose={() => setShowBreakScreen(false)}
          studyMode={studyMode}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-4 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Left Sidebar - Ad Space (Hidden on mobile) */}
          <div className="hidden xl:block xl:col-span-2 space-y-6">
            <AdPlaceholder type="sidebar" />
          </div>

          {/* Center Content */}
          <div className="xl:col-span-8 space-y-6 lg:space-y-8">
            
            {/* Study Mode Selector */}
            <StudyModeSelector 
              currentMode={studyMode}
              onModeChange={setStudyMode}
            />
            
            {/* Main Focus Card - Timer and Music Side by Side */}
            <Card className="bg-gradient-glass backdrop-blur-glass border-glass-border shadow-glass p-4 lg:p-8 animate-slide-up">
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">
                  {isTimerActive ? (isBreakTime ? "Break Time! 🧘‍♀️" : "Focus Mode! 🚀") : "Ready to Focus?"}
                </h2>
                <p className="text-muted-foreground text-base lg:text-lg">
                  {isTimerActive ? (isBreakTime ? "Relax and recharge" : "Deep work session in progress") : "Start your productive session"}
                </p>
              </div>

              {/* Timer and Music Player Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Pomodoro Timer */}
                <div className="order-2 lg:order-1">
                  <PomodoroTimer 
                    studyMode={studyMode}
                    onStatusChange={(active, isBreak) => {
                      setIsTimerActive(active);
                      setIsBreakTime(isBreak);
                    }}
                    onBreakStart={() => setShowBreakScreen(true)}
                  />
                </div>

                {/* Music Player */}
                <div className="order-1 lg:order-2">
                  <MusicPlayer 
                    isBreakTime={isBreakTime}
                    selectedTrack={selectedTrack}
                    onTrackChange={setSelectedTrack}
                  />
                </div>
              </div>
            </Card>

            {/* Motivational Section */}
            <MotivationalQuotes />
            
            {/* Bottom Ad Space */}
            <AdPlaceholder type="footer" />
          </div>

          {/* Right Sidebar - Additional Ad Space (Hidden on mobile) */}
          <div className="hidden xl:block xl:col-span-2 space-y-6">
            <AdPlaceholder type="sidebar" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <div className="bg-gradient-glass backdrop-blur-glass border-glass-border rounded-lg p-4 inline-block shadow-glass">
          <p className="text-muted-foreground text-sm">
            Built for focused minds ✨ | © 2024 Focus Flow
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;