/**
 * NativeShare.ts - Utility functions for native sharing capabilities
 * Using direct Android APIs when available
 */
import { requestStoragePermission, hasStoragePermission } from './AndroidPermissions.js';

// Typings for the native lynx API and Android bridge
interface LynxShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

interface LynxGalleryOptions {
  elementId: string;
  filename?: string;
}

interface LynxMessageOptions {
  message: string;
  subject?: string;
  recipients?: string[];
}

interface AndroidBridge {
  shareContent?: (title: string, text: string, url: string) => void;
  saveToGallery?: (imageData: string, filename: string) => boolean;
  sendSMS?: (phoneNumber: string, message: string) => boolean;
  captureElement?: (elementId: string) => string;
  makeToast?: (message: string) => void;
}

// Get Android bridge if available
function getAndroidBridge(): AndroidBridge | null {
  if (typeof window !== 'undefined') {
    // Try to access Android bridge through window.Android
    if ((window as any).Android) {
      return (window as any).Android;
    }
    
    // Try alternate name sometimes used 
    if ((window as any).AndroidBridge) {
      return (window as any).AndroidBridge;
    }
    
    // Check lynx.android if exists
    if ((window as any).lynx && (window as any).lynx.android) {
      return (window as any).lynx.android;
    }
  }
  
  return null;
}

// Share content to social media using Android's share intent
export async function shareToSocial(options: LynxShareOptions): Promise<string> {
  const bridge = getAndroidBridge();
  
  try {
    if (bridge && bridge.shareContent) {
      // Use Android's native share functionality
      bridge.shareContent(
        options.title || 'Eid Greeting Card',
        options.text || '',
        options.url || ''
      );
      return "Shared to social media";
    } else if ((window as any).navigator && (window as any).navigator.share) {
      // Use Web Share API as fallback
      await (window as any).navigator.share({
        title: options.title || 'Eid Greeting Card',
        text: options.text || '',
        url: options.url || ''
      });
      return "Shared to social media";
    } else {
      // Direct console debug
      console.info("DIRECT SHARE:", options);
      return "Shared (simulated)";
    }
  } catch (error) {
    console.error("Share error:", error);
    return "Couldn't share to social media";
  }
}

// Save element to gallery using Android's MediaStore
export async function saveToGallery(elementId: string, filename?: string): Promise<string> {
  const bridge = getAndroidBridge();
  
  try {
    // Check for storage permission first
    if (!hasStoragePermission()) {
      console.info("Storage permission not granted, requesting...");
      const granted = await requestStoragePermission();
      
      if (!granted) {
        console.warn("Storage permission denied by user");
        return "Permission needed to save to gallery";
      }
    }
    
    // First try to capture the element as an image
    let imageData = '';
    
    if (bridge && bridge.captureElement) {
      // Use Android's method to capture DOM element
      imageData = bridge.captureElement(elementId);
    } else {
      // For debugging
      console.info("CAPTURE ELEMENT:", elementId);
      // We'd need a canvas-based capture here in a real implementation
    }
    
    if (imageData && bridge && bridge.saveToGallery) {
      // Save the captured image to gallery
      const success = bridge.saveToGallery(
        imageData,
        filename || 'eid-card.png'
      );
      
      return success ? "Saved to gallery" : "Failed to save to gallery";
    }
    
    // Show debug message
    console.info("SAVE TO GALLERY:", {elementId, filename});
    return "Saved to gallery (simulated)";
  } catch (error) {
    console.error("Save error:", error);
    return "Couldn't save to gallery";
  }
}

// Send as message using Android's SMS functionality
export async function sendAsMessage(message: string, subject?: string): Promise<string> {
  const bridge = getAndroidBridge();
  
  try {
    if (bridge && bridge.sendSMS) {
      // Open SMS app with prefilled message
      // We're sending to empty phone number as user will select recipient
      const success = bridge.sendSMS('', message);
      
      return success ? "Message prepared" : "Failed to open messaging app";
    }
    
    // Show toast if available
    if (bridge && bridge.makeToast) {
      bridge.makeToast("Message ready: " + message);
    }
    
    // Debug info
    console.info("SEND AS MESSAGE:", {message, subject});
    return "Message ready (simulated)";
  } catch (error) {
    console.error("Message error:", error);
    return "Couldn't prepare message";
  }
} 