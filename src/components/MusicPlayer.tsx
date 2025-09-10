import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipForward, Shuffle, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MusicPlayerProps {
  isBreakTime: boolean;
}

const playlists = {
  focus: [
    { id: 1, name: "Lo-Fi Study Beats", artist: "Study Vibes", duration: "45:30" },
    { id: 2, name: "Classical Focus", artist: "Mozart & Bach", duration: "52:15" },
    { id: 3, name: "Nature Sounds", artist: "Ambient World", duration: "60:00" },
    { id: 4, name: "White Noise", artist: "Focus Helper", duration: "30:00" },
  ],
  break: [
    { id: 5, name: "Relaxing Piano", artist: "Calm Sounds", duration: "15:20" },
    { id: 6, name: "Ocean Waves", artist: "Nature Collection", duration: "10:45" },
    { id: 7, name: "Forest Birds", artist: "Peaceful Nature", duration: "8:30" },
  ]
};

export const MusicPlayer = ({ isBreakTime }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(23); // Simulated progress

  const currentPlaylist = isBreakTime ? playlists.break : playlists.focus;
  const track = currentPlaylist[currentTrack];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (shuffleMode) {
      setCurrentTrack(Math.floor(Math.random() * currentPlaylist.length));
    } else {
      setCurrentTrack((prev) => (prev + 1) % currentPlaylist.length);
    }
  };

  const toggleShuffle = () => {
    setShuffleMode(!shuffleMode);
  };

  return (
    <Card className="bg-gradient-glass backdrop-blur-glass border-glass-border p-6 shadow-glass">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {isBreakTime ? "Break Time Music 🧘‍♀️" : "Focus Playlist 🎵"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isBreakTime ? "Relaxing sounds for your break" : "Curated music to enhance concentration"}
        </p>
      </div>

      {/* Current Track Display */}
      <div className="bg-muted/20 rounded-lg p-4 mb-4 border border-glass-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground truncate">{track.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          </div>
          <div className="text-sm text-muted-foreground ml-4">
            {track.duration}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentProgress]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={(value) => setCurrentProgress(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2:30</span>
            <span>{track.duration}</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button
          onClick={toggleShuffle}
          variant="ghost"
          size="sm"
          className={`p-2 ${shuffleMode ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Shuffle className="w-4 h-4" />
        </Button>

        <Button
          onClick={togglePlay}
          size="lg"
          className={`px-6 py-3 ${
            isBreakTime
              ? 'bg-gradient-secondary hover:shadow-glow-secondary'
              : 'bg-gradient-primary hover:shadow-glow-primary'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>

        <Button
          onClick={nextTrack}
          variant="ghost"
          size="sm"
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={volume}
          max={100}
          step={1}
          className="flex-1"
          onValueChange={setVolume}
        />
        <span className="text-sm text-muted-foreground w-8">{volume[0]}</span>
      </div>

      {/* Playlist Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Playing from: {isBreakTime ? "Break Time Collection" : "Deep Focus Mix"} • 
          Track {currentTrack + 1} of {currentPlaylist.length}
          {shuffleMode && " • Shuffle On"}
        </p>
      </div>
    </Card>
  );
};