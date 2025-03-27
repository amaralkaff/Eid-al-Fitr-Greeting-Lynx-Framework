import { useState } from '@lynx-js/react';
import '../styles/Components.css';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  // Predefined color palette
  const colorPalette = [
    '#008037', // Eid green
    '#C09E6B', // Gold accent
    '#FFFFFF', // White
    '#F44336', // Red
    '#2196F3', // Blue
    '#FFEB3B', // Yellow
    '#9C27B0', // Purple
    '#FF9800', // Orange
    '#795548', // Brown
    '#000000', // Black
  ];

  const [showPalette, setShowPalette] = useState(false);

  // Toggle palette visibility
  const togglePalette = () => {
    try {
      setShowPalette(!showPalette);
    } catch (err) {
      console.error('Error toggling palette:', err);
    }
  };

  // Select color from palette
  const selectColor = (color: string) => {
    try {
      onChange(color);
      setShowPalette(false);
    } catch (err) {
      console.error('Error selecting color:', err);
    }
  };

  return (
    <view className="color-picker-container">
      {label && <text className="color-picker-label">{label}</text>}
      
      <view className="color-picker-main">
        {/* Color preview button */}
        <view 
          className="color-preview" 
          style={{ backgroundColor: value }}
          bindtap={togglePalette}
        ></view>
        
        {/* Text showing the current color */}
        <text className="current-color-text">{value}</text>
        
        {/* Color palette as popup */}
        {showPalette && (
          <view className="color-palette-popup">
            {/* Linear color picker */}
            <view className="linear-color-picker">
              {colorPalette.map(color => (
                <view 
                  key={color}
                  className="color-bar"
                  style={{ backgroundColor: color }}
                  bindtap={() => selectColor(color)}
                ></view>
              ))}
            </view>
            
            {/* Selected color preview */}
            <view className="selected-color-preview" style={{ backgroundColor: value }}>
              <text style={{ color: isLightColor(value) ? '#000000' : '#FFFFFF' }}>{value}</text>
            </view>
          </view>
        )}
      </view>
    </view>
  );
}

// Helper function to determine if text should be dark or light based on background color
function isLightColor(color: string): boolean {
  // Simple check for light colors
  return color === '#FFFFFF' || color === '#FFEB3B';
} 