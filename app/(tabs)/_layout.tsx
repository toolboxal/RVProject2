import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="recordsPage" />
    </Tabs>
  )
}
export default TabsLayout
