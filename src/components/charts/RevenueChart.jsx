import { Link } from 'react-router-dom'
import ReactApexCharts from 'react-apexcharts'

// data

// icons
import { UilEllipsisV } from '@iconscout/react-unicons'

const RevenueChart = ({series,labels,title,name,set}) => {
  
  const revenueChart = {

    chart: {
      height: 329,
      type: 'area',
      toolbar: {
        show: false,
      },
      redrawOnParentResize: true, // Ensure the chart is redrawn if its parent size changes
      redrawOnWindowResize: true, // Ensure the chart is redrawn if the window size changes
      animations: {
        enabled: false, // Disable animations for better performance
      },
      // Add margin configuration
      margin: {
        left: 50, // Adjust the left margin as needed
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    markers: {
      size: 0,
  },
  
    series: [
      {
        name: 'Revenue',
        data: series,
      },
    ],
    legend: {
      show: false,
    },
    colors: ['#43d39e'],
    xaxis: {
      tooltip: {
        enabled: false,
      },
      categories: labels,
      axisBorder: {
        show: false,
      },
      labels: {
        rotate: -45, // Rotate labels for better readability
        trim: set, // Trim labels if they don't fit
        minHeight: 60, // Set minimum height for labels
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  };
  
  return (
    <>
      <div className="xl:col-span-2 w-full">
        <div className="card h-full lg:w-full w-full">
          <div className="p-6">
            <div className="flex items-center justify-between pb-3">
              <h5 className="uppercase">{title}</h5>
              <div className="h-4">
                <div className="hs-dropdown relative inline-flex [--placement:left-top] rtl:[--placement:right-top]">
                  <button type="button" className="hs-dropdown-toggle  rounded">
                    <UilEllipsisV size={16} />
                  </button>
                  <div className="hs-dropdown-menu transition-[opacity,margin] w-40 duration hs-dropdown-open:opacity-100 opacity-0 z-10 bg-white shadow rounded dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-600 hidden">
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      to=""
                    >
                      Today
                    </Link>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      to=""
                    >
                      7 Days
                    </Link>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      to=""
                    >
                      15 Days
                    </Link>
                    <hr className="my-2 dark:border-gray-600" />
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      to=""
                    >
                      1 Months
                    </Link>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      to=""
                    >
                      6 Months
                    </Link>
                    <hr className="my-2 dark:border-gray-600" />
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      to=""
                    >
                      1 Year
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <ReactApexCharts
              className="apex-charts"
              options={revenueChart}
              series={revenueChart.series}
              type="area"
              height={329}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RevenueChart
