
import React from "react";
import { Cube, File, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ModelInfoProps {
  fileName: string | null;
  fileSize: string | null;
  downloadUrl: string | null;
}

export default function ModelInfo({ fileName, fileSize, downloadUrl }: ModelInfoProps) {
  if (!fileName || !fileSize || !downloadUrl) {
    return (
      <div className="rounded-md border bg-card p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Cube size={18} />
          <p className="text-sm">No model loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Cube size={20} className="text-primary" />
          <h3 className="font-medium">Model Information</h3>
        </div>
        
        <Separator />
        
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <File size={14} />
              <span>Filename:</span>
            </div>
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span>Size:</span>
            </div>
            <span className="text-sm font-medium">{fileSize}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 w-full"
          onClick={() => window.open(downloadUrl)}
        >
          <Download size={14} className="mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
}
