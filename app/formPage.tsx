import Form from '@/components/Form'
import { Colors } from '@/constants/Colors'
import { extendedClient } from '@/myDBModule'
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'

const FormPage = () => {
  // const user = extendedClient.person.useFindFirst({
  //   where: {
  //     id: 1,
  //   },
  // })
  // console.log('users --> ', user)
  // const createUser = () => {
  //   const newUser = {
  //     name: 'User1',
  //     block: '123',
  //     unit: '88-372',
  //     street: 'Paradise Ave5',
  //     remarks: 'testing purpose',
  //     date: '22/07/24',
  //     contact: '73936040',
  //     category: 'RV',
  //     geocoords: 'geotest',
  //     private: false,
  //   }
  //   extendedClient.person.create({
  //     data: newUser,
  //   })
  //   console.log('createUser clicked')
  // }

  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>FormPage</Text>
    //   <Button title="Create New User" onPress={createUser} />
    // </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: Colors.primary50,
      }}
    >
      <StatusBar barStyle={'dark-content'} />

      <Form />
    </KeyboardAvoidingView>
  )
}
export default FormPage
