import { Colors } from '@/constants/Colors'
import { extendedClient } from '@/myDBModule'
import { printToFileAsync } from 'expo-print'
import * as Sharing from 'expo-sharing'
import { Alert } from 'react-native'

const generatePDF = async () => {
  try {
    const allRecords = await extendedClient.person.findMany()
    const dataWithoutId = allRecords.map((record) => {
      const { id, ...restOfData } = record
      return restOfData
    })
    const tableRowsString = dataWithoutId
      .map((item) => {
        const tableRow = `
        <tr>
            <td>${item.name}</d>
            <td>${item.category}</d>
            <td>${item.block}</d>
            <td>${item.unit}</d>
            <td>${item.street}</d>
            <td>${item.contact}</d>
            <td>${item.date}</d>
            <td>${item.remarks}</d>
        </tr>
        `
        return tableRow
      })
      .join('')

    console.log(tableRowsString)
    const tableHeader = `<tr>
    <th>Name</th>
    <th>Category</th>
    <th>Block</th>
    <th>Unit</th>
    <th>Street</th>
    <th>Contact</th>
    <th>Date</th>
    <th>Remarks</th>
    </tr>`
    const tableHTML = `
    <html>
    <head>
      <title>RVPal Records PDF</title>
    </head>
      <body>
        <h1 style="color:#047857;" >All Records</h1>
        <table border="1" cellpadding="5" style="border-collapse: collapse;">
            ${tableHeader}
            ${tableRowsString}
        </table>
      </body>
    </html>
    `
    // const fileUri = FileSystem.documentDirectory + `${person!.name}.json`
    const file = await printToFileAsync({
      base64: false,
      html: tableHTML,
    })
    await Sharing.shareAsync(file.uri)
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Unable to generate PDF')
    }
  }
}

export default generatePDF
