import { useState, useMemo } from 'react';
import { LEGO_BLOCKS, LegoBlock, BlockCategory } from '@/data/legoBlocks';
import { BlockViewer } from '@/components/lego/BlockViewer';
import { CategoryFilter } from '@/components/lego/CategoryFilter';
import { ColorPicker } from '@/components/lego/ColorPicker';
import { BlockInfoCard } from '@/components/lego/BlockInfoCard';
import { BlockGrid } from '@/components/lego/BlockGrid';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const Index = () => {
  const [selectedBlock, setSelectedBlock] = useState<LegoBlock>(LEGO_BLOCKS[4]); // Start with 2x4 brick
  const [selectedColor, setSelectedColor] = useState<string>(LEGO_BLOCKS[4].defaultColor);
  const [selectedCategory, setSelectedCategory] = useState<BlockCategory | 'all'>('all');
  
  const { playClick, playSnap, playPop } = useSoundEffects();

  const filteredBlocks = useMemo(() => {
    if (selectedCategory === 'all') return LEGO_BLOCKS;
    return LEGO_BLOCKS.filter(block => block.category === selectedCategory);
  }, [selectedCategory]);

  const handleBlockSelect = (block: LegoBlock) => {
    setSelectedBlock(block);
    setSelectedColor(block.defaultColor);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 lego-shadow">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl animate-wiggle">🧱</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              LEGO Block Viewer
            </h1>
            <span className="text-4xl animate-wiggle" style={{ animationDelay: '150ms' }}>🧱</span>
          </div>
          <p className="text-center mt-2 text-primary-foreground/80 font-medium">
            Click to explore • Rotate to discover • Change colors!
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <section className="py-6 px-4 bg-muted/50">
        <div className="container mx-auto">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onPlaySound={playClick}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: 3D Viewer */}
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-4 lego-shadow">
              <BlockViewer block={selectedBlock} color={selectedColor} />
            </div>
            
            {/* Color Picker - Below viewer on desktop */}
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              onPlaySound={playSnap}
            />
          </div>

          {/* Right: Block Info */}
          <div className="space-y-6">
            <BlockInfoCard block={selectedBlock} color={selectedColor} />
            
            {/* Instructions */}
            <div className="bg-secondary/20 rounded-2xl p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">🖱️ Drag</span> to rotate • 
                <span className="font-bold ml-2">🔍 Scroll</span> to zoom • 
                <span className="font-bold ml-2">👆 Click</span> a block below to explore
              </p>
            </div>
          </div>
        </div>

        {/* Block Gallery */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === 'all' ? 'All Blocks' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`}
            </h2>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
              {filteredBlocks.length} pieces
            </span>
          </div>
          
          <BlockGrid
            blocks={filteredBlocks}
            selectedBlock={selectedBlock}
            onBlockSelect={handleBlockSelect}
            onPlaySound={playPop}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-bold">Built with ❤️ and 🧱</p>
          <p className="text-sm opacity-70 mt-1">
            LEGO® is a trademark of the LEGO Group. This is a fan project.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
