import React, { useState, useCallback, useRef, useEffect } from "react";
import ModelViewer from "@/components/ModelViewer";
import FileUpload from "@/components/FileUpload";
import ModelInfo from "@/components/ModelInfo";
import Header from "@/components/Header";
import ViewerControls from "@/components/ViewerControls";
import { Card } from "@/components/ui/card";

const DEFAULT_MODEL_URL = "/AP_Clock.glb";

const Index = () => {
  const [modelUrl, setModelUrl] = useState<string | null>(DEFAULT_MODEL_URL);
  const [fileName, setFileName] = useState<string | null>("AP_Clock.glb");
  const [fileSize, setFileSize] = useState<string | null>("Default model");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(DEFAULT_MODEL_URL);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  const orbitControlsRef = useRef<any>(null);

  const handleFileSelect = useCallback((file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setModelUrl(fileUrl);
    setFileName(file.name);
    
    // Format file size
    const size = file.size;
    let formattedSize = "";
    if (size < 1024) {
      formattedSize = size + " bytes";
    } else if (size < 1024 * 1024) {
      formattedSize = (size / 1024).toFixed(2) + " KB";
    } else {
      formattedSize = (size / (1024 * 1024)).toFixed(2) + " MB";
    }
    
    setFileSize(formattedSize);
    setDownloadUrl(fileUrl);
  }, []);

  const handleClearModel = useCallback(() => {
    if (modelUrl) {
      URL.revokeObjectURL(modelUrl);
    }
    setModelUrl(null);
    setFileName(null);
    setFileSize(null);
    setDownloadUrl(null);
    setAutoRotate(false);
    setWireframe(false);
  }, [modelUrl]);

  useEffect(() => {
    // Cleanup object URLs on unmount
    return () => {
      if (modelUrl) {
        URL.revokeObjectURL(modelUrl);
      }
    };
  }, [modelUrl]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header onClearModel={handleClearModel} hasModel={!!modelUrl} />
      
      <main className="container mx-auto flex flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 lg:grid-cols-4">
          <Card className="col-span-1 lg:col-span-3 overflow-hidden relative">
            {modelUrl ? (
              <>
                <ModelViewer modelUrl={modelUrl} />
                <div className="absolute bottom-4 right-4">
                  <ViewerControls 
                    onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
                    onResetCamera={() => {
                      if (orbitControlsRef.current) {
                        orbitControlsRef.current.reset();
                      }
                    }}
                    onToggleWireframe={() => setWireframe(!wireframe)}
                    isAutoRotating={autoRotate}
                    isWireframe={wireframe}
                  />
                </div>
              </>
            ) : (
              <FileUpload onFileSelect={handleFileSelect} />
            )}
          </Card>
          
          <div className="col-span-1 flex flex-col gap-4">
            <ModelInfo 
              fileName={fileName}
              fileSize={fileSize}
              downloadUrl={downloadUrl}
            />
            
            <Card className="flex flex-1 flex-col p-4">
              <h3 className="mb-2 font-medium">Instructions</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>��� <strong>Rotate:</strong> Click and drag</li>
                <li>• <strong>Pan:</strong> Right-click and drag</li>
                <li>• <strong>Zoom:</strong> Scroll wheel</li>
                <li>• <strong>Reset:</strong> Double-click</li>
              </ul>
              
              <div className="mt-auto">
                <p className="text-xs text-muted-foreground mt-4">
                  Supported file format: GLB
                </p>
                <p className="text-xs text-muted-foreground">
                  For best performance, use optimized models under 10MB
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
