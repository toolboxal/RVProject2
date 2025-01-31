import { WebView } from 'react-native-webview'
import useMyStore from '@/store/store'
import { extendedClient } from '@/myDBModule'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import getCurrentLocation from '@/utils/getCurrentLoc'
import { useRef } from 'react'

const WebMapRender = () => {
  const setAddress = useMyStore((state) => state.setAddress)
  const setGeoCoords = useMyStore((state) => state.setGeoCoords)
  const geoCoords = useMyStore((state) => state.geoCoords)
  const { latitude, longitude } = geoCoords
  const webRef = useRef<WebView>(null)

  // console.log('webMap rerender!!!')

  const persons = extendedClient.person.useFindMany()

  const markers = persons?.map((person) => {
    const {
      name,
      block,
      unit,
      street,
      category,
      latitude,
      longitude,
      private: isPrivate,
    } = person

    const publicResident = `<h3 style='color:#065f46;font-size:15px;line-height:0.1; display:inline-block;padding:0;margin:0'>${name}</h3>
    <p style='color:#065f46;font-size:14px;font-weight:bold; display:inline-block;padding:0;margin:0' >| ${category}</p>
    <hr>
    <p style='color:#065f46;font-size:15px;font-weight:bold; display:inline-block;padding:0;margin:0;line-height:0.5' >Blk${block}</p>
    <p style='color:#065f46;font-size:15px;font-style:italic; display:inline-block;padding:0;margin:0;line-height:0.5'>#${unit}</p>
    `
    const privateResidence = `<h3 style='color:#065f46;font-size:15px;line-height:0.1; display:inline-block;padding:0;margin:0'>${name}</h3>
    <p style='color:#065f46;font-size:14px;font-weight:bold; display:inline-block;padding:0;margin:0' >| ${category}</p>
    <hr>
    <p style='color:#065f46;font-size:15px;font-style:italic; display:inline-block;padding:0;margin:0;line-height:0.5'>${unit}</p>
    <p style='color:#065f46;font-size:15px;font-style:italic; display:inline-block;padding:0;margin:0;line-height:0.5'>${street}</p>
    `

    const popUpContent = isPrivate ? privateResidence : publicResident

    return { popUpContent, latitude, longitude }
  })

  const markersJSON = JSON.stringify(markers)

  const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaflet Map</title>
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        body, html, #map { height: 100%; margin: 0; padding: 0; }
        .leaflet-popup-content-wrapper {
        background: #ecfdf5; 
        color: #333; 
        border-radius: 8px; 
        padding: 1px; 
        }
        .leaflet-popup-tip {
        background: #ecfdf5; 
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        (function() {
            const map = L.map('map').setView([${latitude}, ${longitude}], 18);
            
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

           
            const currentLocIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<span class='material-icons' style='font-size:30px;color:#f43f5e;'>my_location</span>",
            iconSize: [30, 30],
            iconAnchor: null,
            popupAnchor: [0,-20]
            });

            const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<span class='material-icons' style='font-size:45px;color:#5d3ff4;'>location_on</span>",
            iconSize: [40, 40],
            iconAnchor: null,
            popupAnchor: [0,-20]
            });

            L.marker([${latitude}, ${longitude}], {icon:currentLocIcon}).addTo(map)
                .bindPopup('You are here')

            const markers = ${markersJSON};

            const markersGroup = L.markerClusterGroup();

      

            markers?.forEach((marker) => {
              const mark = L.marker([marker.latitude, marker.longitude], {
                icon: customIcon,
              }).bindPopup(marker.popUpContent)
              markersGroup.addLayer(mark)
            })
            map.addLayer(markersGroup)

            function refocusMap(latitude, longitude) {
            map.setView([latitude, longitude], 18);
            }

            window.addEventListener('message', function(event) {
            var data = JSON.parse(event.data);
            if (data.type === 'REFOCUS') {
                refocusMap(data.lat, data.lng);
            }
            });

            
        })();
    </script>
</body>
</html>
  `

  const handleRefreshNavigation = async () => {
    const { latitude, longitude, getAddress } = await getCurrentLocation()
    setGeoCoords({ latitude, longitude })
    setAddress(getAddress[0])
    if (webRef.current) {
      webRef.current.postMessage(
        JSON.stringify({
          type: 'REFOCUS',
          lat: latitude,
          lng: longitude,
        })
      )
    }
  }
  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <WebView
        style={{ height: '100%' }}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        ref={webRef}
        startInLoadingState
        renderLoading={() => (
          <View style={{ height: '100%' }}>
            <ActivityIndicator
              size={'large'}
              color={Colors.emerald500}
              style={{ height: '100%' }}
            />
          </View>
        )}
      />
      <View style={{ position: 'absolute', bottom: 40, right: 15, gap: 15 }}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleRefreshNavigation}
          activeOpacity={0.8}
        >
          <Ionicons name="navigate" size={26} color={Colors.primary50} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.navigate('/formPage')}
          activeOpacity={0.8}
        >
          <FontAwesome6 name="add" size={26} color={Colors.primary50} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default WebMapRender

const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary900,
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
})
