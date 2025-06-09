
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface CustomCarDesignerProps {
  onSave: (car: any) => void;
}

const CustomCarDesigner = ({ onSave }: CustomCarDesignerProps) => {
  const [carSpecs, setCarSpecs] = useState({
    name: "",
    team: "",
    year: new Date().getFullYear(),
    engine: "",
    topSpeed: [320],
    acceleration: [3.0],
    handling: [75],
    weight: [798],
    downforce: [75],
    efficiency: [75],
    description: ""
  });

  const handleSave = () => {
    if (!carSpecs.name || !carSpecs.team || !carSpecs.engine) {
      toast.error("Please fill in all required fields", {
        description: "Name, Team, and Engine are required"
      });
      return;
    }

    const customCar = {
      name: carSpecs.name,
      team: carSpecs.team,
      year: carSpecs.year,
      engine: carSpecs.engine,
      topSpeed: carSpecs.topSpeed[0],
      acceleration: carSpecs.acceleration[0],
      handling: carSpecs.handling[0],
      weight: carSpecs.weight[0],
      downforce: carSpecs.downforce[0],
      efficiency: carSpecs.efficiency[0],
      description: carSpecs.description || `Custom ${carSpecs.name} designed for optimal performance`
    };

    onSave(customCar);
    handleReset();
  };

  const handleReset = () => {
    setCarSpecs({
      name: "",
      team: "",
      year: new Date().getFullYear(),
      engine: "",
      topSpeed: [320],
      acceleration: [3.0],
      handling: [75],
      weight: [798],
      downforce: [75],
      efficiency: [75],
      description: ""
    });
  };

  const updateSpec = (key: string, value: any) => {
    setCarSpecs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-racing-green" />
            Custom Car Designer
          </CardTitle>
          <CardDescription>
            Design your own F1 car with custom specifications and performance characteristics
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carName">Car Name *</Label>
              <Input
                id="carName"
                placeholder="e.g., Lightning X1"
                value={carSpecs.name}
                onChange={(e) => updateSpec('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name *</Label>
              <Input
                id="teamName"
                placeholder="e.g., Custom Racing Team"
                value={carSpecs.team}
                onChange={(e) => updateSpec('team', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                min="1950"
                max="2050"
                value={carSpecs.year}
                onChange={(e) => updateSpec('year', parseInt(e.target.value) || new Date().getFullYear())}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="engine">Engine *</Label>
              <Select value={carSpecs.engine} onValueChange={(value) => updateSpec('engine', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select engine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mercedes">Mercedes</SelectItem>
                  <SelectItem value="Ferrari">Ferrari</SelectItem>
                  <SelectItem value="Honda RBPT">Honda RBPT</SelectItem>
                  <SelectItem value="Renault">Renault</SelectItem>
                  <SelectItem value="Ford Cosworth">Ford Cosworth</SelectItem>
                  <SelectItem value="Electric Hybrid">Electric Hybrid</SelectItem>
                  <SelectItem value="Quantum Fusion">Quantum Fusion</SelectItem>
                  <SelectItem value="Custom V6 Turbo">Custom V6 Turbo</SelectItem>
                  <SelectItem value="Custom V8">Custom V8</SelectItem>
                  <SelectItem value="Custom V10">Custom V10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Specifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Performance Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Top Speed: {carSpecs.topSpeed[0]} km/h</Label>
                <Slider
                  value={carSpecs.topSpeed}
                  onValueChange={(value) => updateSpec('topSpeed', value)}
                  max={450}
                  min={250}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>250 km/h</span>
                  <span>450 km/h</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>0-100 km/h Acceleration: {carSpecs.acceleration[0].toFixed(1)}s</Label>
                <Slider
                  value={carSpecs.acceleration}
                  onValueChange={(value) => updateSpec('acceleration', value)}
                  max={5.0}
                  min={1.0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1.0s</span>
                  <span>5.0s</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Handling: {carSpecs.handling[0]}/100</Label>
                <Slider
                  value={carSpecs.handling}
                  onValueChange={(value) => updateSpec('handling', value)}
                  max={100}
                  min={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30</span>
                  <span>100</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Weight: {carSpecs.weight[0]} kg</Label>
                <Slider
                  value={carSpecs.weight}
                  onValueChange={(value) => updateSpec('weight', value)}
                  max={900}
                  min={500}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>500 kg</span>
                  <span>900 kg</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Downforce: {carSpecs.downforce[0]}/100</Label>
                <Slider
                  value={carSpecs.downforce}
                  onValueChange={(value) => updateSpec('downforce', value)}
                  max={100}
                  min={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30</span>
                  <span>100</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Efficiency: {carSpecs.efficiency[0]}/100</Label>
                <Slider
                  value={carSpecs.efficiency}
                  onValueChange={(value) => updateSpec('efficiency', value)}
                  max={100}
                  min={30}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your custom car's unique features and characteristics..."
              value={carSpecs.description}
              onChange={(e) => updateSpec('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Performance Preview */}
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Performance Preview</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Top Speed:</span>
                <span className="ml-2 font-medium">{carSpecs.topSpeed[0]} km/h</span>
              </div>
              <div>
                <span className="text-muted-foreground">0-100:</span>
                <span className="ml-2 font-medium">{carSpecs.acceleration[0].toFixed(1)}s</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <span className="ml-2 font-medium">{carSpecs.weight[0]} kg</span>
              </div>
              <div>
                <span className="text-muted-foreground">Handling:</span>
                <span className="ml-2 font-medium">{carSpecs.handling[0]}/100</span>
              </div>
              <div>
                <span className="text-muted-foreground">Downforce:</span>
                <span className="ml-2 font-medium">{carSpecs.downforce[0]}/100</span>
              </div>
              <div>
                <span className="text-muted-foreground">Efficiency:</span>
                <span className="ml-2 font-medium">{carSpecs.efficiency[0]}/100</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-racing-green hover:bg-racing-green/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Custom Car
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomCarDesigner;
