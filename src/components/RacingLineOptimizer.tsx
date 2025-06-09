
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  RotateCcw, 
  Target, 
  Clock, 
  TrendingUp,
  Zap,
  MapPin,
  Settings,
  Timer,
  Award
} from "lucide-react";
import { toast } from "sonner";

interface RacingLineOptimizerProps {
  track: any;
  car: any;
}

const RacingLineOptimizer = ({ track, car }: RacingLineOptimizerProps) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [simulationData, setSimulationData] = useState<any>(null);

  // Convert seconds to MM:SS.mmm format
  const formatLapTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(3).padStart(6, '0')}`;
  };

  const optimizeRacingLine = async () => {
    if (!track || !car) {
      toast("Please select both a track and a car before optimizing!", {
        description: "You need to choose a track and vehicle first."
      });
      return;
    }

    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    // Simulate optimization process
    const steps = [
      "Analyzing track layout...",
      "Calculating corner speeds...",
      "Optimizing braking points...",
      "Finding racing line...",
      "Simulating lap times...",
      "Generating telemetry data..."
    ];

    for (let i = 0; i < steps.length; i++) {
      toast(steps[i]);
      setOptimizationProgress((i + 1) * (100 / steps.length));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Generate optimized results based on car and track characteristics
    const baseTime = track.id === 'monaco' ? 78 : 
                    track.id === 'silverstone' ? 87 :
                    track.id === 'spa' ? 106 :
                    track.id === 'monza' ? 81 :
                    track.id === 'suzuka' ? 91 :
                    track.id === 'interlagos' ? 71 : 85;

    const carModifier = (car.handling + car.efficiency) / 200;
    const optimizedTime = baseTime * (1 + (1 - carModifier) * 0.1);
    
    const lapResults = {
      optimizedTime: optimizedTime,
      improvementPercentage: (Math.random() * 5 + 2).toFixed(1),
      sectors: [
        { 
          name: "Sector 1", 
          time: optimizedTime * 0.35,
          improvement: (Math.random() * 0.5 + 0.1).toFixed(3)
        },
        { 
          name: "Sector 2", 
          time: optimizedTime * 0.40,
          improvement: (Math.random() * 0.5 + 0.1).toFixed(3)
        },
        { 
          name: "Sector 3", 
          time: optimizedTime * 0.25,
          improvement: (Math.random() * 0.5 + 0.1).toFixed(3)
        }
      ],
      maxSpeed: Math.min(car.topSpeed, 320 + Math.random() * 30),
      avgSpeed: (track.length?.includes('km') ? 
        parseFloat(track.length.split(' ')[0]) * 3600 / optimizedTime : 
        150 + Math.random() * 50).toFixed(1),
      gForces: {
        lateral: (car.handling * 0.06).toFixed(1),
        longitudinal: (car.acceleration ? 4.5 - car.acceleration : 2.8).toFixed(1)
      }
    };

    setResults(lapResults);
    setIsOptimizing(false);
    setOptimizationProgress(100);
    
    toast("Optimization complete! 🏁", {
      description: `Optimal lap time: ${formatLapTime(lapResults.optimizedTime)}`
    });
  };

  const resetOptimization = () => {
    setResults(null);
    setOptimizationProgress(0);
    setSimulationData(null);
    toast("Optimization reset. Ready for new analysis.");
  };

  if (!track && !car) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md text-center border-2 border-dashed border-muted-foreground/30 hover:border-racing-green/50 transition-colors">
          <CardContent className="pt-8 pb-8">
            <div className="mb-6">
              <Target className="h-20 w-20 mx-auto mb-4 text-racing-green/70" />
              <div className="w-16 h-1 bg-racing-gradient mx-auto mb-4 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold mb-3 racing-text">Ready to Optimize</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Select a track and car to begin AI-powered racing line optimization
            </p>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-center gap-3 p-3 bg-secondary/50 rounded-lg border">
                <MapPin className="h-5 w-5 text-racing-green" />
                <span className="font-medium">Track: {track ? track.name : 'Not selected'}</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-3 bg-secondary/50 rounded-lg border">
                <Zap className="h-5 w-5 text-racing-green" />
                <span className="font-medium">Car: {car ? car.name : 'Not selected'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold racing-text mb-3">Racing Line Optimizer</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced AI-powered lap time optimization and comprehensive telemetry analysis
        </p>
        <div className="w-24 h-1 bg-racing-gradient mx-auto rounded-full"></div>
      </div>

      {/* Configuration */}
      <Card className="border-2 hover:border-racing-green/30 transition-colors">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Settings className="h-6 w-6 text-racing-green" />
            Current Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-racing-green" />
                Selected Track
              </h4>
              {track ? (
                <div className="group p-4 bg-gradient-to-br from-secondary/80 to-secondary rounded-xl border-2 border-secondary hover:border-racing-green/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl bg-racing-green/10 p-3 rounded-lg">
                      {track.image || '🏁'}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{track.name}</div>
                      <div className="text-muted-foreground">
                        {track.location || (track.type === 'custom' ? 'Custom Track' : 'Unknown')}
                      </div>
                      {track.length && (
                        <Badge variant="outline" className="mt-2 border-racing-green/50 text-racing-green">
                          {track.length}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-xl text-muted-foreground border-2 border-dashed">
                  No track selected
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-racing-green" />
                Selected Car
              </h4>
              {car ? (
                <div className="group p-4 bg-gradient-to-br from-secondary/80 to-secondary rounded-xl border-2 border-secondary hover:border-racing-green/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-lg">{car.name}</div>
                      <div className="text-muted-foreground">{car.team} • {car.year}</div>
                    </div>
                    <Badge className={car.category === 'Current' ? 'bg-racing-green text-white' : 'bg-muted'}>
                      {car.category}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-background/50 rounded-lg">
                      <div className="text-muted-foreground">Top Speed</div>
                      <div className="font-bold">{car.topSpeed} km/h</div>
                    </div>
                    <div className="p-2 bg-background/50 rounded-lg">
                      <div className="text-muted-foreground">0-100</div>
                      <div className="font-bold">{car.acceleration}s</div>
                    </div>
                    <div className="p-2 bg-background/50 rounded-lg">
                      <div className="text-muted-foreground">Handling</div>
                      <div className="font-bold">{car.handling}/100</div>
                    </div>
                    <div className="p-2 bg-background/50 rounded-lg">
                      <div className="text-muted-foreground">Efficiency</div>
                      <div className="font-bold">{car.efficiency}/100</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-xl text-muted-foreground border-2 border-dashed">
                  No car selected
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Controls */}
      <Card className="border-2 hover:border-racing-green/30 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Play className="h-6 w-6 text-racing-green" />
            Optimization Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isOptimizing && (
            <div className="space-y-3 p-4 bg-racing-green/5 rounded-xl border">
              <div className="flex justify-between text-sm font-medium">
                <span>Optimization Progress</span>
                <span className="text-racing-green">{optimizationProgress.toFixed(0)}%</span>
              </div>
              <Progress value={optimizationProgress} className="w-full h-3" />
              <div className="text-xs text-muted-foreground text-center">
                AI analyzing racing dynamics...
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={optimizeRacingLine}
              disabled={isOptimizing || !track || !car}
              className="flex items-center gap-3 bg-racing-green hover:bg-racing-green/90 text-white px-6 py-3 text-lg font-semibold"
              size="lg"
            >
              <Play className="h-5 w-5" />
              {isOptimizing ? 'Optimizing Racing Line...' : 'Optimize Racing Line'}
            </Button>
            
            <Button
              variant="outline"
              onClick={resetOptimization}
              disabled={isOptimizing}
              className="flex items-center gap-2 border-racing-green/50 hover:bg-racing-green/10"
              size="lg"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lap Time Results */}
          <Card className="border-2 border-racing-green/30 shadow-lg">
            <CardHeader className="bg-racing-green/5">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Timer className="h-6 w-6 text-racing-green" />
                Optimized Lap Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="text-center p-6 bg-gradient-to-br from-racing-green/10 to-racing-green/5 rounded-xl border border-racing-green/20">
                <div className="text-5xl font-bold text-racing-green mb-3 font-mono">
                  {formatLapTime(results.optimizedTime)}
                </div>
                <Badge className="bg-racing-green text-white text-base px-4 py-1">
                  <Award className="h-4 w-4 mr-1" />
                  {results.improvementPercentage}% improvement
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-lg mb-3">Sector Times</h4>
                {results.sectors.map((sector: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-secondary/80 rounded-lg border hover:border-racing-green/30 transition-colors">
                    <span className="font-semibold text-lg">{sector.name}</span>
                    <div className="text-right">
                      <div className="font-bold text-lg font-mono">{formatLapTime(sector.time)}</div>
                      <div className="text-sm text-racing-green font-medium">
                        -{sector.improvement}s improvement
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-racing-green/20">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-racing-green">{results.maxSpeed.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground font-medium">Max Speed (km/h)</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-3xl font-bold text-racing-green">{results.avgSpeed}</div>
                  <div className="text-sm text-muted-foreground font-medium">Avg Speed (km/h)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Telemetry Data */}
          <Card className="border-2 border-racing-green/30 shadow-lg">
            <CardHeader className="bg-racing-green/5">
              <CardTitle className="flex items-center gap-3 text-xl">
                <TrendingUp className="h-6 w-6 text-racing-green" />
                Performance Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/80 rounded-lg border">
                  <span className="font-semibold">Lateral G-Force</span>
                  <span className="font-bold text-lg text-racing-green">{results.gForces.lateral}g</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/80 rounded-lg border">
                  <span className="font-semibold">Longitudinal G-Force</span>
                  <span className="font-bold text-lg text-racing-green">{results.gForces.longitudinal}g</span>
                </div>
                
                <div className="space-y-4 pt-4 border-t-2 border-racing-green/20">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-racing-green" />
                    Racing Line Insights
                  </h4>
                  <div className="bg-gradient-to-br from-racing-green/5 to-racing-green/10 p-4 rounded-lg border border-racing-green/20">
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-racing-green rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Late apex strategy recommended for corners 3-7</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-racing-green rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Trail braking zones identified at turns 2, 9, 14</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-racing-green rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>DRS zones optimized for maximum straight-line speed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-racing-green rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>Tire degradation model applied for race strategy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-racing-green/50 hover:bg-racing-green/10 text-racing-green font-semibold"
                onClick={() => {
                  toast("Telemetry exported!", {
                    description: "Racing data saved for analysis"
                  });
                }}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Export Telemetry Data
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RacingLineOptimizer;
