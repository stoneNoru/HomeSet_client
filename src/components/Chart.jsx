import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// const data = [
//   { month: "January", revenue: 12000 },
//   { month: "February", revenue: 18000 },
//   { month: "March", revenue: 20000 },
//   { month: "April", revenue: 15000 },
//   { month: "May", revenue: 25000 },
// ];
let data = [];

const Chart = ({ txDatas }) => {
  //{ data, series }
  data = txDatas;
  const series = [
    {
      name: "실거래 가격",
      data: data.map((item) => item.dealAmount),
    },
  ];

  const options = {
    theme: {
      mode: "dark",
    },
    colors: ["#FF1654", "#247BA0"],
    stroke: {
      width: 5,
      curve: "smooth",
    },
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: data.map((item) => `${String(item.dealYear).slice(-2)}.${item.dealMonth}.${item.dealDay}`),
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    chart: {
      toolbar: {
        show: false,
      },

      background: "#302f2f",
    },
  };
  return (
    <div style={{ width: "50%", height: "30%" }}>
      <ReactApexChart options={options} series={series} />
    </div>
  );
};

export default Chart;
