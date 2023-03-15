import React from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = ({ data }) => {
  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false, // hides the download button
      },
    },
    colors: ["#B39DDB"], // sets the color of the bars to purple
    xaxis: {
      categories: data.map((d) => d.category),
    },
  };

  const series = [
    {
      name: "Sales",
      data: data.map((d) => d.sales),
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default BarGraph;
