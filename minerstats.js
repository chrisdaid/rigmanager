const copyBtn = document.querySelector(".copy-btn");
const copyBtnTooltip = document.querySelector(".copy-btn-tt");
copyBtn.addEventListener("mouseover", () => {
  copyBtnTooltip.innerText = "Copy";
  copyBtnTooltip.classList.add("visible");
});

copyBtn.addEventListener("mouseleave", () => {
  copyBtnTooltip.classList.remove("visible");
});
