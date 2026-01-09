import { BlockCategory, CATEGORIES } from '@/data/legoBlocks';

interface CategoryFilterProps {
  selectedCategory: BlockCategory | 'all';
  onCategoryChange: (category: BlockCategory | 'all') => void;
  onPlaySound?: () => void;
}

export const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange,
  onPlaySound 
}: CategoryFilterProps) => {
  const handleClick = (category: BlockCategory | 'all') => {
    onPlaySound?.();
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => handleClick('all')}
        className={`
          px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200
          lego-button
          ${selectedCategory === 'all' 
            ? 'bg-primary text-primary-foreground scale-105' 
            : 'bg-card text-card-foreground hover:bg-muted'
          }
        `}
      >
        🎨 All Blocks
      </button>
      
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={`
            px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200
            lego-button
            ${selectedCategory === category.id 
              ? 'bg-primary text-primary-foreground scale-105' 
              : 'bg-card text-card-foreground hover:bg-muted'
            }
          `}
        >
          {category.emoji} {category.label}
        </button>
      ))}
    </div>
  );
};
