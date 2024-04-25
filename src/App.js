// App.js

import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Correct import statement for XLSX
import Chart from './Chart';

const App = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Extract headers
      const sheetHeaders = jsonData[0];
      setHeaders(sheetHeaders);

      // Convert JSON data to array of objects (excluding headers)
      const parsedData = jsonData.slice(1).map(row =>
        sheetHeaders.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {})
      );

      setData(parsedData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {data.length > 0 && <Chart data={data} headers={headers} />}
    </div>
  );
};

export default App;
