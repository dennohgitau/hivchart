// Chart.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data, headers }) => {
  const chartData = {
    labels: data.map(item => item[headers[6]]), // Assuming the Year column is for x-axis labels
    datasets: [{
      label: 'Value',
      data: data.map(item => item[headers[9]]), // Assuming the 'Value' column is at index 9
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'year',
        },
        scaleLabel: {
          display: true,
          labelString: 'Year',
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      }],
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
