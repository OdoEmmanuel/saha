import ReactApexCharts from "react-apexcharts";

// components
import Dropdown from "./Dropdown";

// data



const TragetChart = ({series,labels,title,name}) => {
  


  const targetChart = {
    chart: {
      height: 349,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
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
    series: [
      {
        name: name,
        data: series,
      },
    ],
    xaxis: {
      categories: labels,
      axisBorder: {
        show: false,
      },
      labels: {
        rotate: -45,
        trim: true,
        minHeight: 100,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.2,
      },
      borderColor: "#f3f4f7",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };
  
  return (
    <div className="col-span-2">
      <div className="card h-full">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h5 className="uppercase">{title}</h5>
            <div className="h-4">
              <Dropdown />
            </div>
          </div>
          <ReactApexCharts
            className="apex-charts"
            options={targetChart}
            series={targetChart.series}
            type="bar"
            height={349}
          />
        </div>
      </div>
    </div>
  );
};

export default TragetChart;
