import { LegoBlock, LEGO_COLORS } from '@/data/legoBlocks';

interface BlockGridProps {
  blocks: LegoBlock[];
  selectedBlock: LegoBlock | null;
  onBlockSelect: (block: LegoBlock) => void;
  onPlaySound?: () => void;
}

export const BlockGrid = ({ 
  blocks, 
  selectedBlock, 
  onBlockSelect,
  onPlaySound 
}: BlockGridProps) => {
  const handleBlockClick = (block: LegoBlock) => {
    onPlaySound?.();
    onBlockSelect(block);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {blocks.map((block, index) => (
        <button
          key={block.id}
          onClick={() => handleBlockClick(block)}
          className={`
            relative bg-card rounded-2xl p-4 transition-all duration-200
            hover:scale-105 active:scale-95
            lego-button
            ${selectedBlock?.id === block.id 
              ? 'ring-4 ring-primary scale-105' 
              : ''
            }
          `}
          style={{ 
            animationDelay: `${index * 50}ms`,
          }}
        >
          {/* Block preview using color */}
          <div 
            className="w-full aspect-square rounded-xl mb-2 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: LEGO_COLORS[block.defaultColor] }}
          >
            {/* Stud pattern overlay */}
            <div className="absolute inset-0 stud-pattern opacity-30" />
            
            {/* Dimensions indicator */}
            <span className="text-white font-bold text-lg drop-shadow-md z-10">
              {block.dimensions.studsX}×{block.dimensions.studsZ}
            </span>
          </div>
          
          <h3 className="font-bold text-sm text-foreground text-center truncate">
            {block.name}
          </h3>
          <p className="text-xs text-muted-foreground text-center">
            #{block.pieceId}
          </p>
          
          {/* Selected indicator */}
          {selectedBlock?.id === block.id && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
              <span className="text-primary-foreground text-xs">✓</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
