export type BlockCategory = 'classic' | 'plates' | 'slopes' | 'special';

export interface LegoBlock {
  id: string;
  name: string;
  category: BlockCategory;
  dimensions: {
    studsX: number;
    studsZ: number;
    height: number; // 1 = plate height, 3 = brick height
  };
  pieceId: string;
  funFact: string;
  defaultColor: string;
}

export const LEGO_COLORS: Record<string, string> = {
  red: '#E3000B',
  blue: '#0055BF',
  yellow: '#F5CD2F',
  green: '#00852B',
  orange: '#FF6D00',
  purple: '#8B4E9E',
  pink: '#F785B1',
  black: '#1B1B1B',
  white: '#F4F4F4',
  gray: '#7D7D7D',
  brown: '#5C3317',
  cyan: '#00A3DA',
};

export const CATEGORIES: { id: BlockCategory; label: string; emoji: string }[] = [
  { id: 'classic', label: 'Classic Bricks', emoji: '🧱' },
  { id: 'plates', label: 'Plates', emoji: '📋' },
  { id: 'slopes', label: 'Slopes & Wedges', emoji: '📐' },
  { id: 'special', label: 'Special Pieces', emoji: '✨' },
];

export const LEGO_BLOCKS: LegoBlock[] = [
  // Classic Bricks
  {
    id: 'brick-1x1',
    name: 'Brick 1×1',
    category: 'classic',
    dimensions: { studsX: 1, studsZ: 1, height: 3 },
    pieceId: '3005',
    funFact: 'The smallest standard brick - perfect for fine details!',
    defaultColor: 'red',
  },
  {
    id: 'brick-1x2',
    name: 'Brick 1×2',
    category: 'classic',
    dimensions: { studsX: 1, studsZ: 2, height: 3 },
    pieceId: '3004',
    funFact: 'One of the most versatile pieces in any LEGO collection.',
    defaultColor: 'blue',
  },
  {
    id: 'brick-1x4',
    name: 'Brick 1×4',
    category: 'classic',
    dimensions: { studsX: 1, studsZ: 4, height: 3 },
    pieceId: '3010',
    funFact: 'Great for building walls and foundations!',
    defaultColor: 'yellow',
  },
  {
    id: 'brick-2x2',
    name: 'Brick 2×2',
    category: 'classic',
    dimensions: { studsX: 2, studsZ: 2, height: 3 },
    pieceId: '3003',
    funFact: 'A square brick that\'s been a classic since 1958!',
    defaultColor: 'green',
  },
  {
    id: 'brick-2x4',
    name: 'Brick 2×4',
    category: 'classic',
    dimensions: { studsX: 2, studsZ: 4, height: 3 },
    pieceId: '3001',
    funFact: 'The iconic LEGO brick! Two of these can connect in 24 ways.',
    defaultColor: 'red',
  },
  {
    id: 'brick-2x6',
    name: 'Brick 2×6',
    category: 'classic',
    dimensions: { studsX: 2, studsZ: 6, height: 3 },
    pieceId: '2456',
    funFact: 'Perfect for longer structures and bridges.',
    defaultColor: 'blue',
  },
  {
    id: 'brick-2x8',
    name: 'Brick 2×8',
    category: 'classic',
    dimensions: { studsX: 2, studsZ: 8, height: 3 },
    pieceId: '3007',
    funFact: 'The longest standard brick - ideal for big builds!',
    defaultColor: 'orange',
  },

  // Plates
  {
    id: 'plate-1x2',
    name: 'Plate 1×2',
    category: 'plates',
    dimensions: { studsX: 1, studsZ: 2, height: 1 },
    pieceId: '3023',
    funFact: 'Three plates stacked equal the height of one brick!',
    defaultColor: 'cyan',
  },
  {
    id: 'plate-2x4',
    name: 'Plate 2×4',
    category: 'plates',
    dimensions: { studsX: 2, studsZ: 4, height: 1 },
    pieceId: '3020',
    funFact: 'The flat cousin of the classic 2×4 brick.',
    defaultColor: 'yellow',
  },
  {
    id: 'plate-2x6',
    name: 'Plate 2×6',
    category: 'plates',
    dimensions: { studsX: 2, studsZ: 6, height: 1 },
    pieceId: '3795',
    funFact: 'Great for floors and smooth surfaces!',
    defaultColor: 'gray',
  },
  {
    id: 'plate-4x4',
    name: 'Plate 4×4',
    category: 'plates',
    dimensions: { studsX: 4, studsZ: 4, height: 1 },
    pieceId: '3031',
    funFact: 'A perfect square base for small creations.',
    defaultColor: 'green',
  },

  // Slopes & Wedges
  {
    id: 'slope-45-2x2',
    name: 'Slope 45° 2×2',
    category: 'slopes',
    dimensions: { studsX: 2, studsZ: 2, height: 3 },
    pieceId: '3039',
    funFact: 'Creates a perfect 45-degree angle for roofs!',
    defaultColor: 'red',
  },
  {
    id: 'slope-33-1x3',
    name: 'Slope 33° 1×3',
    category: 'slopes',
    dimensions: { studsX: 1, studsZ: 3, height: 2 },
    pieceId: '4286',
    funFact: 'A gentler slope for gradual inclines.',
    defaultColor: 'brown',
  },
  {
    id: 'slope-curved-2x2',
    name: 'Curved Slope 2×2',
    category: 'slopes',
    dimensions: { studsX: 2, studsZ: 2, height: 2 },
    pieceId: '15068',
    funFact: 'Adds organic curves to your blocky creations!',
    defaultColor: 'white',
  },
  {
    id: 'slope-inverted-45-2x2',
    name: 'Inverted Slope 45° 2×2',
    category: 'slopes',
    dimensions: { studsX: 2, studsZ: 2, height: 3 },
    pieceId: '3660',
    funFact: 'Upside-down slope for overhangs and ship hulls.',
    defaultColor: 'blue',
  },

  // Special Pieces
  {
    id: 'round-1x1',
    name: 'Round Brick 1×1',
    category: 'special',
    dimensions: { studsX: 1, studsZ: 1, height: 3 },
    pieceId: '3062',
    funFact: 'A circular twist on the classic brick!',
    defaultColor: 'purple',
  },
  {
    id: 'arch-1x4',
    name: 'Arch 1×4',
    category: 'special',
    dimensions: { studsX: 1, studsZ: 4, height: 3 },
    pieceId: '3659',
    funFact: 'Perfect for doorways, windows, and bridges!',
    defaultColor: 'brown',
  },
  {
    id: 'tile-2x2',
    name: 'Tile 2×2',
    category: 'special',
    dimensions: { studsX: 2, studsZ: 2, height: 1 },
    pieceId: '3068',
    funFact: 'Smooth top with no studs - great for finishing!',
    defaultColor: 'black',
  },
  {
    id: 'window-1x2x2',
    name: 'Window Frame 1×2×2',
    category: 'special',
    dimensions: { studsX: 1, studsZ: 2, height: 6 },
    pieceId: '60592',
    funFact: 'Let the light in! Essential for any LEGO house.',
    defaultColor: 'white',
  },
  {
    id: 'cone-1x1',
    name: 'Cone 1×1',
    category: 'special',
    dimensions: { studsX: 1, studsZ: 1, height: 3 },
    pieceId: '4589',
    funFact: 'Great for tower tops and ice cream cones!',
    defaultColor: 'pink',
  },
];
