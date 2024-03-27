import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/stock")(Highcharts);
require("highcharts/indicators/indicators-all")(Highcharts);

function Charts({ historicalData }) {
  const [ohlcData, setOhlcData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    const ohlc = [];
    const volume = [];

    historicalData.results.forEach((item) => {
      ohlc.push([item.t, item.o, item.h, item.l, item.c]);
      volume.push([item.t, item.v]);
    });

    setOhlcData(ohlc);
    setVolumeData(volume);
  }, [historicalData]);

  const groupingUnits = [
    [
      "week", // unit name
      [1], // allowed multiples
    ],
    ["month", [1, 2, 3, 4, 6]],
  ];

  const options = {
    rangeSelector: {
      enabled: true,
      selected: 2,
    },
    navigator: {
      enabled: true, // Make sure the navigator is enabled
    },

    title: {
      text: "AAPL Historical",
    },

    subtitle: {
      text: "With SMA and Volume by Price technical indicators",
    },

    yAxis: [
      {
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],
    tooltip: {
      split: true,
    },

    plotOptions: {
      series: {
        dataGrouping: {
          units: groupingUnits,
        },
      },
    },

    series: [
      {
        type: "candlestick",
        name: "AAPL",
        id: "aapl",
        zIndex: 2,
        data: ohlcData,
      },
      {
        type: "column",
        name: "Volume",
        id: "volume",
        data: volumeData,
        yAxis: 1,
      },
      {
        type: "vbp",
        linkedTo: "aapl",
        params: {
          volumeSeriesID: "volume",
        },
        dataLabels: {
          enabled: false,
        },
        zoneLines: {
          enabled: false,
        },
      },
      {
        type: "sma",
        linkedTo: "aapl",
        zIndex: 1,
        marker: {
          enabled: false,
        },
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
export default Charts;
