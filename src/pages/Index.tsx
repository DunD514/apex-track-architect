
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackSelector from "@/components/TrackSelector";
import TrackDesigner from "@/components/TrackDesigner";
import CarSelector from "@/components/CarSelector";
import RacingLineOptimizer from "@/components/RacingLineOptimizer";
import { Flag, Car, Zap, Route } from "lucide-react";

const Index = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [customTrack, setCustomTrack] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="racing-gradient p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <h1 className="text-5xl font-bold mb-2 relative z-10">
          <span className="racing-text">F1 Racing Simulator</span>
        </h1>
        <p className="text-xl text-muted-foreground relative z-10">
          Design tracks, optimize racing lines, and dominate the circuit
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-card">
            <TabsTrigger value="tracks" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Tracks
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="optimize" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Optimize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="space-y-6">
            <TrackSelector 
              selectedTrack={selectedTrack}
              onTrackSelect={setSelectedTrack}
            />
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <TrackDesigner 
              customTrack={customTrack}
              onTrackChange={setCustomTrack}
            />
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <CarSelector 
              selectedCar={selectedCar}
              onCarSelect={setSelectedCar}
            />
          </TabsContent>

          <TabsContent value="optimize" className="space-y-6">
            <RacingLineOptimizer 
              track={selectedTrack || customTrack}
              car={selectedCar}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
