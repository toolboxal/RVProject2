import { WebView } from 'react-native-webview'
import useMyStore from '@/store/store'
import Constants from 'expo-constants'

import { extendedClient } from '@/myDBModule'

const WebMapRender = () => {
  const geoCoords = useMyStore((state) => state.geoCoords)
  const { latitude, longitude } = geoCoords

  const persons = extendedClient.person.useFindMany()

  const markers = persons?.map((person) => {
    const { name, block, unit, category, latitude, longitude } = person

    const popUpContent = `<h3 style='color:#065f46;font-size:15px;line-height:0.1; display:inline-block;padding:0;margin:0'>${name}</h3>
    <p style='color:#065f46;font-size:14px;font-weight:bold; display:inline-block;padding:0;margin:0' >| ${category}</p>
    <hr>
    <p style='color:#065f46;font-size:15px;font-weight:bold; display:inline-block;padding:0;margin:0;line-height:0.5' >Blk${block}</p>
    <p style='color:#065f46;font-size:15px;font-style:italic; display:inline-block;padding:0;margin:0;line-height:0.5'>#${unit}</p>
    `

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
            
        })();
    </script>
</body>
</html>
  `
  return <WebView style={{ height: '100%' }} source={{ html: htmlContent }} />
}
export default WebMapRender
