import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ txDatas }) => {
  const data = txDatas || []; // txDatas가 undefined인 경우 빈 배열로 처리
  const series = [
    {
      name: "실거래 가격",
      data: data.map((item) => {
        // dealAmount를 숫자로 변환하고 억 단위로 변환
        const dealAmount = Number(item.dealAmount.replace(/,/g, ""));
        const amountInBillion = (dealAmount / 10000).toFixed(1); // 억 단위로 변환 후 소수점 한 자리까지 유지
        return isNaN(amountInBillion) ? 0 : parseFloat(amountInBillion);
      }),
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
      type: "line", // 차트 타입을 'line'으로 변경
      height: 350,
    },
    xaxis: {
      categories: data.map(
        (item) =>
          `${String(item.dealYear).slice(-2)}.${item.dealMonth}.${item.dealDay}`
      ),
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
      <ReactApexChart
        options={options}
        series={series}
        type="line" // 차트 타입을 'line'으로 설정
        height={350}
      />
    </div>
  );
};

export default Chart;
