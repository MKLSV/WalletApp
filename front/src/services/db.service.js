import axios from 'axios';

export const dbService = {
  getData,
  updateData,
};
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:5000/api/'


async function getData(dbName) {
  try {
    console.log('h2ere')

    const apiUrl = BASE_URL + 'get-data'
    console.log(apiUrl)
    const response = await axios.get(apiUrl, { params: {dbName} });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching candle data:', error);
  }
}


async function updateData(data) {
  try {
    const apiUrl = BASE_URL + 'update-data'
    console.log(apiUrl)
    await axios.get(apiUrl, { params: data });
    console.log('DATA ADDED')
  } catch (error) {
    console.error('Error fetching candle data:', error);
  }
}


// async function removeData(id, type) {
//   try {
//     const apiUrl = BASE_URL + 'update-data'
//     console.log(apiUrl)
//     await axios.get(apiUrl, { id: id, type: type });
//     console.log('DATA ADDED')
//   } catch (error) {
//     console.error('Error fetching candle data:', error);
//   }
// }
