const logo = document.getElementById("logo-link");

logo.addEventListener("mouseover", () => {
  setTimeout(function () {
    logo.classList.add("spin");
  }, 1000);
});

logo.addEventListener("mouseleave", () => {
  logo.classList.remove("spin");
});

// make ease-in-out to smooth animation
