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
      // console.log(data.result[0].reportedHashrate);
      for (let i = data.result.length - 1; i > 0; i--) {
        reportedHash.push(data.result[i].reportedHashrate / 10 ** 6);
        effectiveHash.push(data.result[i].effectiveHashrate / 10 ** 6);
        averageHash.push(data.result[i].averageEffectiveHashrate / 10 ** 6);
        times.push(Math.floor(data.result[i].timestamp / 100));
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
              return value + "MH";
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
        reportedHash.push(data.data[i].reportedHashrate / 10 ** 6);
        effectiveHash.push(data.data[i].currentHashrate / 10 ** 6);
        averageHash.push(data.data[i].averageHashrate / 10 ** 6);
        times.push(Math.floor(data.data[i].time));
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
              return value + "MH";
            },
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, config);
};

export { showFPChart, showEMChart };
