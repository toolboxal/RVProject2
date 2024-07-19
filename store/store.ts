import { create } from 'zustand'

type TAddress = {
  city: string | null
  country: string | null
  district: string | null
  formattedAddress: string | null
  isoCountryCode: string | null
  name: string | null
  postalCode: string | null
  region: string | null
  street: string | null
  streetNumber: string | null
  subregion: string | null
  timezone: string | null
}

type Store = {
  address: TAddress
  geoCoords: {
    latitude: number
    longitude: number
  }
  setAddress: (location: TAddress) => void
  setGeoCoords: (geo: { latitude: number; longitude: number }) => void
}

const initialAddress = {
  city: '',
  country: '',
  district: '',
  formattedAddress: '',
  isoCountryCode: '',
  name: '',
  postalCode: '',
  region: '',
  street: '',
  streetNumber: '',
  subregion: '',
  timezone: '',
}

const useMyStore = create<Store>((set) => ({
  address: initialAddress,
  geoCoords: { latitude: 0, longitude: 0 },
  setAddress: (location) => set({ address: location }),
  setGeoCoords: (geo) => set({ geoCoords: geo }),
}))

export default useMyStore
