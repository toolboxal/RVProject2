import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Colors } from '@/constants/Colors'
import ApartmentRadioButtons from './ApartmentRadioButton'
import { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import TextInputComponent from './TextInputComponent'
import FontAwesome from '@expo/vector-icons/FontAwesome6'
import useMyStore from '@/store/store'
import getTimeDate from '../utils/getTimeDate'
import { Person } from '@prisma/client/react-native'
import CustomRadioButtons from './CustomRadioButton'

type TFormData = Omit<
  Person,
  'id' | 'category' | 'private' | 'latitude' | 'longitude'
>

const Form = () => {
  const [isPrivate, setIsPrivate] = useState(false)
  const [category, setCategory] = useState('CA')
  const geoCoords = useMyStore((state) => state.geoCoords)
  const address = useMyStore((state) => state.address)
  const { todayDate } = getTimeDate()

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      block: '',
      unit: '',
      street: '',
      name: '',
      contact: '',
      date: todayDate,
      remarks: '',
    },
  })
  console.log('private-->', isPrivate)
  console.log('type -->', category)

  const { isoCountryCode, street, streetNumber } = address
  const displayBlock = streetNumber?.split(' ')[1]
  if (!isPrivate && isoCountryCode === 'SG') {
    setValue('block', displayBlock as string)
    setValue('unit', '')
    setValue('street', street ?? '')
  } else if (isPrivate && isoCountryCode === 'SG') {
    setValue('block', '')
    setValue('unit', displayBlock || (streetNumber ?? ''))
    setValue('street', street ?? '')
  }

  const submitPressed = (data: TFormData) => {
    console.log('pressed')
    const toUpperBlock = data.block.toUpperCase()
    const fullData = {
      ...data,
      category,
      block: toUpperBlock,
      private: isPrivate,
      latitude: geoCoords.latitude,
      longitude: geoCoords.longitude,
    }
    console.log('full data to submit -->', fullData)
  }

  const handleSetPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary50,
      }}
    >
      <View style={styles.apartmentBtnsContainer}>
        <Text style={defaultStyles.textH2}>Choose type of residence</Text>
        <ApartmentRadioButtons
          isPrivate={isPrivate}
          handleSetPrivate={handleSetPrivate}
        />
      </View>

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.twoColumnsContainer}>
          {!isPrivate && (
            <Controller
              control={control}
              name="block"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInputComponent
                  value={value.toUpperCase()}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  label="blk"
                  placeholderText="blk no."
                  extraStyles={{ width: 110 }}
                />
              )}
            />
          )}

          <Controller
            control={control}
            name="unit"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInputComponent
                value={value.toUpperCase()}
                onChangeText={onChange}
                onBlur={onBlur}
                label={`${!isPrivate ? 'unit' : 'house no.'}`}
                placeholderText="blk no."
                extraStyles={{ width: 110 }}
              />
            )}
          />
        </View>
        <Controller
          control={control}
          name="street"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInputComponent
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="street"
              placeholderText="kingdom ave."
              extraStyles={{ width: '100%' }}
            />
          )}
        />
        <View style={styles.twoColumnsContainer}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInputComponent
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="name"
                placeholderText="nicodemus"
                extraStyles={{ width: 175 }}
              />
            )}
          />
          <Controller
            control={control}
            name="contact"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInputComponent
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="contact"
                placeholderText="hp no."
                extraStyles={{ width: 140 }}
              />
            )}
          />
        </View>
        <Controller
          control={control}
          name="remarks"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInputComponent
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              label="remarks"
              placeholderText="....."
              extraStyles={{
                width: '100%',
                height: 140,
              }}
              multiline={true}
            />
          )}
        />
        <View style={styles.twoColumnsContainer}>
          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInputComponent
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="date"
                placeholderText=""
                extraStyles={{ width: 130 }}
              />
            )}
          />
        </View>
        <CustomRadioButtons setSelected={setCategory} selected={category} />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSubmit(submitPressed)}
          activeOpacity={0.8}
        >
          <FontAwesome name="check" size={22} color={Colors.white} />
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
export default Form

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  apartmentBtnsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    backgroundColor: Colors.primary50,
  },
  twoColumnsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 7,
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  buttonStyle: {
    width: '100%',
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    marginTop: 18,
    marginBottom: 130,
    backgroundColor: Colors.primary900,
  },
  buttonText: {
    fontFamily: 'IBM-SemiBold',
    fontSize: 18,
    color: Colors.white,
  },
})
