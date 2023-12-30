import axios from 'axios';

export const dbService = {
  getData,
  addData,
  updateData,
};
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:5000/api/'


async function getData(dbName) {
  try {
    const apiUrl = BASE_URL + 'get-data'
    const response = await axios.get(apiUrl, { params: {dbName} });
    return response.data
  } catch (error) {
    console.error('Error fetching candle data:', error);
  }
}

async function addData(dbName, data) {
  try {
    const apiUrl = BASE_URL + 'add-data'
    const response = await axios.get(apiUrl, { params: {dbName, data} });
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
