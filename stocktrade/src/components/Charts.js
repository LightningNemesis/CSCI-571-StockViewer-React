import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/stock")(Highcharts);

const ohlcData = [
  [Date.UTC(2023, 4, 1), 170.0, 180.3, 169.7, 178.5], // [timestamp, open, high, low, close]
  [Date.UTC(2023, 4, 2), 178.5, 179.5, 176.4, 177.6],
  [Date.UTC(2023, 4, 3), 177.6, 180.0, 177.0, 179.4],
  [Date.UTC(2023, 4, 4), 179.4, 181.1, 178.4, 180.0],
  [Date.UTC(2023, 4, 5), 180.0, 183.2, 179.1, 182.3],
  // Add more data points as needed
];

// Dummy data for the volume series
const volumeData = [
  [Date.UTC(2023, 4, 1), 403142390], // [timestamp, volume]
  [Date.UTC(2023, 4, 2), 358123200],
  [Date.UTC(2023, 4, 3), 371233490],
  [Date.UTC(2023, 4, 4), 312123490],
  [Date.UTC(2023, 4, 5), 411123490],
  // Add more data points as needed
];

const options = {
  chart: {
    type: "column", // For the volume bars
  },
  title: {
    text: "AAPL Historical",
  },
  yAxis: [
    {
      // Primary yAxis for the OHLC
      title: {
        text: "OHLC",
      },
      height: "60%", // Adjust as needed
    },
    {
      // Secondary yAxis for the Volume
      title: {
        text: "Volume",
      },
      top: "65%",
      height: "35%",
      offset: 0,
    },
  ],
  series: [
    {
      name: "AAPL",
      type: "candlestick",
      data: ohlcData,
    },
    {
      name: "Volume",
      type: "column",
      data: volumeData,
      yAxis: 1,
    },
  ],
  // Add other necessary options
};

function Charts() {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
export default Charts;
