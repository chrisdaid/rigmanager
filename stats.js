const btcPrice = document.getElementById("btc-price");
const ethPrice = document.getElementById("eth-price");
const bnbPrice = document.getElementById("bnb-price");

// fetch(
//   "https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=c9d8dc26330bd91ac5d38d8a3dc0aa84862ed6a849d6dc80654a053f25fd"
// ).then((gas) => gas.json());
// .then((price) => console.log(price.fast))

var timeleft = 960;
var downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
  }
  document.getElementById("progressBar").value = 960 - timeleft;
  timeleft -= 1;
}, 31.25);

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data[0].current_price);
    ethPrice.innerText = `$${data[0].current_price}`;
  });

function myTimer() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.ethereum.usd);
      ethPrice.innerText = `$3${data.ethereum.usd}`;
    });
}

var myVar = setInterval(myTimer, 30000);
