// Logo spin animation

const logo = document.getElementById("logo-link");

logo.addEventListener("mouseover", () => {
  logo.classList.add("spin");
  logo.style.animationTimingFunction = "ease-in-out";
  logo.style.animationPlayState = "running";
});

logo.addEventListener("mouseleave", () => {
  logo.classList.remove("spin");
});

// navbar hamburger functionality

const hamburger = document.getElementById("hamburger");
const navContainer = document.getElementsByTagName("nav");
const navListItems = navContainer[0].querySelector("ul").querySelectorAll("li");

// on click, show the list item and add animation slide in from the right
// staircase down in animation from top to bottom
hamburger.addEventListener("click", () => {
  navListItems[0].classList.toggle("show");
  navListItems[0].classList.add("animate__fadeInRight");
  navListItems[0].style.setProperty("--animate-duration", "0.4s");

  navListItems[1].classList.toggle("show");
  navListItems[1].classList.add("animate__fadeInRight");
  navListItems[1].style.setProperty("--animate-duration", "0.7s");

  navListItems[2].classList.toggle("show");
  navListItems[2].classList.add("animate__fadeInRight");
  navListItems[2].style.setProperty("--animate-duration", "1s");

  navListItems[3].classList.toggle("show");
  navListItems[3].classList.add("animate__fadeInRight");
  navListItems[3].style.setProperty("--animate-duration", "1.3s");
});
