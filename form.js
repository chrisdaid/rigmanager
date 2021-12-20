const form = document.querySelector(".form"),
  radioBtn = form.querySelector(".select-pool"),
  ethermine = radioBtn.querySelector("#ethermine"),
  flexpool = radioBtn.querySelector("#flexpool"),
  submitBtn = form
    .querySelector(".input-address-container")
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

  if (addressInput === "") {
    console.error("empty address");
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
        console.error("missing pool selection");
      }
    } else {
      console.error("invalid address");
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
