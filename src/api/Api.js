import axios from 'axios';

const API_KEY = 'RIBXT3XYLI69PC0Q';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
