"use strict";

const balance = document.getElementById("balance");
const ethPrice = document.getElementById("eth-price");
const avgHash = document.getElementById("avg-hash");
const curHash = document.getElementById("cur-hash");
let currentEthPrice = 0;
let currentBalance = 0;

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

const truncToFive = (num) => {
  num = num.toString().split("");
  let indexOfDot = num.indexOf(".");
  let placeholder = Math.trunc(num.join(""));
  placeholder = String(placeholder).split("");
  placeholder.push(num[indexOfDot]);
  placeholder.push(num[indexOfDot + 1]);
  placeholder.push(num[indexOfDot + 2]);
  placeholder.push(num[indexOfDot + 3]);
  placeholder.push(num[indexOfDot + 4]);
  placeholder.push(num[indexOfDot + 5]);
  placeholder.push(num[indexOfDot + 6]);
  return placeholder.join("");
};

fetch(
  "https://api.flexpool.io/v2/miner/balance?coin=eth&address=0xD9a5e139741fFfFA0EE1A5D3bdCcD3baf485Adaf"
)
  .then((response) => response.json())
  .then((data) => {
    currentBalance = truncToFive(data.result.balance / 1000000000000000000);
    balance.innerText = currentBalance;
  });

fetch(
  "https://api.flexpool.io/v2/miner/stats?coin=eth&address=0xD9a5e139741fFfFA0EE1A5D3bdCcD3baf485Adaf"
)
  .then((res) => res.json())
  .then((data) => {
    avgHash.innerHTML = `${truncToTwo(
      (data.result.averageEffectiveHashrate * 1.00001) / 1000000
    )}MH`;
    curHash.innerHTML = `${truncToTwo(
      (data.result.currentEffectiveHashrate * 1.00001) / 1000000
    )}MH`;
  });

// staleShares, validShares, invalidShares

// Set Eth Price (NOMICS API, FLEXPOOL API IS SLOW)

fetch(
  "https://api.nomics.com/v1/currencies/ticker?key=d0a9300b92d3fb893e3ee715908ad2cbd3733fda&ids=BTC,ETH,BNB&interval=1d,30d&convert=USD&per-page=100&page=1"
)
  .then((res) => res.json())
  .then((data) => {
    currentEthPrice = truncToTwo(data[1].price);
    ethPrice.innerText = `$${truncToTwo(data[1].price)}`;
  });

// Eth to USD conversion button

const rate = truncToTwo(currentEthPrice * currentBalance);
const conversionBtn = document.getElementById("conversion-btn");

conversionBtn.classList.toggle("fas-dollar-sign");

conversionBtn.addEventListener("click", () => {
  conversionBtn.classList.toggle("fas");
  conversionBtn.classList.toggle("fa-dollar-sign");
  conversionBtn.classList.toggle("fab");
  conversionBtn.classList.toggle("fa-ethereum");
  if (conversionBtn.classList[1] === "fab") {
    console.log(currentEthPrice);
    balance.textContent = "$" + truncToTwo(currentEthPrice * currentBalance);
  } else if (conversionBtn.classList[1] === "fas") {
    console.log("show eth amount");
    balance.textContent = `${currentBalance}`;
  }
});
