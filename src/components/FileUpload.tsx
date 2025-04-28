
import React, { useCallback } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      
      if (fileExtension !== "glb") {
        toast.error("Please select a valid GLB file");
        return;
      }

      onFileSelect(file);
      toast.success(`Loaded: ${file.name}`);
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (!file) return;

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      
      if (fileExtension !== "glb") {
        toast.error("Please select a valid GLB file");
        return;
      }

      onFileSelect(file);
      toast.success(`Loaded: ${file.name}`);
    },
    [onFileSelect]
  );

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted/20 p-6 transition-all hover:bg-muted/30"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium">Upload your 3D model</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop your GLB file, or click to browse
        </p>
      </div>

      <label htmlFor="file-upload">
        <div className="cursor-pointer">
          <Button variant="outline" size="sm">
            Select GLB File
          </Button>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".glb"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
