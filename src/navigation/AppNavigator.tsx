import { useState } from '@lynx-js/react';

// Define navigation screen types
export type Screen = 'Home' | 'CreateCard' | 'Preview';

// Navigation stack interface
export interface NavigationProps {
  currentScreen: Screen;
  navigate: (screen: Screen, params?: any) => void;
  goBack: () => void;
  params?: any;
}

// Create a Navigation Provider component
export function AppNavigator({ renderScreen }: { renderScreen: (props: NavigationProps) => JSX.Element }) {
  const [navigationStack, setNavigationStack] = useState<{screen: Screen, params?: any}[]>([
    { screen: 'Home' }
  ]);

  // Navigate to a new screen
  const navigate = (screen: Screen, params?: any) => {
    setNavigationStack(prevStack => [...prevStack, { screen, params }]);
  };

  // Go back to previous screen
  const goBack = () => {
    if (navigationStack.length > 1) {
      setNavigationStack(prevStack => prevStack.slice(0, -1));
    }
  };

  // Get current screen and params
  const current = navigationStack[navigationStack.length - 1];
  
  // Create navigation context value
  const navigation: NavigationProps = {
    currentScreen: current.screen,
    navigate,
    goBack,
    params: current.params
  };

  // Return the rendered screen with navigation props
  return renderScreen(navigation);
} 