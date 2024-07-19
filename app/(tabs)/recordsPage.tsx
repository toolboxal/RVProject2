import {
  View,
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import { extendedClient } from '@/myDBModule'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import ApartmentRadioButtons from '@/components/ApartmentRadioButton'
import { useMemo, useState } from 'react'
import { Person } from '@prisma/client/react-native'
import { FlashList } from '@shopify/flash-list'
import SingleRecord from '@/components/SingleRecord'
import BottomSheet from '@gorhom/bottom-sheet'

const RecordsPage = () => {
  const [isPrivate, setIsPrivate] = useState(false)

  const persons = extendedClient.person.useFindMany()
  const snapPoints = useMemo(() => ['15%', '50%'], [])

  const handleSetPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  // --------data formatting----------
  const selectedGroup = persons.filter((person) => person.private === isPrivate)
  // console.log('selected Group:   ', selectedGroup)

  const categoryMap: { [key: string]: Person[] } = {}

  selectedGroup?.forEach((person) => {
    if (!categoryMap[!isPrivate ? person.block : person.street]) {
      categoryMap[!isPrivate ? person.block : person.street] = []
    }
    categoryMap[!isPrivate ? person.block : person.street].push(person)
  })

  const formattedData = Object.entries(categoryMap).map(([block, person]) => ({
    title: block,
    data: person,
  }))

  const sorted = formattedData.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  )
  const flatMapped = sorted.flatMap((item) => [item.title, ...item.data])

  // console.log('sorted formatted flatmap: ', flatMapped)

  const stickyHeaderIndices = flatMapped
    .map((item, index) => {
      if (typeof item === 'string') {
        return index
      } else {
        return null
      }
    })
    .filter((item) => item !== null) as number[]
  // --------data formatting----------

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
  // console.log(persons)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary50,
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary50,

          width: '100%',
        }}
      >
        <View style={styles.apartmentBtnsContainer}>
          {/* <Text style={defaultStyles.textH2}>Select residence</Text> */}
          <ApartmentRadioButtons
            isPrivate={isPrivate}
            handleSetPrivate={handleSetPrivate}
          />
        </View>
        <FlashList
          data={flatMapped}
          renderItem={({ item }) => {
            if (typeof item === 'string') {
              // Rendering header
              return <Text style={styles.header}>{item}</Text>
            } else {
              // Render item
              return <SingleRecord item={item} />
            }
          }}
          stickyHeaderIndices={stickyHeaderIndices}
          getItemType={(item) => {
            // To achieve better performance, specify the type based on the item
            return typeof item === 'string' ? 'sectionHeader' : 'row'
          }}
          estimatedItemSize={50}
        />
      </View>
      <BottomSheet snapPoints={snapPoints}>
        <View>
          <Text>This is the bottom sheet</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}
export default RecordsPage

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  apartmentBtnsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    backgroundColor: Colors.primary50,
  },
  header: {
    fontFamily: 'IBM-SemiBoldItalic',
    fontSize: 20,
    backgroundColor: Colors.primary800,
    color: Colors.primary50,
    padding: 3,
    paddingLeft: 5,
  },
})
