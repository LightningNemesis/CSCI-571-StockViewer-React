import Table from "react-bootstrap/Table";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackedColumnChart = () => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Recommendation Trends",
    },
    xAxis: {
      categories: ["2023-11", "2023-12", "2024-01", "2024-02"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "# Analysis",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    legend: {
      align: "right",
      x: -30,
      verticalAlign: "top",
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Strong Sell",
        data: [1, 1, 1, 2],
        color: "red",
      },
      {
        name: "Sell",
        data: [13, 13, 13, 13],
        color: "brown",
      },
      {
        name: "Hold",
        data: [21, 24, 22, 19],
        color: "yellow",
      },
      {
        name: "Buy",
        data: [13, 12, 12, 12],
        color: "green",
      },
      {
        name: "Strong Buy",
        data: [1, 2, 3, 4],
        color: "blue",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const EPSChart = () => {
  const options = {
    title: {
      text: "Historical EPS Surprises",
    },
    xAxis: {
      categories: ["2023-03-31", "2023-06-30", "2023-09-30", "2023-12-31"],
    },
    yAxis: {
      title: {
        text: "Quarterly EPS",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      pointFormat:
        "{series.name}: <b>{point.y}</b><br/>Surprise: <b>{point.surprise}</b><br/>",
    },
    series: [
      {
        name: "Actual",
        data: [
          { y: 2.25, surprise: 0.0577 },
          { y: 1.5, surprise: 0.0417 },
          { y: 1.75, surprise: 0.0406 },
          { y: 2.0, surprise: 0.0399 },
        ],
        marker: {
          enabled: true,
          radius: 3,
        },
        lineWidth: 2,
      },
      {
        name: "Estimate",
        data: [2.2, 1.5, 1.6, 1.9], // Dummy data
        marker: {
          enabled: true,
          radius: 3,
        },
        lineWidth: 2,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

function Insights() {
  return (
    <div>
      <Table borderless>
        <thead>
          <tr style={styles.rowStyle}>
            <th>Apple Inc</th>
            <th>MSPR</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.rowStyle}>
            <td>Total</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr style={styles.rowStyle}>
            <td>Positive</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr style={styles.rowStyle}>
            <td>Negative</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>

      <div style={styles.chartContainer}>
        <div style={styles.ChartBox}>
          <StackedColumnChart />
        </div>
        <div style={styles.ChartBox}>
          <EPSChart />
        </div>
      </div>
    </div>
  );
}

export default Insights;

const styles = {
  rowStyle: {
    borderBottom: "1px solid #dee2e6",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  ChartBox: {
    flex: 1,
    display: "flex",
  },
};
