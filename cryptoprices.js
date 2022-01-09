const btcPrice = document.getElementById("btc-price");
const ethPrice = document.getElementById("eth-price");
const solPrice = document.getElementById("sol-price");

// on load set bitcoin price

async function setBitcoinPrice() {
  let response = await fetch(
    "https://api.pro.coinbase.com/products/BTC-USD/ticker"
  );
  return response.json();
}
setBitcoinPrice().then(
  (jsonData) => (btcPrice.innerText = `$${jsonData.price}`)
);

// on load set ethereum price
async function setEthereumPrice() {
  let response = await fetch(
    "https://api.pro.coinbase.com/products/ETH-USD/ticker"
  );
  return response.json();
}
setEthereumPrice().then(
  (jsonData) => (ethPrice.innerText = `$${jsonData.price}`)
);

// on load set solana price
async function setSolanaPrice() {
  let response = await fetch(
    "https://api.pro.coinbase.com/products/SOL-USD/ticker"
  );
  return response.json();
}
setSolanaPrice().then(
  (jsonData) => (solPrice.innerText = `$${jsonData.price}`)
);

// after 30 seconds update price and continue every 30 seconds
function myTimer() {
  // update bitcoin price
  setBitcoinPrice().then(
    (jsonData) => (btcPrice.innerText = `$${jsonData.price}`)
  );
  // update ethereum price
  setEthereumPrice().then(
    (jsonData) => (ethPrice.innerText = `$${jsonData.price}`)
  );
  // update solana price
  setSolanaPrice().then(
    (jsonData) => (solPrice.innerText = `$${jsonData.price}`)
  );
}
var myVar = setInterval(myTimer, 30000);
