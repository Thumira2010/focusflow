import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipForward, Shuffle, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MusicPlayerProps {
  isBreakTime: boolean;
  selectedTrack: number;
  onTrackChange: (trackId: number) => void;
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

export const MusicPlayer = ({ isBreakTime, selectedTrack, onTrackChange }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(23); // Simulated progress

  const currentPlaylist = isBreakTime ? playlists.break : playlists.focus;
  const track = currentPlaylist[selectedTrack % currentPlaylist.length];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (shuffleMode) {
      const newTrack = Math.floor(Math.random() * currentPlaylist.length);
      onTrackChange(newTrack);
    } else {
      const newTrack = (selectedTrack + 1) % currentPlaylist.length;
      onTrackChange(newTrack);
    }
  };

  const selectTrack = (trackIndex: number) => {
    onTrackChange(trackIndex);
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

      {/* Playlist */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        <h4 className="text-sm font-medium text-foreground mb-2">
          {isBreakTime ? "Break Playlist" : "Focus Playlist"}
        </h4>
        {currentPlaylist.map((track, index) => (
          <button
            key={track.id}
            onClick={() => selectTrack(index)}
            className={`w-full text-left p-2 rounded-lg border transition-all duration-200 ${
              index === selectedTrack % currentPlaylist.length
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-muted/10 border-glass-border hover:bg-muted/20 text-foreground'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.name}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground ml-2">{track.duration}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Playlist Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Playing from: {isBreakTime ? "Break Time Collection" : "Deep Focus Mix"} • 
          Track {(selectedTrack % currentPlaylist.length) + 1} of {currentPlaylist.length}
          {shuffleMode && " • Shuffle On"}
        </p>
      </div>
    </Card>
  );
};