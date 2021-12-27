const copyBtn = document.querySelector(".copy-btn");
const copyBtnTooltip = document.querySelector(".copy-btn-tt");
const addBtn = document.querySelector(".add-btn");
const addBtnTooltip = document.querySelector(".add-btn-tt");

copyBtn.addEventListener("mouseover", () => {
  copyBtnTooltip.innerText = "Copy";
});

addBtn.addEventListener("mouseover", () => {
  if (addBtnTooltip.innerText === "Added") {
    addBtnTooltip.innerText = "Remove";
  } else {
    addBtnTooltip.innerText = "Add";
  }
});

addBtn.addEventListener("click", () => {
  if (
    addBtnTooltip.innerText === "Remove" ||
    addBtnTooltip.innerText === "Removed"
  ) {
    addBtnTooltip.innerText = "Removed";
  } else {
    addBtnTooltip.innerText = "Added";
  }
});

copyBtn.addEventListener("mouseleave", () => {});
