
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Pencil, 
  Square, 
  RotateCcw, 
  Save, 
  Play,
  MousePointer,
  Move3D
} from "lucide-react";
import { toast } from "sonner";

interface TrackDesignerProps {
  customTrack: any;
  onTrackChange: (track: any) => void;
}

const TrackDesigner = ({ customTrack, onTrackChange }: TrackDesignerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'draw' | 'erase' | 'select'>('draw');
  const [trackWidth, setTrackWidth] = useState([20]);
  const [trackName, setTrackName] = useState('');
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
    
    if (tool === 'draw') {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#10b981'; // racing-green
        ctx.lineWidth = trackWidth[0];
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (tool === 'draw') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, trackWidth[0] / 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // Draw grid
      drawGrid(ctx);
    }
    toast("Canvas cleared! Start designing your track.");
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
  };

  const saveTrack = () => {
    if (!canvasRef.current || !trackName.trim()) {
      toast("Please enter a track name before saving.");
      return;
    }
    
    const canvas = canvasRef.current;
    const trackData = {
      id: `custom-${Date.now()}`,
      name: trackName,
      type: 'custom',
      imageData: canvas.toDataURL(),
      width: trackWidth[0],
      created: new Date().toISOString()
    };
    
    onTrackChange(trackData);
    toast(`Track "${trackName}" saved successfully!`, {
      description: "Your custom track is ready for racing line optimization."
    });
  };

  const loadPresetShape = (shape: 'oval' | 'figure8' | 'monaco') => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = trackWidth[0];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    switch (shape) {
      case 'oval':
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 200, 120, 0, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'figure8':
        ctx.beginPath();
        ctx.ellipse(centerX - 80, centerY, 80, 60, 0, 0, 2 * Math.PI);
        ctx.ellipse(centerX + 80, centerY, 80, 60, 0, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'monaco':
        // Simple Monaco-inspired layout
        ctx.beginPath();
        ctx.moveTo(centerX - 150, centerY - 80);
        ctx.lineTo(centerX + 150, centerY - 80);
        ctx.lineTo(centerX + 150, centerY);
        ctx.lineTo(centerX + 100, centerY + 50);
        ctx.lineTo(centerX - 100, centerY + 50);
        ctx.lineTo(centerX - 150, centerY);
        ctx.closePath();
        ctx.stroke();
        break;
    }
    
    toast(`${shape.charAt(0).toUpperCase() + shape.slice(1)} template loaded!`);
  };

  // Initialize canvas with grid
  const initCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      drawGrid(ctx);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Track Designer</h2>
        <p className="text-muted-foreground">Create your own custom racing circuit</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Design Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Track Name */}
            <div className="space-y-2">
              <Label htmlFor="trackName">Track Name</Label>
              <Input
                id="trackName"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                placeholder="My Custom Track"
              />
            </div>

            {/* Tools */}
            <div className="space-y-2">
              <Label>Drawing Tools</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={tool === 'draw' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('draw')}
                  className="flex items-center gap-1"
                >
                  <Pencil className="h-3 w-3" />
                  Draw
                </Button>
                <Button
                  variant={tool === 'erase' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('erase')}
                  className="flex items-center gap-1"
                >
                  <Square className="h-3 w-3" />
                  Erase
                </Button>
                <Button
                  variant={tool === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTool('select')}
                  className="flex items-center gap-1"
                >
                  <MousePointer className="h-3 w-3" />
                  Select
                </Button>
              </div>
            </div>

            {/* Track Width */}
            <div className="space-y-2">
              <Label>Track Width: {trackWidth[0]}px</Label>
              <Slider
                value={trackWidth}
                onValueChange={setTrackWidth}
                max={50}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            {/* Preset Shapes */}
            <div className="space-y-2">
              <Label>Quick Templates</Label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadPresetShape('oval')}
                  className="w-full"
                >
                  Oval Track
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadPresetShape('figure8')}
                  className="w-full"
                >
                  Figure 8
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadPresetShape('monaco')}
                  className="w-full"
                >
                  Street Circuit
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={clearCanvas}
                className="w-full flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear Canvas
              </Button>
              <Button
                onClick={saveTrack}
                className="w-full flex items-center gap-2 bg-racing-green hover:bg-racing-green/90"
              >
                <Save className="h-4 w-4" />
                Save Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Move3D className="h-5 w-5" />
                Track Canvas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-4 bg-card">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full border rounded-lg bg-background cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onLoad={initCanvas}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackDesigner;
