import { Colors } from '@/constants/Colors'
import { extendedClient } from '@/myDBModule'
import { Person } from '@prisma/client/react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'
import Toast from 'react-native-root-toast'

type TRestore = Omit<Person, 'id'>[]

const restoreRecord = async () => {
  const showToast = (name?: string) => {
    Toast.show(`Records restored 👍`, {
      duration: 5000,
      position: 60,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: Colors.emerald100,
      textColor: Colors.primary900,
      opacity: 1,
    })
  }

  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
    })
    if (result.assets === null) {
      throw new Error('failed to open file')
    } else if (result.assets[0].name !== 'rvPalBackup.json') {
      throw new Error(
        'This is not the correct file. File name must be rvPalBackup.json'
      )
    }

    const uri = result.assets[0].uri
    const fileContent = await FileSystem.readAsStringAsync(uri)
    const data: TRestore = JSON.parse(fileContent)
    data.forEach(async (item) => {
      await extendedClient.person.create({
        data: { ...item },
      })
    })

    showToast()
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
    }
  }
}

export default restoreRecord
