const btcPrice = document.getElementById("btc-price");
const ethPrice = document.getElementById("eth-price");
const bnbPrice = document.getElementById("bnb-price");

const truncToTwo = (num) => {
  num = num.toString().split("");
  let indexOfDot = num.indexOf(".");
  let placeholder = Math.trunc(num.join(""));
  placeholder = String(placeholder).split("");
  placeholder.push(num[indexOfDot]);
  placeholder.push(num[indexOfDot + 1]);
  placeholder.push(num[indexOfDot + 2]);
  return placeholder.join("");
};

// 0 is BTC
// 1 is ETH
// 2 is BNB

fetch(
  "https://api.nomics.com/v1/currencies/ticker?key=d0a9300b92d3fb893e3ee715908ad2cbd3733fda&ids=BTC,ETH,BNB&interval=1d,30d&convert=USD&per-page=100&page=1"
)
  .then((response) => response.json())
  .then((data) => {
    btcPrice.innerText = `$${truncToTwo(data[0].price)}`;
    ethPrice.innerText = `$${truncToTwo(data[1].price)}`;
    bnbPrice.innerText = `$${truncToTwo(data[2].price)}`;
  });

function myTimer() {
  fetch(
    "https://api.nomics.com/v1/currencies/ticker?key=d0a9300b92d3fb893e3ee715908ad2cbd3733fda&ids=BTC,ETH,BNB&interval=1d,30d&convert=USD&per-page=100&page=1"
  )
    .then((response) => response.json())
    .then((data) => {
      btcPrice.innerText = `$${truncToTwo(data[0].price)}`;
      ethPrice.innerText = `$${truncToTwo(data[1].price)}`;
      bnbPrice.innerText = `$${truncToTwo(data[2].price)}`;
    });
}
var myVar = setInterval(myTimer, 29800);
