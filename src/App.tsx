import { useEffect } from '@lynx-js/react'
import './App.css'
import { AppNavigator, type NavigationProps } from './navigation/AppNavigator.js'
import { HomeScreen } from './screens/HomeScreen.js'
import { CreateCardScreen } from './screens/CreateCardScreen.js'
import { PreviewScreen } from './screens/PreviewScreen.js'
import { requestStoragePermission } from './utils/AndroidPermissions.js'

export function App() {
  useEffect(() => {
    console.info('Eid Greeting Cards App Started')
    
    // Request storage permission on app start
    const requestPermissions = async () => {
      try {
        const storagePermissionGranted = await requestStoragePermission()
        console.info('Storage permission granted:', storagePermissionGranted)
      } catch (err) {
        console.error('Error requesting permissions:', err)
      }
    }
    
    requestPermissions()
  }, [])

  // Render the appropriate screen based on navigation state
  const renderScreen = (navigation: NavigationProps) => {
    switch (navigation.currentScreen) {
      case 'Home':
        return <HomeScreen navigation={navigation} />
      case 'CreateCard':
        return <CreateCardScreen navigation={navigation} />
      case 'Preview':
        return <PreviewScreen navigation={navigation} />
      default:
        return <HomeScreen navigation={navigation} />
    }
  }

  return (
    <AppNavigator renderScreen={renderScreen} />
  )
}
