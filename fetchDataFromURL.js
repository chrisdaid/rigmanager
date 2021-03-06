import { truncToTwo, truncToFive } from "./truncate.js";
import { showFPChart, showEMChart } from "./chart.js";
const url = window.location.href;
const queryStr = url.split("?")[1];
if (!queryStr) {
  console.error("no pool/address selected");
} else {
  const usp = new URLSearchParams(queryStr);
  const pool = usp.get("pool");
  let address = usp.get("address");

  /////////////////////////////////////////////
  // Change the address text to the submitted address
  const addressText = document.querySelector(".address");
  addressText.textContent = address;
  /////////////////////////////////////////////
  // Make copy address button work
  const copyBtn = document.querySelector(".copy-btn");
  const copyBtnTooltip = document.querySelector(".copy-btn-tt");
  copyBtn.addEventListener("click", () => {
    if (address[0] !== "0" && address[1] !== "x") {
      address = "0x" + address;
    }
    navigator.clipboard.writeText(address);
    copyBtnTooltip.innerText = "Copied";
  });
  /////////////////////////////////////////////
  // Set gas price from gasprice.io API
  const gasPrice = document.getElementById("gas-price");
  fetch("https://api.gasprice.io/v1/estimates")
    .then((res) => res.json())
    .then((data) => {
      gasPrice.innerText = Math.ceil(data.result.baseFee);
    });
  /////////////////////////////////////////////
  // Change the 'View miner on __pool__ ' link
  const link = document.querySelector(".bottom-of-card").querySelector("a");
  const linkText = document.getElementById("pool-link-text");

  const poolText = document.getElementById("pool-name");
  const balance = document.getElementById("balance");
  const ethPrice = document.getElementById("eth-price");

  let currentEthPrice = 0;
  let currentBalance = 0;

  const curHash = document.getElementById("cur-hash");
  let currentHashrate = 0;
  const avgHash = document.getElementById("avg-hash");
  let averageHashrate = 0;
  const repHash = document.getElementById("rep-hash");
  let reportedHashrate = 0;

  // NOT Flexpool API => Coinbase PRO API fetch ETH Price

  async function fetchEthPrice() {
    let response = await fetch(
      "https://api.pro.coinbase.com/products/ETH-USD/ticker"
    );
    return response.json();
  }
  fetchEthPrice().then((jsonData) => {
    currentEthPrice = jsonData.price;
    ethPrice.innerText = `$${jsonData.price}`;
  });

  if (pool == "flexpool") {
    // set pool text to Flexpool
    poolText.innerText = "Flexpool";
    // view miner link
    link.href = `https://flexpool.io/miner/eth/${address}`;
    linkText.innerText = "Flexpool";
    // set chart
    showFPChart(address);
    // fetch flexpool data for balance and set estimated earnings <----- NOT IMPLEMENTED YET *******
    fetch(
      `https://api.flexpool.io/v2/miner/balance?coin=eth&address=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.balance === 0) {
          balance.innerText = currentBalance;
        } else {
          currentBalance = truncToFive(data.result.balance / 10 ** 18);
          balance.innerText = currentBalance;
        }
      });
    // fetch flexpool data for hashrate
    fetch(`https://api.flexpool.io/v2/miner/stats?coin=eth&address=${address}`)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.result.averageEffectiveHashrate === 0 &&
          data.result.currentEffectiveHashrate === 0 &&
          data.result.reportedHashrate === 0
        ) {
          avgHash.innerText = "0MH";
          curHash.innerText = "0MH";
          repHash.innerText = "OMH";
          // once all data is loaded, fade in the content
          document.querySelector("main").classList.add("fade-in");
          document.querySelector("main").style.visibility = "visible";
        } else {
          // average hash
          averageHashrate = hashrateCalc(data.result.averageEffectiveHashrate);
          avgHash.innerText = averageHashrate;
          // current hash
          currentHashrate = hashrateCalc(data.result.currentEffectiveHashrate);
          curHash.innerText = currentHashrate;
          // reported hash
          reportedHashrate = hashrateCalc(data.result.reportedHashrate);
          repHash.innerText = reportedHashrate;
          // once all data is loaded, fade in the content
          document.querySelector("main").classList.add("fade-in");
          document.querySelector("main").style.visibility = "visible";
        }
      });
    // if not flexpool, run this for ethermine
  } else {
    // take out the 0x prefix of eth address for Ethermine
    address = address.split("");
    address.splice(0, 2);
    address = address.join("");
    // set pool text to Ethermine
    poolText.innerText = "Ethermine";

    //view miner link
    link.href = `https://ethermine.org/miners/${address}/dashboard`;
    linkText.innerText = "Ethermine";

    // set chart
    showEMChart(address);

    //fetch data from Ethermine API
    fetch(`https://api.ethermine.org/miner/:${address}/currentStats`)
      .then((res) => res.json())
      .then((data) => {
        // if wrong address -> valid ETH but not on ethermine -> AND api is online, just put 0 for hashrate
        if (data.data == "NO DATA" && data.status === "OK") {
          console.log(
            "-------------------- WRONG ADDRESS FOR POOL BUT VALID ETH ADDRESS"
          );
          avgHash.innerText = "0.00MH";
          curHash.innerText = "0.00MH";
          repHash.innerText = "0.00MH";
          balance.innerText = currentBalance;
          // once all data is loaded, fade in the content
          document.querySelector("#main-content").classList.add("fade-in");
          document.querySelector("#main-content").style.visibility = "visible";
        } else {
          // average hash
          averageHashrate = hashrateCalc(data.data.averageHashrate);
          avgHash.innerText = averageHashrate;
          // current hash
          currentHashrate = hashrateCalc(data.data.currentHashrate);
          curHash.innerText = currentHashrate;
          // reported hash
          reportedHashrate = hashrateCalc(data.data.reportedHashrate);
          repHash.innerText = reportedHashrate;
          // balance
          currentBalance = truncToFive(data.data.unpaid / 10 ** 18);
          // currently broken, MAKE BALANCE ELEMENT
          balance.innerText = currentBalance;
          // active workers
          console.log(data.data.activeWorkers);
          // once all data is loaded, fade in the content
          document.querySelector("#main-content").classList.add("fade-in");
          document.querySelector("#main-content").style.visibility = "visible";
        }
      });
  }

  /////////////////////////////////////////////
  // FETCH DATA AND REPLACE THE TEXT

  // calculate if it's MH, GH, or TH
  const hashrateCalc = (hash) => {
    hash = truncToTwo((hash * 1.00001) / 1000000);
    // // if hash is in the GH (gigahash)
    if (hash > 999999.99) {
      hash = `${truncToTwo(hash / 1000000)}TH`;
      return hash;
      // if hash is in the TH (terahash)
    } else if (hash > 999.99) {
      hash = `${truncToTwo(hash / 1000)}GH`;
      return hash;
      // if not TH or GH, then it's MH (megahash)
    } else {
      hash = `${hash}MH`;
      return hash;
    }
  };

  // ETH to USD Conversion
  const conversionBtn = document.getElementById("conversion-btn");

  conversionBtn.classList.toggle("fas-dollar-sign");

  conversionBtn.addEventListener("click", () => {
    conversionBtn.classList.toggle("fas");
    conversionBtn.classList.toggle("fa-dollar-sign");
    conversionBtn.classList.toggle("fab");
    conversionBtn.classList.toggle("fa-ethereum");
    if (conversionBtn.classList[1] === "fab") {
      if (currentBalance === 0) {
        balance.textContent = "$0";
      } else {
        balance.textContent =
          "$" + truncToTwo(currentEthPrice * currentBalance);
      }
    } else if (conversionBtn.classList[1] === "fas") {
      balance.textContent = `${currentBalance}`;
    }
  });

  // end of ELSE statement
}
