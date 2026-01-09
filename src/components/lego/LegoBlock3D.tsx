import { useRef, useState } from 'react';
import * as THREE from 'three';
import { LEGO_COLORS } from '@/data/legoBlocks';

interface LegoBlock3DProps {
  studsX: number;
  studsZ: number;
  height: number;
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
  blockType?: string;
}

const STUD_RADIUS = 0.24;
const STUD_HEIGHT = 0.17;
const UNIT_SIZE = 0.8;
const PLATE_HEIGHT = 0.32;

export const LegoBlock3D = ({
  studsX,
  studsZ,
  height,
  color,
  isSelected = false,
  onClick,
  blockType = 'brick',
}: LegoBlock3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const hexColor = LEGO_COLORS[color] || color;
  const blockHeight = height * PLATE_HEIGHT;
  const blockWidth = studsX * UNIT_SIZE;
  const blockDepth = studsZ * UNIT_SIZE;

  // Generate studs positions
  const studs = [];
  for (let x = 0; x < studsX; x++) {
    for (let z = 0; z < studsZ; z++) {
      studs.push({
        x: (x - (studsX - 1) / 2) * UNIT_SIZE,
        z: (z - (studsZ - 1) / 2) * UNIT_SIZE,
      });
    }
  }

  const renderSpecialShape = () => {
    if (blockType === 'round-1x1') {
      return (
        <mesh position={[0, blockHeight / 2, 0]}>
          <cylinderGeometry args={[UNIT_SIZE / 2 - 0.05, UNIT_SIZE / 2 - 0.05, blockHeight, 32]} />
          <meshStandardMaterial color={hexColor} />
        </mesh>
      );
    }
    
    if (blockType === 'cone-1x1') {
      return (
        <mesh position={[0, blockHeight / 2, 0]}>
          <coneGeometry args={[UNIT_SIZE / 2 - 0.05, blockHeight, 32]} />
          <meshStandardMaterial color={hexColor} />
        </mesh>
      );
    }

    if (blockType?.includes('slope-45')) {
      return (
        <group position={[0, blockHeight / 2, 0]}>
          <mesh>
            <boxGeometry args={[blockWidth - 0.02, blockHeight, blockDepth - 0.02]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
          <mesh position={[0, blockHeight / 2, -blockDepth / 4]} rotation={[Math.PI / 4, 0, 0]}>
            <boxGeometry args={[blockWidth - 0.02, blockHeight * 0.7, blockDepth / 2]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
        </group>
      );
    }

    if (blockType?.includes('slope-curved')) {
      return (
        <group position={[0, blockHeight / 2, 0]}>
          <mesh>
            <boxGeometry args={[blockWidth - 0.02, blockHeight * 0.6, blockDepth - 0.02]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
          <mesh position={[0, blockHeight * 0.3, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[blockWidth / 2 - 0.01, blockWidth / 2 - 0.01, blockDepth - 0.02, 32, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
        </group>
      );
    }

    if (blockType?.includes('arch')) {
      return (
        <group position={[0, blockHeight / 2, 0]}>
          <mesh position={[-blockWidth / 4, 0, 0]}>
            <boxGeometry args={[blockWidth / 2 - 0.1, blockHeight, blockDepth / 4]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
          <mesh position={[blockWidth / 4, 0, 0]}>
            <boxGeometry args={[blockWidth / 2 - 0.1, blockHeight, blockDepth / 4]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
          <mesh position={[0, blockHeight / 3, 0]}>
            <boxGeometry args={[blockWidth - 0.02, blockHeight / 3, blockDepth - 0.02]} />
            <meshStandardMaterial color={hexColor} />
          </mesh>
        </group>
      );
    }

    // Default brick/plate shape
    return (
      <mesh position={[0, blockHeight / 2, 0]}>
        <boxGeometry args={[blockWidth - 0.02, blockHeight, blockDepth - 0.02]} />
        <meshStandardMaterial color={hexColor} />
      </mesh>
    );
  };

  return (
    <group
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      scale={isSelected || hovered ? 1.05 : 1}
    >
      {/* Main block body */}
      {renderSpecialShape()}

      {/* Studs on top - skip for tiles */}
      {!blockType?.includes('tile') && !blockType?.includes('cone') && studs.map((stud, i) => (
        <mesh key={i} position={[stud.x, blockHeight + STUD_HEIGHT / 2, stud.z]}>
          <cylinderGeometry args={[STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, 16]} />
          <meshStandardMaterial color={hexColor} />
        </mesh>
      ))}

      {/* Selection glow */}
      {isSelected && (
        <mesh position={[0, blockHeight / 2, 0]}>
          <boxGeometry args={[blockWidth + 0.1, blockHeight + 0.1, blockDepth + 0.1]} />
          <meshStandardMaterial color="#FFD700" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};
