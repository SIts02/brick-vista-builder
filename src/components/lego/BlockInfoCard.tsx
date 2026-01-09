import { LegoBlock } from '@/data/legoBlocks';

interface BlockInfoCardProps {
  block: LegoBlock;
  color: string;
}

export const BlockInfoCard = ({ block, color }: BlockInfoCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 lego-shadow animate-slide-up">
      <div className="flex items-start gap-4">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl lego-shadow"
          style={{ backgroundColor: `var(--lego-${color}, hsl(var(--primary)))` }}
        >
          🧱
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">{block.name}</h2>
          <p className="text-muted-foreground text-sm">Piece #{block.pieceId}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-muted rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-primary">{block.dimensions.studsX}</div>
          <div className="text-xs text-muted-foreground">Width</div>
        </div>
        <div className="bg-muted rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-secondary">{block.dimensions.studsZ}</div>
          <div className="text-xs text-muted-foreground">Length</div>
        </div>
        <div className="bg-muted rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-accent">{block.dimensions.height}</div>
          <div className="text-xs text-muted-foreground">Height</div>
        </div>
      </div>
      
      <div className="mt-4 bg-accent/20 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <p className="text-sm text-foreground italic">{block.funFact}</p>
        </div>
      </div>
    </div>
  );
};
