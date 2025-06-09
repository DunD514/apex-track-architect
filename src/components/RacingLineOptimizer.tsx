
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
  Settings
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
      optimizedTime: optimizedTime.toFixed(3),
      improvementPercentage: (Math.random() * 5 + 2).toFixed(1),
      sectors: [
        { 
          name: "Sector 1", 
          time: (optimizedTime * 0.35).toFixed(3),
          improvement: (Math.random() * 0.5 + 0.1).toFixed(3)
        },
        { 
          name: "Sector 2", 
          time: (optimizedTime * 0.40).toFixed(3),
          improvement: (Math.random() * 0.5 + 0.1).toFixed(3)
        },
        { 
          name: "Sector 3", 
          time: (optimizedTime * 0.25).toFixed(3),
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
      description: `Optimal lap time: ${lapResults.optimizedTime}s`
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
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ready to Optimize</h3>
            <p className="text-muted-foreground mb-4">
              Select a track and car to begin racing line optimization
            </p>
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span>Track: {track ? track.name : 'Not selected'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Car: {car ? car.name : 'Not selected'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Racing Line Optimizer</h2>
        <p className="text-muted-foreground">AI-powered lap time optimization and telemetry analysis</p>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Current Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Selected Track</h4>
              {track ? (
                <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                  <div className="text-2xl">{track.image || '🏁'}</div>
                  <div>
                    <div className="font-medium">{track.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {track.location || track.type === 'custom' ? 'Custom Track' : 'Unknown'}
                    </div>
                    {track.length && (
                      <Badge variant="outline" className="mt-1">
                        {track.length}
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-lg text-muted-foreground">
                  No track selected
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Selected Car</h4>
              {car ? (
                <div className="space-y-3 p-3 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{car.name}</div>
                      <div className="text-sm text-muted-foreground">{car.team}</div>
                    </div>
                    <Badge className={car.category === 'Current' ? 'bg-racing-green' : 'bg-muted'}>
                      {car.category}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Top Speed: {car.topSpeed} km/h</div>
                    <div>0-100: {car.acceleration}s</div>
                    <div>Handling: {car.handling}/100</div>
                    <div>Efficiency: {car.efficiency}/100</div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-lg text-muted-foreground">
                  No car selected
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isOptimizing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Optimization Progress</span>
                <span>{optimizationProgress.toFixed(0)}%</span>
              </div>
              <Progress value={optimizationProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={optimizeRacingLine}
              disabled={isOptimizing || !track || !car}
              className="flex items-center gap-2 bg-racing-green hover:bg-racing-green/90"
            >
              <Play className="h-4 w-4" />
              {isOptimizing ? 'Optimizing...' : 'Optimize Racing Line'}
            </Button>
            
            <Button
              variant="outline"
              onClick={resetOptimization}
              disabled={isOptimizing}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lap Time Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Optimized Lap Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-racing-green mb-2">
                  {results.optimizedTime}s
                </div>
                <Badge className="bg-racing-green text-white">
                  {results.improvementPercentage}% improvement
                </Badge>
              </div>

              <div className="space-y-3">
                {results.sectors.map((sector: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <span className="font-medium">{sector.name}</span>
                    <div className="text-right">
                      <div className="font-bold">{sector.time}s</div>
                      <div className="text-sm text-racing-green">
                        -{sector.improvement}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">{results.maxSpeed.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">Max Speed (km/h)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{results.avgSpeed}</div>
                  <div className="text-sm text-muted-foreground">Avg Speed (km/h)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Telemetry Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span>Lateral G-Force</span>
                  <span className="font-bold">{results.gForces.lateral}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <span>Longitudinal G-Force</span>
                  <span className="font-bold">{results.gForces.longitudinal}g</span>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-semibold">Racing Line Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Late apex strategy recommended for corners 3-7</li>
                    <li>• Trail braking zones identified at turns 2, 9, 14</li>
                    <li>• DRS zones optimized for maximum straight-line speed</li>
                    <li>• Tire degradation model applied for race strategy</li>
                  </ul>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast("Telemetry exported!", {
                    description: "Racing data saved for analysis"
                  });
                }}
              >
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
