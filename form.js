const form = document.querySelector(".form"),
  radioBtn = form.querySelector(".select-pool"),
  ethermine = radioBtn.querySelector("#ethermine"),
  flexpool = radioBtn.querySelector("#flexpool"),
  submitBtn = form
    .querySelector(".input-address-container")
    .querySelector('input[type="submit"]');

const data = {
  pool: "",
  address: "",
};

function getDataForm(e) {
  e.preventDefault();

  var formData = new FormData(form);
  data.pool = ethermine.checked
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
    console.log("empty address");
  } else {
    if (
      addressInput.length >= 20 &&
      addressInput.length <= 42 &&
      addressInput.split("")[0] === "0" &&
      addressInput.split("")[1] === "x"
    ) {
      data.address = addressInput;
      console.log("valid address");
      alert(data.pool + " " + data.address);
    } else {
      console.log("invalid address");
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    submitBtn.addEventListener("click", getDataForm, false);
  },
  false
);
submitBtn.addEventListener;
