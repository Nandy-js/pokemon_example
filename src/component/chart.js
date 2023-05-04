import { useState } from "react";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Chart({ base }) {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: base,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["base 1", "base 2", "base 3", "base 4"],
      },
    },
  });

  return (
    <div className="chartMain">
      <h1 className="chart">Bar Chart</h1>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}
