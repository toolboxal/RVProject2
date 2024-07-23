import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import { extendedClient } from '@/myDBModule'
import { Alert } from 'react-native'
import { Person } from '@prisma/client/react-native'

const sharePerson = async (personId: number) => {
  try {
    const person = await extendedClient.person.findFirst({
      where: {
        id: personId,
      },
    })
    const { id, ...dataWithoutId } = person as Person
    const jsonData = JSON.stringify(person)

    const fileUri = FileSystem.documentDirectory + `${person!.name}.json`
    await FileSystem.writeAsStringAsync(fileUri, jsonData)

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri)
    } else {
      alert('Sharing is not available on this device')
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('cannot find person to share')
    }
  }
}

export default sharePerson
