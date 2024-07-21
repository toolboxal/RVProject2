import { useEffect, useState } from 'react'
import { View, Text, Button, StatusBar, SafeAreaView } from 'react-native'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import useMyStore from '@/store/store'
import { extendedClient } from '@/myDBModule'

import WebMapRender from '@/components/WebMapRender'
import { Colors } from '@/constants/Colors'

const MapsPage = () => {
  const setAddress = useMyStore((state) => state.setAddress)
  const address = useMyStore((state) => state.address)
  const setGeoCoords = useMyStore((state) => state.setGeoCoords)

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      let { coords } = await Location.getCurrentPositionAsync({ accuracy: 3 })
      const { latitude, longitude } = coords

      const getAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

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
      }}
    >
      <StatusBar barStyle={'light-content'} />

      <WebMapRender />
      {/* <View style={{ backgroundColor: 'green', flex: 1 }}></View> */}
    </SafeAreaView>
  )
}
export default MapsPage
