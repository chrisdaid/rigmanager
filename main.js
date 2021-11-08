"use strict";

const balance = document.getElementById("balance");
const ethPrice = document.getElementById("eth-price");
const avgHash = document.getElementById("avg-hash");
const curHash = document.getElementById("cur-hash");

fetch(
  "https://api.flexpool.io/v2/miner/balance?coin=eth&address=0xD9a5e139741fFfFA0EE1A5D3bdCcD3baf485Adaf"
)
  .then((response) => response.json())
  .then((data) => {
    balance.innerText = truncToFive(data.result.balance / 1000000000000000000);
    ethPrice.innerText = `$${data.result.price}`;
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
