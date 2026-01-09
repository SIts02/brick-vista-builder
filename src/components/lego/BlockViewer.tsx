import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { LegoBlock3D } from './LegoBlock3D';
import { LegoBlock } from '@/data/legoBlocks';
import { Suspense } from 'react';

interface BlockViewerProps {
  block: LegoBlock;
  color: string;
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#ccc" />
  </mesh>
);

export const BlockViewer = ({ block, color }: BlockViewerProps) => {
  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        shadows
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ffd9b3" />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* Controls */}
          <PresentationControls
            global
            rotation={[0.1, 0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <LegoBlock3D
              studsX={block.dimensions.studsX}
              studsZ={block.dimensions.studsZ}
              height={block.dimensions.height}
              color={color}
              blockType={block.id}
            />
          </PresentationControls>
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            makeDefault
          />
          
          {/* Ground shadow */}
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
