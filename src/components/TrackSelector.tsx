
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Trophy, Clock } from "lucide-react";
import { toast } from "sonner";

const F1_TRACKS = [
  {
    id: "monaco",
    name: "Monaco Grand Prix",
    location: "Monte Carlo, Monaco",
    length: "3.337 km",
    lapRecord: "1:14.260",
    turns: 19,
    difficulty: "Extreme",
    image: "🏁",
    characteristics: ["Street Circuit", "Tight Corners", "Elevation Changes"]
  },
  {
    id: "silverstone",
    name: "Silverstone Circuit",
    location: "Silverstone, England",
    length: "5.891 km",
    lapRecord: "1:27.097",
    turns: 18,
    difficulty: "High",
    image: "🇬🇧",
    characteristics: ["High Speed", "Fast Corners", "Historic Track"]
  },
  {
    id: "spa",
    name: "Circuit de Spa-Francorchamps",
    location: "Spa, Belgium",
    length: "7.004 km",
    lapRecord: "1:46.286",
    turns: 19,
    difficulty: "High",
    image: "🇧🇪",
    characteristics: ["Longest Track", "Eau Rouge", "Weather Dependent"]
  },
  {
    id: "monza",
    name: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    length: "5.793 km",
    lapRecord: "1:21.046",
    turns: 11,
    difficulty: "Medium",
    image: "🇮🇹",
    characteristics: ["Temple of Speed", "Long Straights", "Chicanes"]
  },
  {
    id: "suzuka",
    name: "Suzuka International Racing Course",
    location: "Suzuka, Japan",
    length: "5.807 km",
    lapRecord: "1:30.983",
    turns: 18,
    difficulty: "High",
    image: "🇯🇵",
    characteristics: ["Figure-8 Layout", "Technical", "130R Corner"]
  },
  {
    id: "interlagos",
    name: "Autódromo José Carlos Pace",
    location: "São Paulo, Brazil",
    length: "4.309 km",
    lapRecord: "1:10.540",
    turns: 15,
    difficulty: "Medium",
    image: "🇧🇷",
    characteristics: ["Anti-clockwise", "Elevation Changes", "Senna S"]
  },
  {
    id: "hungary",
    name: "Hungaroring",
    location: "Budapest, Hungary",
    length: "4.381 km",
    lapRecord: "1:16.627",
    turns: 14,
    difficulty: "High",
    image: "🇭🇺",
    characteristics: ["Twisty", "Overtaking Difficult", "Monaco-like"]
  },
  {
    id: "singapore",
    name: "Marina Bay Street Circuit",
    location: "Singapore",
    length: "5.063 km",
    lapRecord: "1:35.867",
    turns: 23,
    difficulty: "Extreme",
    image: "🇸🇬",
    characteristics: ["Night Race", "Street Circuit", "Humidity Challenge"]
  },
  {
    id: "bahrain",
    name: "Bahrain International Circuit",
    location: "Sakhir, Bahrain",
    length: "5.412 km",
    lapRecord: "1:31.447",
    turns: 15,
    difficulty: "Medium",
    image: "🇧🇭",
    characteristics: ["Desert Track", "DRS Zones", "Good Overtaking"]
  },
  {
    id: "canada",
    name: "Circuit Gilles Villeneuve",
    location: "Montreal, Canada",
    length: "4.361 km",
    lapRecord: "1:13.078",
    turns: 14,
    difficulty: "Medium",
    image: "🇨🇦",
    characteristics: ["Semi-street", "Wall of Champions", "Long Straights"]
  },
  {
    id: "austria",
    name: "Red Bull Ring",
    location: "Spielberg, Austria",
    length: "4.318 km",
    lapRecord: "1:05.619",
    turns: 10,
    difficulty: "Medium",
    image: "🇦🇹",
    characteristics: ["Short Track", "Alpine Setting", "Steep Elevation"]
  },
  {
    id: "mexico",
    name: "Autódromo Hermanos Rodríguez",
    location: "Mexico City, Mexico",
    length: "4.304 km",
    lapRecord: "1:17.774",
    turns: 17,
    difficulty: "Medium",
    image: "🇲🇽",
    characteristics: ["High Altitude", "Reduced Downforce", "Stadium Section"]
  },
  {
    id: "australia",
    name: "Albert Park Circuit",
    location: "Melbourne, Australia",
    length: "5.278 km",
    lapRecord: "1:20.260",
    turns: 14,
    difficulty: "Medium",
    image: "🇦🇺",
    characteristics: ["Semi-street", "Lake Views", "Season Opener"]
  },
  {
    id: "netherlands",
    name: "Circuit Zandvoort",
    location: "Zandvoort, Netherlands",
    length: "4.259 km",
    lapRecord: "1:11.097",
    turns: 14,
    difficulty: "High",
    image: "🇳🇱",
    characteristics: ["Banked Corners", "Coastal Track", "Narrow Circuit"]
  },
  {
    id: "miami",
    name: "Miami International Autodrome",
    location: "Miami, Florida",
    length: "5.410 km",
    lapRecord: "1:31.361",
    turns: 19,
    difficulty: "Medium",
    image: "🇺🇸",
    characteristics: ["Street Circuit", "Stadium Complex", "Modern Layout"]
  },
  {
    id: "imola",
    name: "Autodromo Enzo e Dino Ferrari",
    location: "Imola, Italy",
    length: "4.909 km",
    lapRecord: "1:15.484",
    turns: 19,
    difficulty: "High",
    image: "🏛️",
    characteristics: ["Historic Track", "Challenging Layout", "Tamburello Corner"]
  }
];

interface TrackSelectorProps {
  selectedTrack: any;
  onTrackSelect: (track: any) => void;
}

const TrackSelector = ({ selectedTrack, onTrackSelect }: TrackSelectorProps) => {
  const handleTrackSelect = (track: any) => {
    onTrackSelect(track);
    toast(`Selected ${track.name}! Ready to race!`, {
      description: `Track length: ${track.length} • Lap record: ${track.lapRecord}`
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Extreme": return "text-racing-red";
      case "High": return "text-yellow-500";
      case "Medium": return "text-racing-green";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Select Your Circuit</h2>
        <p className="text-muted-foreground">Choose from legendary Formula 1 tracks around the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {F1_TRACKS.map((track) => (
          <Card 
            key={track.id} 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-racing-red/20 ${
              selectedTrack?.id === track.id ? 'ring-2 ring-racing-red neon-glow' : ''
            }`}
            onClick={() => handleTrackSelect(track)}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{track.image}</div>
              <CardTitle className="text-lg">{track.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                {track.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-racing-green" />
                  <span>{track.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-racing-green" />
                  <span>{track.lapRecord}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Turns: {track.turns}</span>
                <span className={`font-semibold ${getDifficultyColor(track.difficulty)}`}>
                  {track.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {track.characteristics.map((char, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-secondary text-xs rounded-full"
                  >
                    {char}
                  </span>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  selectedTrack?.id === track.id 
                    ? 'bg-racing-red hover:bg-racing-red/90' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrackSelect(track);
                }}
              >
                {selectedTrack?.id === track.id ? 'Selected' : 'Select Track'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrackSelector;
