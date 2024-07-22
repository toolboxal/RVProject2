import { useEffect } from 'react'
import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import getCurrentLocation from '@/utils/getCurrentLoc'
import useMyStore from '@/store/store'
import WebMapRender from '@/components/WebMapRender'
import { Colors } from '@/constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const MapsPage = () => {
  const setAddress = useMyStore((state) => state.setAddress)
  const setGeoCoords = useMyStore((state) => state.setGeoCoords)

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      // let { coords } = await Location.getCurrentPositionAsync({ accuracy: 3 })
      // const { latitude, longitude } = coords

      // const getAddress = await Location.reverseGeocodeAsync({
      //   latitude,
      //   longitude,
      // })
      const { latitude, longitude, getAddress } = await getCurrentLocation()

      setGeoCoords({ latitude, longitude })

      setAddress(getAddress[0])
    }
    getLocationPermission()
  }, [])

  // console.log('zustand address ---> ', address)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.primary700,
        position: 'relative',
      }}
    >
      <StatusBar barStyle={'light-content'} />

      <WebMapRender />

      <View style={{ position: 'absolute', bottom: 40, right: 15, gap: 15 }}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={async () => {
            const { latitude, longitude, getAddress } =
              await getCurrentLocation()
            setGeoCoords({ latitude, longitude })
            setAddress(getAddress[0])
            console.log('refresh geo pressed')
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="navigate" size={26} color={Colors.primary50} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.navigate('/formPage')}
          activeOpacity={0.8}
        >
          <FontAwesome6 name="add" size={26} color={Colors.primary50} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default MapsPage

const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary900,
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
})
