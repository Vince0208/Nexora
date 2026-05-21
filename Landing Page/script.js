const hamburger = document.querySelector(".hamburger-icon")
const navLinks = document.querySelector(".links")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})
