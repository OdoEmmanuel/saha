import ReactApexCharts from "react-apexcharts";

// components
import Dropdown from "./Dropdown";

// data


const SalesChart = ({series,labels,title}) => {
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
      height: 293,
      type: "donut",
    },
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "left",
      itemMargin: {
        horizontal: 6,
        vertical: 3,
      },
    },
    series: series,
    labels: ["Resolved", "In Progress", "Open", ],
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
          return value  ;
        },
      },
    },
  };
  return (
    <>
      <div className="xl:col-span-2 ">
        <div className="card h-full">
          <div className="p-5">
            <div className="flex items-start justify-between">
              <h5 className="uppercase">{title}</h5>
              <div className="h-4">
                <Dropdown />
              </div>
            </div>
            <ReactApexCharts
              className="apex-charts"
              options={pieSalesChart}
              series={pieSalesChart.series}
              type="donut"
              height={293}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesChart;
