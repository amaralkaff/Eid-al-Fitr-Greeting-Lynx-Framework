import type { NavigationProps } from '../navigation/AppNavigator.js';
import '../styles/HomeScreen.css';

export function HomeScreen({ navigation }: { navigation: NavigationProps }) {
  return (
    <view className="home-screen">
      <view className="header">
        <text className="app-title">Eid Mubarak</text>
        <text className="app-subtitle">Greeting Card Maker</text>
      </view>
      
      <view className="eid-graphics">
        <image className="eid-image" src={require('../assets/eid-banner.png')} />
      </view>
      
      <view className="instructions">
        <text className="instruction-title">Create simple Eid greeting cards</text>
        <text className="instruction-text">
          Customize text, colors, and designs to share with friends and family
        </text>
      </view>
      
      <view 
        className="create-button" 
        bindtap={() => navigation.navigate('CreateCard')}
      >
        <text className="button-text">Create New Card</text>
      </view>
      
      <view className="app-branding">
        <text className="copyright">© Eid Greeting Cards App 2025</text>
      </view>
    </view>
  );
} 