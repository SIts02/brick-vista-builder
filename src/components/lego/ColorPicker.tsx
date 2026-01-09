import { LEGO_COLORS } from '@/data/legoBlocks';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  onPlaySound?: () => void;
}

export const ColorPicker = ({ 
  selectedColor, 
  onColorChange,
  onPlaySound 
}: ColorPickerProps) => {
  const handleColorClick = (colorKey: string) => {
    onPlaySound?.();
    onColorChange(colorKey);
  };

  return (
    <div className="bg-card rounded-2xl p-4 lego-shadow">
      <h3 className="font-bold text-lg mb-3 text-center">🎨 Pick a Color</h3>
      <div className="grid grid-cols-6 gap-2">
        {Object.entries(LEGO_COLORS).map(([key, hex]) => (
          <button
            key={key}
            onClick={() => handleColorClick(key)}
            className={`
              w-10 h-10 rounded-lg transition-all duration-200
              hover:scale-110 active:scale-95
              ${selectedColor === key 
                ? 'ring-4 ring-foreground ring-offset-2 scale-110' 
                : 'hover:ring-2 hover:ring-foreground/30'
              }
            `}
            style={{ backgroundColor: hex }}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
          >
            {selectedColor === key && (
              <span className="text-white drop-shadow-md">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
