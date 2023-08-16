import React from 'react';
import DataDisplay from './component/DataDisplay';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <DataDisplay symbol="IBM" />
    </div>
  );
}

export default App;
