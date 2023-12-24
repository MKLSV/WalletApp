import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.font.size = 50;

export function PieChart({spendsCount}) {
  const data = {
    labels: ['Доходы', 'Расходы'],
    datasets: [
      {
        data: [10000, spendsCount],
        backgroundColor: [
            'rgba(7, 237, 114, 0.714)',
            'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
            'rgba(7, 237, 114, 1)',
            'rgba(255, 99, 132, 1)',
        ],
        color: "#ffffff",
        borderWidth: 2,
      },
    ],
  };



  return <Pie data={data} className='chart' />;
}
