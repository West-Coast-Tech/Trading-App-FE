import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)'],
    borderWidth: 1,
  }],
};

const PieChartComponent = () => {
  return (
    <>
      <h1>Pie Chart</h1>
      <Pie data={data} />
    </>
  );
};

export default PieChartComponent;