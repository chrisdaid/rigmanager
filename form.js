const form = document.querySelector(".form"),
  radioBtn = form.querySelector(".select-pool"),
  ethermine = radioBtn.querySelector("#ethermine"),
  flexpool = radioBtn.querySelector("#flexpool"),
  submitBtn = form
    .querySelector(".address-container")
    .querySelector('input[type="submit"]');

const formDataObj = {
  pool: "",
  address: "",
};

/////////////////////////////////////////
// grab form info and check if form is filled correctly
function getDataForm(e) {
  e.preventDefault();

  var formData = new FormData(form);
  formDataObj.pool = ethermine.checked
    ? "ethermine"
    : flexpool.checked
    ? "flexpool"
    : null;

  const addressInput = formData.get("miner-address").toLowerCase();

  // basic eth address check
  // must be less than 42 characters
  // must start with 0 as first character
  // must start with x and second character

  const addressMessage = document.querySelector(".invalid-address");
  const poolMessage = document.querySelector(".invalid-pool");

  if (addressInput === "") {
    // empty address so show text under search bar
    console.error("empty address");
    addressMessage.innerText = "Address is empty";
    addressMessage.classList.add("show");
  } else {
    if (
      addressInput.length >= 20 &&
      addressInput.length <= 42 &&
      addressInput.split("")[0] === "0" &&
      addressInput.split("")[1] === "x"
    ) {
      console.log("valid address");
      // address valid, now check for pool selected
      if (formDataObj.pool) {
        formDataObj.address = addressInput;
        console.log("valid pool + address, done");

        // FETCH MINER INFO

        //miner balance in eth
        fetch(
          `https://api.flexpool.io/v2/miner/balance?coin=eth&address=${formDataObj.address}`
        )
          .then((res) => res.json())
          .then((data) => console.log(data.result.balance / 10 ** 18));

        window.open(
          `miner.html?pool=${formDataObj.pool}&address=${formDataObj.address}`,
          "_self"
        );
      } else {
        //if address is valid but no pool selected
        console.error("address valid, missing pool selection");
        // empty pool selection so show text under radio btns
        poolMessage.innerText = "No pool selected";
        poolMessage.classList.add("show");
        addressMessage.classList.remove("show");
      }
    } else {
      // address is !empty but address is invalid so show text under search bar
      console.error("invalid address");
      addressMessage.innerText = "Address is invalid";
      addressMessage.classList.add("show");
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    form.addEventListener("submit", getDataForm, false);
  },
  false
);
