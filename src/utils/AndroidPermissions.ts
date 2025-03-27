/**
 * AndroidPermissions.ts - Utility to handle Android permissions
 */

interface AndroidPermissionsInterface {
  requestStoragePermission?: () => boolean;
  checkStoragePermission?: () => boolean;
  requestPermission?: (permission: string) => boolean;
  checkPermission?: (permission: string) => boolean;
}

// Storage permission types in Android
const PERMISSIONS = {
  WRITE_EXTERNAL_STORAGE: "android.permission.WRITE_EXTERNAL_STORAGE",
  READ_EXTERNAL_STORAGE: "android.permission.READ_EXTERNAL_STORAGE",
  READ_MEDIA_IMAGES: "android.permission.READ_MEDIA_IMAGES", // Android 13+
  CAMERA: "android.permission.CAMERA"
};

// Get Android permissions interface
function getAndroidPermissions(): AndroidPermissionsInterface | null {
  if (typeof window !== 'undefined') {
    // Try to access Android bridge through various common patterns
    if ((window as any).Android && (window as any).Android.checkPermission) {
      return (window as any).Android;
    }
    
    if ((window as any).AndroidPermissions) {
      return (window as any).AndroidPermissions;
    }
    
    if ((window as any).lynx && (window as any).lynx.android && 
        ((window as any).lynx.android.checkPermission || 
         (window as any).lynx.android.checkStoragePermission)) {
      return (window as any).lynx.android;
    }
  }
  
  return null;
}

/**
 * Request storage write permissions from Android
 * @returns Promise resolving to true if permission granted
 */
export async function requestStoragePermission(): Promise<boolean> {
  const permissions = getAndroidPermissions();
  
  if (!permissions) {
    console.warn("Android permissions interface not available");
    return false;
  }
  
  try {
    // Try specific storage permission method first
    if (permissions.requestStoragePermission) {
      return permissions.requestStoragePermission();
    }
    
    // Fall back to general permission method
    if (permissions.requestPermission) {
      // Try newer permission first, then fall back to older one
      const result = permissions.requestPermission(PERMISSIONS.READ_MEDIA_IMAGES) || 
                     permissions.requestPermission(PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      return !!result;
    }
    
    // No permission APIs available
    console.warn("No appropriate permission method found");
    return false;
  } catch (err) {
    console.error("Error requesting storage permission:", err);
    return false;
  }
}

/**
 * Check if we already have storage permission
 * @returns true if permission already granted
 */
export function hasStoragePermission(): boolean {
  const permissions = getAndroidPermissions();
  
  if (!permissions) {
    console.warn("Android permissions interface not available");
    return false;
  }
  
  try {
    // Try specific check method first
    if (permissions.checkStoragePermission) {
      return permissions.checkStoragePermission();
    }
    
    // Fall back to general check method
    if (permissions.checkPermission) {
      // Check newer permission first (Android 13+), then fall back to older one
      return permissions.checkPermission(PERMISSIONS.READ_MEDIA_IMAGES) || 
             permissions.checkPermission(PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    }
    
    // No permission APIs available
    console.warn("No permission check method found");
    return false;
  } catch (err) {
    console.error("Error checking storage permission:", err);
    return false;
  }
} 