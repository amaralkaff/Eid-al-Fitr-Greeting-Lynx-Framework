import '../styles/CardTemplate.css';
import '../styles/Fonts.css'; // Explicitly import fonts

interface CardTemplateProps {
  message: string;
  font: string;
  textColor: string;
  textSize: number;
  backgroundColor: string;
  template: string;
  stickers: string[];
  isPreview?: boolean;
}

// Helper function to get font class based on font name
const getFontClass = (fontName: string) => {
  switch(fontName) {
    case 'Arial': return 'font-arial';
    case 'Times New Roman': return 'font-times';
    case 'Courier New': return 'font-courier';
    case 'Arabic': return 'font-arabic';
    default: return 'font-arial';
  }
};

export function CardTemplate({
  message,
  font,
  textColor,
  textSize,
  backgroundColor,
  template,
  stickers,
  isPreview = false
}: CardTemplateProps) {
  const fontClass = getFontClass(font);
  const displayMessage = message || 'Your greeting here';
  
  // Simplify template class assignment
  let templateClass = 'template-default';
  if (template === 'elegant') templateClass = 'template-elegant';
  if (template === 'festive') templateClass = 'template-festive';
  
  return (
    <view 
      className={`card-template ${templateClass}`}
      style={{
        backgroundColor,
      }}
    >
      {template === 'elegant' && <view className="elegant-decoration" />}
      {template === 'festive' && <view className="festive-decoration" />}
      
      <text 
        className={`template-message ${fontClass}`}
        style={{
          color: textColor,
          fontSize: `${textSize}px`,
        }}
      >
        {displayMessage}
      </text>
      
      {stickers.length > 0 && (
        <view className="template-stickers">
          {stickers.map((sticker, index) => (
            <text 
              key={index}
              className="template-sticker"
              style={{
                position: 'absolute',
                top: index % 2 === 0 ? '10%' : '90%',
                left: index % 3 === 0 ? '10%' : '90%',
                fontSize: '24px'
              }}
            >
              {sticker}
            </text>
          ))}
        </view>
      )}
    </view>
  );
} 