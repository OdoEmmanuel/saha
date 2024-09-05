import React from "react";
import ReactApexCharts from "react-apexcharts";
import Dropdown from "./Dropdown";

const TragetChart = ({ series, labels, title, name, series2 }) => {
  const targetChart = {
    chart: {
      height: 350,
      type: "bar",
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ['#2196F3'],
    series: [
      {
        name: 'Volume',
        data: series,
      },
    
    ],
    xaxis: {
      categories: labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: -45,
        trim: true,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Volume',
        style: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right', 
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    grid: {
      borderColor: "#f1f1f1",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full h-full ">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-semibold text-gray-800 uppercase">{title}</h5>
          <div className="h-8">
            <Dropdown />
          </div>
        </div>
        <ReactApexCharts
          options={targetChart}
          series={targetChart.series}
          type="bar"
          height={350}
          className="apex-charts"
        />
      </div>
    </div>
  );
};

export default TragetChart;