import { useState } from '@lynx-js/react';
import type { NavigationProps } from '../navigation/AppNavigator.js';
import '../styles/CreateCardScreen.css';
import { ColorPicker } from '../components/ColorPicker.js';
import { StickerGallery } from '../components/StickerGallery.js';
import { CustomButton } from '../components/CustomButton.js';
import { CardTemplate } from '../components/CardTemplate.js';
import '../styles/Fonts.css'; // Explicitly import fonts

// Card customization interface
interface CardData {
  message: string;
  font: string;
  textColor: string;
  textSize: number;
  backgroundColor: string;
  template: string;
  stickers: string[];
}

export function CreateCardScreen({ navigation }: { navigation: NavigationProps }) {
  // Card state with default values
  const [cardData, setCardData] = useState<CardData>({
    message: 'Eid Mubarak!',
    font: 'Amiri',
    textColor: '#006C51',
    textSize: 24,
    backgroundColor: '#F8F7F2',
    template: 'arabic', // Default to Arabic template
    stickers: []
  });
  
  // Font dropdown state
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'text' | 'visual'>('text');
  
  // Available fonts
  const fonts = ['Amiri', 'Arial', 'Times New Roman', 'Courier New'];

  // Get CSS class for font
  const getFontClass = (fontName: string) => {
    switch(fontName) {
      case 'Arial': return 'font-arial';
      case 'Times New Roman': return 'font-times';
      case 'Courier New': return 'font-courier';
      case 'Amiri': return 'font-arabic';
      case 'Arabic': return 'font-arabic';
      default: return 'font-arabic';
    }
  };

  // Update card data
  const updateCardData = (key: keyof CardData, value: any) => {
    console.info(`Updating ${key} to:`, value);
    setCardData(prev => ({ ...prev, [key]: value }));
  };
  
  // Update message specifically to handle input events properly
  const updateMessage = (e: any) => {
    try {
      // Simple approach to avoid crashes
      const newMessage = e?.detail?.value || '';
      console.info('New message:', newMessage);
      setCardData(prev => ({...prev, message: newMessage}));
    } catch (err) {
      console.error('Error updating message:', err);
    }
  };
  
  // Toggle font dropdown
  const toggleFontDropdown = () => {
    setShowFontDropdown(!showFontDropdown);
  };
  
  // Select font and close dropdown
  const selectFont = (font: string) => {
    console.info('Selected font:', font);
    updateCardData('font', font);
    setShowFontDropdown(false);
  };

  // Save draft to local storage
  const saveDraft = () => {
    'background-only';
    // Save logic would go here
    console.info('Card draft saved');
  };

  // Preview the card
  const previewCard = () => {
    navigation.navigate('Preview', { cardData });
  };

  // Add sticker to card
  const addSticker = (sticker: string) => {
    'background-only';
    updateCardData('stickers', [...cardData.stickers, sticker]);
  };

  // Change active tab
  const changeTab = (tab: 'text' | 'visual') => {
    'background-only';
    // Close dropdown when changing tabs to avoid z-index issues
    setShowFontDropdown(false);
    setActiveTab(tab);
  };

  // Update text size with specific handler
  const updateTextSize = (e: any) => {
    try {
      const size = parseInt(e?.detail?.value || '24');
      console.info('New text size:', size);
      setCardData(prev => ({...prev, textSize: size}));
    } catch (err) {
      console.error('Error updating text size:', err);
    }
  };

  // Safe color update function
  const handleColorChange = (color: string) => {
    try {
      updateCardData('textColor', color);
    } catch (err) {
      console.error('Error updating color:', err);
    }
  };
  
  // Safe background color update function
  const handleBgColorChange = (color: string) => {
    try {
      updateCardData('backgroundColor', color);
    } catch (err) {
      console.error('Error updating background color:', err);
    }
  };

  // Template options with Arabic style
  const templates = [
    { id: 'arabic', name: 'Arabic' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'festive', name: 'Festive' },
    { id: 'default', name: 'Default' }
  ];

  return (
    <view className="create-card-screen">
      <view className="create-header">
        <view className="back-button" bindtap={() => navigation.goBack()}>
          <text>←</text>
        </view>
        <text className="screen-title">Create Your Card</text>
        <view className="save-button" bindtap={saveDraft}>
          <text>✓</text>
        </view>
      </view>
      
      <scroll-view 
        className="customization-scroll"
        enable-scroll={true}
        scroll-orientation="vertical"
        scroll-bar-enable={true}
      >
        <view className="customization-container">
          
          <view className="card-preview-container">
            <CardTemplate 
              message={cardData.message}
              font={cardData.font}
              textColor={cardData.textColor}
              textSize={cardData.textSize}
              backgroundColor={cardData.backgroundColor}
              template={cardData.template}
              stickers={cardData.stickers}
            />
          </view>
        
          <view className="tabs-container">
            <view 
              className={`tab ${activeTab === 'text' ? 'active' : ''}`} 
              bindtap={() => changeTab('text')}
            >
              <text>Text & Font</text>
            </view>
            <view 
              className={`tab ${activeTab === 'visual' ? 'active' : ''}`}
              bindtap={() => changeTab('visual')}
            >
              <text>Design & Style</text>
            </view>
          </view>
          
          <view className="tab-content">
            {activeTab === 'text' && (
              <view className="customization-section">
                <text className="section-title">Text Customization</text>
                
                <view className="input-row">
                  <text className="input-label">Message:</text>
                  <input 
                    type="text"
                    className="message-input"
                    value={cardData.message}
                    // @ts-ignore - Lynx specific attribute 
                    bindinput={updateMessage}
                    placeholder="Enter your Eid greeting"
                  />
                </view>
                
                <view className="input-row">
                  <text className="input-label">Font:</text>
                  <view className="custom-dropdown">
                    <view 
                      className="dropdown-selected" 
                      bindtap={toggleFontDropdown}
                    >
                      <text className={getFontClass(cardData.font)}>{cardData.font}</text>
                      <text className="dropdown-arrow">{showFontDropdown ? '▲' : '▼'}</text>
                    </view>
                    
                    {showFontDropdown && (
                      <view className="dropdown-options">
                        {fonts.map((font) => (
                          <view 
                            key={font} 
                            className={`dropdown-option ${font === cardData.font ? 'selected' : ''}`}
                            bindtap={() => selectFont(font)}
                          >
                            <text className={getFontClass(font)}>{font}</text>
                          </view>
                        ))}
                      </view>
                    )}
                  </view>
                </view>
                
                <view className="input-row">
                  <text className="input-label">Text Color:</text>
                  <ColorPicker 
                    value={cardData.textColor} 
                    onChange={handleColorChange} 
                  />
                </view>
                
                <view className="input-row">
                  <text className="input-label">Text Size:</text>
                  <input 
                    type="range"
                    min="12"
                    max="48"
                    className="size-slider"
                    value={cardData.textSize}
                    // @ts-ignore - Lynx specific attribute
                    bindinput={updateTextSize}
                  />
                  <text className="size-value">{cardData.textSize}px</text>
                </view>
              </view>
            )}
            
            {/* Visual Customization Section */}
            {activeTab === 'visual' && (
              <view className="customization-section">
                <text className="section-title">Visual Customization</text>
                
                <view className="input-row">
                  <text className="input-label">Background:</text>
                  <ColorPicker 
                    value={cardData.backgroundColor} 
                    onChange={handleBgColorChange} 
                  />
                </view>
                
                <view className="input-row">
                  <text className="input-label">Template:</text>
                  <view className="template-grid">
                    {templates.map((template) => (
                      <view 
                        key={template.id}
                        className={`template-option ${cardData.template === template.id ? 'selected' : ''}`}
                        bindtap={() => updateCardData('template', template.id)}
                      >
                        <text>{template.name}</text>
                      </view>
                    ))}
                  </view>
                </view>
                
                <view className="input-row sticker-row">
                  <text className="input-label">Stickers:</text>
                  <StickerGallery onSelectSticker={addSticker} />
                </view>
              </view>
            )}
          </view>
          
          <CustomButton 
            text="Preview Card"
            onClick={previewCard}
            variant="primary"
            fullWidth={true}
          />
        </view>
      </scroll-view>
    </view>
  );
} 