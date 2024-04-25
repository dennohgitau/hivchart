// Chart.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data, headers }) => {
  const yearIndex = headers.indexOf('Year'); // Find the index of the 'Year' column

  // Extract data for the x-axis labels and y-axis values
  const labels = data.map(item => item[yearIndex]);
  const values = data.map(item => item[headers.indexOf('Value')]);

  const chartData = {
    labels: labels, // Use the 'Year' column for x-axis labels
    datasets: [{
      label: 'Value',
      data: values, // Use the 'Value' column for y-axis values
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
