
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gauge, Zap, Weight, TrendingUp, Plus } from "lucide-react";
import { toast } from "sonner";
import CustomCarDesigner from "./CustomCarDesigner";

const F1_CARS = [
  {
    id: "red-bull-rb19",
    name: "Red Bull RB19",
    team: "Red Bull Racing",
    year: 2023,
    engine: "Honda RBPT",
    topSpeed: 350,
    acceleration: 2.6,
    handling: 95,
    weight: 798,
    downforce: 92,
    efficiency: 88,
    category: "Current",
    color: "bg-blue-600",
    description: "Championship-winning car with exceptional aerodynamics"
  },
  {
    id: "ferrari-sf-23",
    name: "Ferrari SF-23",
    team: "Scuderia Ferrari",
    year: 2023,
    engine: "Ferrari",
    topSpeed: 345,
    acceleration: 2.7,
    handling: 90,
    weight: 798,
    downforce: 88,
    efficiency: 85,
    category: "Current",
    color: "bg-red-600",
    description: "Italian engineering with powerful Ferrari engine"
  },
  {
    id: "mercedes-w14",
    name: "Mercedes W14",
    team: "Mercedes-AMG",
    year: 2023,
    engine: "Mercedes",
    topSpeed: 342,
    acceleration: 2.8,
    handling: 87,
    weight: 798,
    downforce: 85,
    efficiency: 90,
    category: "Current",
    color: "bg-gray-400",
    description: "Silver arrow with advanced hybrid technology"
  },
  {
    id: "mclaren-mcl60",
    name: "McLaren MCL60",
    team: "McLaren",
    year: 2023,
    engine: "Mercedes",
    topSpeed: 340,
    acceleration: 2.9,
    handling: 85,
    weight: 798,
    downforce: 82,
    efficiency: 87,
    category: "Current",
    color: "bg-orange-500",
    description: "Papaya orange with improved aerodynamic package"
  },
  {
    id: "aston-martin-amr23",
    name: "Aston Martin AMR23",
    team: "Aston Martin",
    year: 2023,
    engine: "Mercedes",
    topSpeed: 338,
    acceleration: 3.0,
    handling: 83,
    weight: 798,
    downforce: 80,
    efficiency: 86,
    category: "Current",
    color: "bg-green-600",
    description: "Green machine with consistent performance"
  },
  {
    id: "alpine-a523",
    name: "Alpine A523",
    team: "Alpine",
    year: 2023,
    engine: "Renault",
    topSpeed: 335,
    acceleration: 3.1,
    handling: 81,
    weight: 798,
    downforce: 78,
    efficiency: 84,
    category: "Current",
    color: "bg-blue-500",
    description: "French engineering with Renault power unit"
  },
  {
    id: "mclaren-mp4-4",
    name: "McLaren MP4/4",
    team: "McLaren",
    year: 1988,
    engine: "Honda",
    topSpeed: 320,
    acceleration: 3.2,
    handling: 85,
    weight: 500,
    downforce: 75,
    efficiency: 70,
    category: "Historic",
    color: "bg-orange-600",
    description: "Legendary car that won 15 out of 16 races in 1988"
  },
  {
    id: "williams-fw14b",
    name: "Williams FW14B",
    team: "Williams",
    year: 1992,
    engine: "Renault",
    topSpeed: 315,
    acceleration: 3.4,
    handling: 82,
    weight: 505,
    downforce: 78,
    efficiency: 68,
    category: "Historic",
    color: "bg-blue-800",
    description: "Advanced active suspension and traction control"
  },
  {
    id: "ferrari-f2004",
    name: "Ferrari F2004",
    team: "Scuderia Ferrari",
    year: 2004,
    engine: "Ferrari",
    topSpeed: 325,
    acceleration: 3.0,
    handling: 88,
    weight: 605,
    downforce: 85,
    efficiency: 75,
    category: "Historic",
    color: "bg-red-700",
    description: "Michael Schumacher's dominant championship car"
  },
  {
    id: "lotus-79",
    name: "Lotus 79",
    team: "Lotus",
    year: 1978,
    engine: "Ford Cosworth",
    topSpeed: 300,
    acceleration: 4.2,
    handling: 75,
    weight: 580,
    downforce: 60,
    efficiency: 55,
    category: "Historic",
    color: "bg-green-700",
    description: "Revolutionary ground effect aerodynamics"
  },
  {
    id: "concept-2030",
    name: "F1 Concept 2030",
    team: "Future Tech",
    year: 2030,
    engine: "Electric Hybrid",
    topSpeed: 380,
    acceleration: 1.8,
    handling: 98,
    weight: 650,
    downforce: 95,
    efficiency: 95,
    category: "Concept",
    color: "bg-purple-600",
    description: "Next-generation sustainable F1 technology"
  },
  {
    id: "hypercar-x1",
    name: "HyperCar X1",
    team: "Future Racing",
    year: 2035,
    engine: "Quantum Fusion",
    topSpeed: 420,
    acceleration: 1.2,
    handling: 100,
    weight: 550,
    downforce: 98,
    efficiency: 98,
    category: "Concept",
    color: "bg-cyan-500",
    description: "Theoretical maximum performance vehicle"
  }
];

interface CarSelectorProps {
  selectedCar: any;
  onCarSelect: (car: any) => void;
}

const CarSelector = ({ selectedCar, onCarSelect }: CarSelectorProps) => {
  const [customCars, setCustomCars] = useState<any[]>([]);

  const handleCarSelect = (car: any) => {
    onCarSelect(car);
    toast(`Selected ${car.name}!`, {
      description: `Top speed: ${car.topSpeed} km/h • 0-100: ${car.acceleration}s`
    });
  };

  const handleCustomCarSave = (customCar: any) => {
    const newCar = {
      ...customCar,
      id: `custom-${Date.now()}`,
      category: "Custom",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    };
    setCustomCars(prev => [...prev, newCar]);
    toast(`Custom car "${newCar.name}" saved!`, {
      description: "You can now select it from the custom cars section"
    });
  };

  const getStatColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "bg-racing-green";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-racing-red";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Current": return "bg-racing-green";
      case "Historic": return "bg-yellow-600";
      case "Concept": return "bg-purple-600";
      case "Custom": return "bg-pink-600";
      default: return "bg-muted";
    }
  };

  const renderCarCard = (car: any) => (
    <Card 
      key={car.id}
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-racing-red/20 ${
        selectedCar?.id === car.id ? 'ring-2 ring-racing-red neon-glow' : ''
      }`}
      onClick={() => handleCarSelect(car)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{car.name}</CardTitle>
            <CardDescription>{car.team} • {car.year}</CardDescription>
          </div>
          <Badge className={`${getCategoryColor(car.category)} text-white`}>
            {car.category}
          </Badge>
        </div>
        <div className={`w-full h-16 rounded-lg ${car.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-2 left-2 text-white font-bold text-sm">
            {car.engine}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{car.description}</p>
        
        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Gauge className="h-4 w-4 text-racing-green" />
              <span>Top Speed</span>
            </div>
            <div className="text-lg font-bold">{car.topSpeed} km/h</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-racing-green" />
              <span>0-100 km/h</span>
            </div>
            <div className="text-lg font-bold">{car.acceleration}s</div>
          </div>
        </div>

        {/* Stat Bars */}
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Handling</span>
              <span>{car.handling}/100</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getStatColor(car.handling, 100)}`}
                style={{ width: `${car.handling}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Downforce</span>
              <span>{car.downforce}/100</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getStatColor(car.downforce, 100)}`}
                style={{ width: `${car.downforce}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Efficiency</span>
              <span>{car.efficiency}/100</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getStatColor(car.efficiency, 100)}`}
                style={{ width: `${car.efficiency}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Weight className="h-4 w-4" />
          <span>Weight: {car.weight} kg</span>
        </div>

        <Button 
          className={`w-full ${
            selectedCar?.id === car.id 
              ? 'bg-racing-red hover:bg-racing-red/90' 
              : 'bg-primary hover:bg-primary/90'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleCarSelect(car);
          }}
        >
          {selectedCar?.id === car.id ? 'Selected' : 'Select Car'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Machine</h2>
        <p className="text-muted-foreground">Select from preset cars or design your own custom F1 machine</p>
      </div>

      <Tabs defaultValue="preset" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="preset">Preset Cars</TabsTrigger>
          <TabsTrigger value="custom">Custom Design</TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {F1_CARS.map(renderCarCard)}
            {customCars.map(renderCarCard)}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <CustomCarDesigner onSave={handleCustomCarSave} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarSelector;
