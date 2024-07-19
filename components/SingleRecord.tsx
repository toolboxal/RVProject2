import { Colors } from '@/constants/Colors'
import { Person } from '@prisma/client/react-native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type TProps = {
  item: Person
}

const SingleRecord = (prop: TProps) => {
  const { item } = prop
  const { name, unit, private: isPrivate, remarks, category } = item
  const formattedRemarks =
    remarks.length > 40 ? remarks.slice(0, 42) + '.....' : remarks
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <Text style={styles.houseUnit}>
        {!isPrivate ? `# ${unit}` : `house no. ${unit}`}
      </Text>
      <Text style={styles.textName}>{name}</Text>
      <Text style={styles.textRemarks}>{formattedRemarks}</Text>
      <View
        style={[
          styles.categoryContainer,
          category === 'RV' && { backgroundColor: Colors.emerald300 },
          category === 'BS' && { backgroundColor: Colors.emerald500 },
        ]}
      >
        <Text style={styles.categoryText}>{category}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default SingleRecord

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white,
    marginVertical: 3,
    borderRadius: 8,
    position: 'relative',
  },
  houseUnit: {
    fontFamily: 'IBM-SemiBoldItalic',
    fontSize: 18,
    color: Colors.emerald800,
  },
  textName: {
    fontFamily: 'IBM-SemiBold',
    fontSize: 18,
    color: Colors.primary900,
  },
  textRemarks: {
    fontFamily: 'IBM-Italic',
    fontSize: 16,
    color: Colors.primary900,
  },
  categoryContainer: {
    width: 45,
    height: 45,
    backgroundColor: Colors.emerald100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  categoryText: {
    fontFamily: 'IBM-Medium',
    fontSize: 17,
  },
})
