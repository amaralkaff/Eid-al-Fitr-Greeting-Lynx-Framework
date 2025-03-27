import { useEffect, useState } from '@lynx-js/react';
import type { NavigationProps } from '../navigation/AppNavigator.js';
import '../styles/PreviewScreen.css';
import { CardTemplate } from '../components/CardTemplate.js';
import { shareToSocial, saveToGallery, sendAsMessage } from '../utils/NativeShare.js';
import '../styles/Fonts.css'; // Explicitly import fonts

export function PreviewScreen({ navigation }: { navigation: NavigationProps }) {
  const cardData = navigation.params?.cardData || {
    message: 'Eid Mubarak!',
    font: 'Amiri',
    textColor: '#006C51',
    textSize: 24,
    backgroundColor: '#F8F7F2',
    template: 'arabic',
    stickers: []
  };

  // Status messages for user feedback
  const [statusMessage, setStatusMessage] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  // Track if actions are in progress
  const [isProcessing, setIsProcessing] = useState(false);

  // Apply animation effect on mount
  useEffect(() => {
    console.info('Card preview loaded with data:', cardData);
  }, []);

  // Show a status message to the user
  const showStatusMessage = (message: string) => {
    setStatusMessage(message);
    setShowStatus(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowStatus(false);
    }, 3000);
  };

  // Share card via specific method
  const shareCard = async (method: 'social' | 'save' | 'message') => {
    if (isProcessing) {
      showStatusMessage("Please wait, processing previous request...");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Show initial processing message
      switch (method) {
        case 'social':
          showStatusMessage("Preparing to share...");
          break;
        case 'save':
          showStatusMessage("Saving to gallery...");
          break;
        case 'message':
          showStatusMessage("Preparing message...");
          break;
      }
      
      let result = '';
      
      switch (method) {
        case 'social':
          result = await shareToSocial({
            title: 'Eid Mubarak Greeting Card',
            text: cardData.message,
            url: 'https://example.com/card-share'
          });
          break;
          
        case 'save':
          result = await saveToGallery('card-preview', 'eid-mubarak-card.png');
          break;
          
        case 'message':
          result = await sendAsMessage(
            cardData.message,
            'Eid Mubarak Greeting Card'
          );
          break;
      }
      
      showStatusMessage(result);
    } catch (err) {
      console.error("Share error:", err);
      showStatusMessage("Sharing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <view className="preview-screen">
      <view className="preview-header">
        <view className="back-button" bindtap={() => navigation.goBack()}>
          <text>←</text>
        </view>
        <text className="screen-title">Eid Card Preview</text>
      </view>
      
      <scroll-view className="preview-content">
        {/* Full-screen card display */}
        <view className="card-display-container" id="card-preview">
          <CardTemplate 
            message={cardData.message}
            font={cardData.font}
            textColor={cardData.textColor}
            textSize={cardData.textSize}
            backgroundColor={cardData.backgroundColor}
            template={cardData.template}
            stickers={cardData.stickers}
            isPreview={true}
          />
        </view>
        
        {/* Status message banner */}
        {showStatus && (
          <view className="status-banner">
            <text>{statusMessage}</text>
          </view>
        )}
        
        {/* Share options */}
        <view className="share-options">
          <text className="share-title">Share Your Eid Greeting</text>
          
          <view className="share-buttons-container">
            {/* Overlay that prevents clicks when processing */}
            <view 
              className={`buttons-disabled-overlay ${isProcessing ? 'active' : ''}`}
              bindtap={() => isProcessing && showStatusMessage("Please wait, processing previous request...")}
            />
            
            <view className="share-buttons">
              <view 
                className={`share-button social ${isProcessing ? 'disabled' : ''}`}
                bindtap={() => !isProcessing && shareCard('social')}
              >
                <text className="share-icon">📱</text>
                <text className="share-text">Social Media</text>
              </view>
              
              <view 
                className={`share-button save ${isProcessing ? 'disabled' : ''}`}
                bindtap={() => !isProcessing && shareCard('save')}
              >
                <text className="share-icon">💾</text>
                <text className="share-text">Save to Gallery</text>
              </view>
              
              <view 
                className={`share-button message ${isProcessing ? 'disabled' : ''}`}
                bindtap={() => !isProcessing && shareCard('message')}
              >
                <text className="share-icon">✉️</text>
                <text className="share-text">Send as Message</text>
              </view>
            </view>
          </view>
        </view>
        
        <view 
          className="edit-button" 
          bindtap={() => navigation.goBack()}
        >
          <text>Customize Card</text>
        </view>
      </scroll-view>
    </view>
  );
} 