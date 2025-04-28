
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Environment,
  Stage,
  Html,
  useProgress,
} from "@react-three/drei";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    return () => {
      // Clean up to avoid memory leaks
      useGLTF.preload(url);
    };
  }, [url]);

  return <primitive object={scene} />;
}

function LoadingScreen() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-sm font-medium">
          Loading... {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

interface ModelViewerProps {
  modelUrl: string | null;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!modelUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center opacity-60">
          <p className="mb-2 text-lg font-medium">No model selected</p>
          <p className="text-sm">Upload a GLB file to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas-container h-full w-full rounded-md bg-viewer-bg">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={["#15181f"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <Suspense fallback={<LoadingScreen />}>
          <Stage
            environment="warehouse"
            preset="rembrandt"
            intensity={0.6}
            shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
          >
            <Model url={modelUrl} />
          </Stage>
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI * 0.9}
        />
      </Canvas>
    </div>
  );
}
