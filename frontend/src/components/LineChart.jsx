import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ data, xKey, yKeys, colors }) => {
  const chartData = {
    labels: data.map((item) => item[xKey]),
    datasets: yKeys.map((key, index) => ({
      label: key,
      data: data.map((item) => item[key]),
      borderColor: colors[index],
      borderWidth: 2,
      tension: 0.3,
      fill: false,
    })),
  };

  return <Line data={chartData} />;
};

export default LineChart;
