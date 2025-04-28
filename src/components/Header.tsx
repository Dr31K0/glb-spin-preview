
import React from "react";
import { Cube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  onClearModel: () => void;
  hasModel: boolean;
}

export default function Header({ onClearModel, hasModel }: HeaderProps) {
  return (
    <header className="container mx-auto flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Cube className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">GLB Viewer</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {hasModel && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearModel}
          >
            New Model
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open("https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0", "_blank")}
        >
          Sample Models
        </Button>
      </div>
    </header>
  );
}
