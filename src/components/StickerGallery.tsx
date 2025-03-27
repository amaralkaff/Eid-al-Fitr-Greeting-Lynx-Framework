import { useState } from '@lynx-js/react';
import '../styles/Components.css';

interface StickerGalleryProps {
  onSelectSticker: (sticker: string) => void;
}

export function StickerGallery({ onSelectSticker }: StickerGalleryProps) {
  // Sticker categories
  const categories = {
    religious: ['🕌', '☪️', '🌙', '⭐', '🌟'],
    festive: ['🎉', '🎊', '✨', '🎁', '🎀'],
    food: ['🍰', '🍪', '🍯', '☕', '🍬'],
    nature: ['🌷', '🌹', '🌸', '🌺', '🌿'],
    symbols: ['❤️', '💫', '🤲', '🙏', '💐'],
  };

  const [activeCategory, setActiveCategory] = useState<keyof typeof categories>('religious');
  
  // Change active category
  const changeCategory = (category: keyof typeof categories) => {
    'background-only';
    setActiveCategory(category);
  };
  
  // Select a sticker
  const selectSticker = (sticker: string) => {
    'background-only';
    onSelectSticker(sticker);
  };

  return (
    <view className="sticker-gallery-container">
      <view className="sticker-categories">
        {Object.keys(categories).map((category) => (
          <view 
            key={category}
            className={`category-tab ${category === activeCategory ? 'active' : ''}`}
            bindtap={() => changeCategory(category as keyof typeof categories)}
          >
            <text>{category.charAt(0).toUpperCase() + category.slice(1)}</text>
          </view>
        ))}
      </view>
      
      <view className="stickers-grid">
        {categories[activeCategory].map((sticker) => (
          <view 
            key={sticker}
            className="sticker-item"
            bindtap={() => selectSticker(sticker)}
          >
            <text className="sticker-emoji">{sticker}</text>
          </view>
        ))}
      </view>
    </view>
  );
} 