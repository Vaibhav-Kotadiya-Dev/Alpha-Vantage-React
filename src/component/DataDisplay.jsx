import React, { useState, useEffect, useMemo } from 'react';
import { fetchData } from '../api/Api';

const DataDisplay = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const responseData = await fetchData(symbol);
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndSetState();
  }, [symbol]);

  const rowsData = useMemo(() => {
    let rows = [];
    if (data) {
      if (!data?.hasOwnProperty('Note')) {
        const timeSeries = data['Time Series (Daily)'];
        rows = Object.keys(timeSeries)?.map((date) => ({
          date,
          open: timeSeries[date]['1. open'],
          high: timeSeries[date]['2. high'],
          low: timeSeries[date]['3. low'],
          close: timeSeries[date]['4. close'],
          volume: timeSeries[date]['5. volume'],
        }));
      }
    }

    return rows;
  }, [data])

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!rowsData?.length) {
    return <div>Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 100 calls per day. Please try after some time!</div>
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className='flex justify-center font-bold mb-10'>{`Symbol - ${symbol}`}</div>
      <table className="w-full border-collapse table-auto">
        <thead className="text-gray-800">
          <tr>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Open</th>
            <th className="py-2 px-4">High</th>
            <th className="py-2 px-4">Low</th>
            <th className="py-2 px-4">Close</th>
            <th className="py-2 px-4">Volume</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {
            rowsData?.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4">{row.date}</td>
                <td className="py-2 px-4">{row.open}</td>
                <td className="py-2 px-4">{row.high}</td>
                <td className="py-2 px-4">{row.low}</td>
                <td className="py-2 px-4">{row.close}</td>
                <td className="py-2 px-4">{row.volume}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
