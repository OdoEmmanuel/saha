import React from 'react';
import { Link } from 'react-router-dom';
import ReactApexCharts from 'react-apexcharts';
import { UilEllipsisV } from '@iconscout/react-unicons';

const RevenueChart = ({ series, labels, title, name, set }) => {
  const revenueChart = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 4,
      colors: ['#008FFB'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    series: [
      {
        name: 'Revenue',
        data: series,
      },
    ],
    colors: ['#008FFB'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
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
        trim: set,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toLocaleString('en-US', {
         
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        },
      },
      title: {
        text: 'Revenue',
        style: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val.toLocaleString('en-US', {
          
          });
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full w-full">
      <div className="overflow-hidden p-6">
        <div className="flex items-center justify-between pb-4 overflow-hidden">
          <h5 className="text-xl font-semibold text-gray-800 uppercase">{title}</h5>
          <div className="relative">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <UilEllipsisV size={20} />
            </button>
            {/* Dropdown menu (hidden by default) */}
            <div className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              {['Today', '7 Days', '15 Days', '1 Month', '6 Months', '1 Year'].map((period) => (
                <Link
                  key={period}
                  to=""
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {period}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <ReactApexCharts
          options={revenueChart}
          series={revenueChart.series}
          type="area"
          height={350}
          className="apex-charts"
        />
      </div>
    </div>
  );
};

export default RevenueChart;