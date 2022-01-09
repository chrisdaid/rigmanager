import { truncToTwo } from "./truncate.js";

const Chart = window.Chart;

// flexpool function
const showFPChart = (address) => {
  let ctx = document.getElementById("myChart").getContext("2d");
  const reportedHash = [];
  const effectiveHash = [];
  const averageHash = [];
  const times = [];

  let url = `https://api.flexpool.io/v2/miner/chart?coin=eth&address=${address}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //144 items in the array for 10 min intervals, 1440 mins in 1 day
      for (let i = data.result.length - 1; i > 0; i--) {
        let singleItemRepHash = data.result[i].reportedHashrate / 10 ** 6;
        let singleItemEffHash = data.result[i].effectiveHashrate / 10 ** 6;
        let singleItemAvgHash =
          data.result[i].averageEffectiveHashrate / 10 ** 6;
        reportedHash.push(truncToTwo(singleItemRepHash));
        effectiveHash.push(truncToTwo(singleItemEffHash));
        averageHash.push(truncToTwo(singleItemAvgHash));
        data.result[i].timestamp *= 1000;
        let eachTimeMS = data.result[i].timestamp;
        let eachDate = new Date(eachTimeMS);
        let eachTime = eachDate.toString().split(" ")[4];
        let formattedTime = eachTime.split("");
        formattedTime.splice(formattedTime.length - 3, 3);
        times.push(formattedTime.join(""));
      }
    });
  const labels = times;

  const data = {
    labels,
    datasets: [
      {
        data: reportedHash,
        label: "Reported Hash",
        borderColor: "#161e54",
      },
      {
        label: "Effective Hashrate",
        data: effectiveHash,
        borderColor: "#88e0ef",
      },
      {
        label: "Average Hashrate",
        data: averageHash,
        borderColor: "#ff9b6a",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      borderJoinStyle: "round",
      borderWidth: 4,
      lineCap: "square",
      lineTension: 0.5,
      pointStyle: "line",
      pointRadius: 5,
      pointBorderColor: "rgba(0,0,0,0)",
      interaction: {
        intersect: false,
        mode: "index",
      },
      responsive: true,
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              if (value < 1000) {
                return value + "MH";
              } else if (value < 1000000) {
                return value / 1000 + "GH";
              } else {
                return value / 1000000 + "TH";
              }
            },
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, config);
};

// ethermine function
const showEMChart = (address) => {
  let ctx = document.getElementById("myChart").getContext("2d");
  const reportedHash = [];
  const effectiveHash = [];
  const averageHash = [];
  const times = [];

  let url = `https://api.ethermine.org/miner/:${address}/history/`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //144 items in the array for 10 min intervals, 1440 mins in 1 day
      for (let i = 0; i < data.data.length; i++) {
        reportedHash.push(truncToTwo(data.data[i].reportedHashrate / 10 ** 6));
        effectiveHash.push(truncToTwo(data.data[i].currentHashrate / 10 ** 6));
        averageHash.push(truncToTwo(data.data[i].averageHashrate / 10 ** 6));
        // format time and push into array -> into chart labels
        data.data[i].time *= 1000;
        let eachTimeMS = data.data[i].time;
        let eachDate = new Date(eachTimeMS);
        let eachTime = eachDate.toString().split(" ")[4];
        let formattedTime = eachTime.split("");
        formattedTime.splice(formattedTime.length - 3, 3);
        times.push(formattedTime.join(""));
      }
    });
  const labels = times;

  const data = {
    labels,
    datasets: [
      {
        data: reportedHash,
        label: "Reported Hash",
        borderColor: "#161e54",
      },
      {
        label: "Effective Hashrate",
        data: effectiveHash,
        borderColor: "#88e0ef",
      },
      {
        label: "Average Hashrate",
        data: averageHash,
        borderColor: "#ff9b6a",
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      borderJoinStyle: "round",
      borderWidth: 4,
      lineCap: "square",
      lineTension: 0.5,
      responsive: true,
      pointStyle: "line",
      pointRadius: 5,
      pointBorderColor: "rgba(0,0,0,0)",
      interaction: {
        intersect: false,
        mode: "index",
      },
      responsive: true,
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              if (value < 1000) {
                return value + "MH";
              } else if (value < 1000000) {
                return value / 1000 + "GH";
              } else {
                return value / 1000000 + "TH";
              }
            },
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, config);
};

export { showFPChart, showEMChart };
