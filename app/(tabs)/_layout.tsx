import { Tabs } from 'expo-router'
import { Colors } from '@/constants/Colors'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: Colors.primary700, paddingTop: 15 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              size={30}
              name="map-marked-alt"
              color={`${focused ? Colors.emerald500 : Colors.primary500}`}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recordsPage"
        options={{
          title: 'Records',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              size={35}
              name="folder-open"
              color={`${focused ? Colors.emerald500 : Colors.primary500}`}
            />
          ),
        }}
      />
    </Tabs>
  )
}
export default TabsLayout
