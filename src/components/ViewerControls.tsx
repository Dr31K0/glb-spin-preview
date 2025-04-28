
import React from "react";
import { Layers, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewerControlsProps {
  onToggleAutoRotate: () => void;
  onResetCamera: () => void;
  onToggleWireframe: () => void;
  isAutoRotating: boolean;
  isWireframe: boolean;
  className?: string;
}

export default function ViewerControls({
  onToggleAutoRotate,
  onResetCamera,
  onToggleWireframe,
  isAutoRotating,
  isWireframe,
  className
}: ViewerControlsProps) {
  return (
    <div className={cn("bg-card/70 backdrop-blur-sm rounded-md border flex gap-1 p-1", className)}>
      <Button
        variant={isAutoRotating ? "default" : "outline"}
        size="icon"
        className="h-8 w-8"
        onClick={onToggleAutoRotate}
        title="Toggle Auto Rotate"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onResetCamera}
        title="Reset Camera"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant={isWireframe ? "default" : "outline"}
        size="icon"
        className="h-8 w-8"
        onClick={onToggleWireframe}
        title="Toggle Wireframe"
      >
        <Layers className="h-4 w-4" />
      </Button>
    </div>
  );
}
