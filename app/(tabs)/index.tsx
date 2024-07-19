import { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import useMyStore from '@/store/store'
import { extendedClient } from '@/myDBModule'

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

  console.log('zustand address ---> ', address)
  const persons = extendedClient.person.useFindMany()
  if (persons.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>MapsPage</Text>
        <Button
          title="To FormPage"
          onPress={() => router.navigate('/formPage')}
        />
      </View>
    )
  console.log(persons)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {persons.map((person) => (
          <View key={person.id}>
            <Text>{person.name}</Text>
          </View>
        ))}
      </Text>
      <Button
        title="To FormPage"
        onPress={() => router.navigate('/formPage')}
      />
    </View>
  )
}
export default MapsPage
