import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import { initializeDb } from '@/myDBModule'
import { Text } from 'react-native'
import { Colors } from '@/constants/Colors'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    ' SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'IBM-Light': require('../assets/fonts/IBMPlexSans-Light.ttf'),
    'IBM-LightItalic': require('../assets/fonts/IBMPlexSans-LightItalic.ttf'),
    'IBM-Regular': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
    'IBM-Medium': require('../assets/fonts/IBMPlexSans-Medium.ttf'),
    'IBM-SemiBold': require('../assets/fonts/IBMPlexSans-SemiBold.ttf'),
    'IBM-Bold': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDb()
        console.log('DB initialize')
      } catch (error) {
        console.log('initialize DB error -->', error)
      }
      setIsLoading(false)
    }
    setup()
  }, [])

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }
  if (isLoading) {
    return <Text>Data loading....</Text>
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="formPage"
        options={{
          presentation: 'card',
          // gestureEnabled: false,
          headerShown: true,
          headerTitle: 'Create New Record',
          headerTitleStyle: {
            fontFamily: 'IBM-Regular',
            color: Colors.primary600,
            fontSize: 22,
          },
          headerBackTitle: 'Back',
          headerBackTitleStyle: {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: Colors.primary50,
          },
          headerTintColor: Colors.primary600,
        }}
      />
    </Stack>
  )
}

export default RootLayout
