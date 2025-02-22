import React from 'react';
import Chart from "react-apexcharts";
import Dropdown from "./Dropdown";

const SalesChart = ({ series, labels, title, height = 380 }) => {
  const pieSalesChart = {
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
        expandOnClick: false,
      },
    },
    chart: {
      type: "donut",
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 6,
        vertical: 3,
      },
    },
    series: series,
    colors:['#072D56','#f1c40f','#8cfc03'],
    labels:  ["Resolved", "In Progress", "Open"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (value) {
          return value;
        },
      },
    },
  };

  return (
    <div className="h-full">
      <div className="card h-full">
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <h5 className=" text-[15px] font-semibold">{title}</h5>
            <div className="h-4">
              <Dropdown />
            </div>
          </div>
          <div style={{ height: `${height}px` }}>
            <Chart
              options={pieSalesChart}
              series={pieSalesChart.series}
              type="donut"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;