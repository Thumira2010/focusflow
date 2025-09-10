import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Coffee, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PomodoroTimerProps {
  studyMode: 1 | 2 | 3;
  onStatusChange: (isActive: boolean, isBreak: boolean) => void;
  onBreakStart: () => void;
}

export const PomodoroTimer = ({ studyMode, onStatusChange, onBreakStart }: PomodoroTimerProps) => {
  const [minutes, setMinutes] = useState(() => {
    const studyTime = studyMode === 1 ? 25 : studyMode === 2 ? 25 : 25;
    return studyTime;
  });
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalTime, setTotalTime] = useState(() => {
    const studyTime = studyMode === 1 ? 25 : studyMode === 2 ? 25 : 25;
    return studyTime * 60;
  });
  const [currentSession, setCurrentSession] = useState(1);
  const [totalSessions] = useState(() => {
    return studyMode === 1 ? 2 : studyMode === 2 ? 4 : 6;
  });
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update parent component when status changes
  useEffect(() => {
    onStatusChange(isActive, isBreak);
  }, [isActive, isBreak, onStatusChange]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          setIsActive(false);
          if (!isBreak) {
            // Work session finished, start break
            onBreakStart();
            setIsBreak(true);
            setMinutes(5);
            setSeconds(0);
            setTotalTime(5 * 60);
            toast({
              title: "Work session complete! ✅",
              description: `Time for a 5-minute break (${currentSession}/${totalSessions})`,
            });
          } else {
            // Break finished, check if study mode is complete
            setIsBreak(false);
            if (currentSession < totalSessions) {
              setCurrentSession(prev => prev + 1);
              setMinutes(25);
              setSeconds(0);
              setTotalTime(25 * 60);
              toast({
                title: "Break over! 🚀",
                description: `Ready for session ${currentSession + 1}/${totalSessions}?`,
              });
            } else {
              // All sessions complete
              setCurrentSession(1);
              setMinutes(25);
              setSeconds(0);
              setTotalTime(25 * 60);
              toast({
                title: "Study mode complete! 🎉",
                description: `You've finished all ${totalSessions} sessions!`,
              });
            }
          }
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, isBreak, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentSession(1);
    if (isBreak) {
      setMinutes(5);
      setSeconds(0);
      setTotalTime(5 * 60);
    } else {
      const studyTime = studyMode === 1 ? 25 : studyMode === 2 ? 25 : 25;
      setMinutes(studyTime);
      setSeconds(0);
      setTotalTime(studyTime * 60);
    }
  };

  const currentTotalSeconds = minutes * 60 + seconds;
  const progress = ((totalTime - currentTotalSeconds) / totalTime) * 100;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-6">
      {/* Timer Display */}
      <div className="relative">
        <div className={`text-6xl md:text-8xl font-bold mb-4 ${
          isBreak 
            ? 'bg-gradient-secondary bg-clip-text text-transparent' 
            : 'bg-gradient-primary bg-clip-text text-transparent'
        }`}>
          {formatTime(minutes, seconds)}
        </div>
        
        {/* Progress Ring Visual */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted/20"
            />
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 64}`}
              strokeDashoffset={`${2 * Math.PI * 64 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isBreak ? "hsl(var(--secondary))" : "hsl(var(--primary))"} />
                <stop offset="100%" stopColor={isBreak ? "hsl(var(--secondary-glow))" : "hsl(var(--primary-glow))"} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isBreak ? (
              <Coffee className="w-12 h-12 text-secondary animate-float" />
            ) : (
              <Zap className="w-12 h-12 text-primary animate-float" />
            )}
          </div>
        </div>
      </div>

      {/* Session Type Indicator */}
      <div className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-medium ${
        isBreak 
          ? 'bg-secondary/20 text-secondary border border-secondary/30' 
          : 'bg-primary/20 text-primary border border-primary/30'
      }`}>
        {isBreak ? (
          <>
            <Coffee className="w-4 h-4 mr-2" />
            Break Session
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Focus Session {currentSession}/{totalSessions}
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <Progress 
          value={progress} 
          className="h-2 bg-muted/30"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={toggleTimer}
          size="lg"
          className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
            isBreak
              ? 'bg-gradient-secondary hover:shadow-glow-secondary'
              : 'bg-gradient-primary hover:shadow-glow-primary'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              {isBreak ? 'Start Break' : 'Start Focus'}
            </>
          )}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
          className="px-8 py-4 border-glass-border bg-glass-light/50 backdrop-blur-sm hover:bg-glass-light/70"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};