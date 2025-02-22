import React from 'react';
import { Link } from 'react-router-dom';
import ReactApexCharts from 'react-apexcharts';
import { UilEllipsisV } from '@iconscout/react-unicons';

const RevenueChart = ({ series, labels, title, name, set }) => {
  const revenueChart = {
    chart: {
      height: '100%',
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
    // markers: {
    //   size: 4,
    //   colors: ['#008FFB'],
    //   strokeColors: '#fff',
    //   strokeWidth: 2,
    //   hover: {
    //     size: 7,
    //   }
    // },
    series: [
      {
        name: 'Revenue',
        data: series,
      },
    ],
    colors: ['#002853'],
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
        
        style: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      pCreateing: {
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
   <>
   
   <ReactApexCharts
          options={revenueChart}
          series={revenueChart.series}
          type="area"
          height={350}
          className="apex-charts"
        />
   </>
  );
};

export default RevenueChart;