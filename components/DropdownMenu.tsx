import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import uploadRecord from '@/utils/uploadRecord'

type TDropdownMenuProps = {
  handleMenuOpen: () => void
}

const DropdownMenu = ({ handleMenuOpen }: TDropdownMenuProps) => {
  const handleUpload = async () => {
    console.log('pressed handle')
    await uploadRecord()
  }

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.optionBox} activeOpacity={0.9}>
        <Text style={styles.optionText}>Create backup</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity style={styles.optionBox} activeOpacity={0.9}>
        <Text style={styles.optionText}>Restore backup</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity
        style={styles.optionBox}
        activeOpacity={0.9}
        onPress={() => {
          handleUpload()
          handleMenuOpen()
        }}
      >
        <Text style={styles.optionText}>Upload file</Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity
        style={styles.optionBox}
        activeOpacity={0.9}
        onPress={() => {
          router.navigate('/readmePage')
          handleMenuOpen()
        }}
      >
        <Text style={styles.optionText}>Readme</Text>
      </TouchableOpacity>
    </View>
  )
}
export default DropdownMenu

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    borderRadius: 5,
    overflow: 'hidden',
    transform: [{ translateX: -50 }, { translateY: 20 }],
    opacity: 0.95,
  },
  optionBox: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 40,
    backgroundColor: Colors.primary900,
  },
  optionText: {
    fontFamily: 'IBM-SemiBold',
    fontSize: 18,
    color: Colors.white,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.primary500,
  },
})
