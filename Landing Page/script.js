document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-icon")
  const navLinks = document.querySelector(".links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  const tabs = document.querySelectorAll("#features #featureButtonTabs .tabButtons")
  const sliderViewport = document.querySelector("#features #featureCards")
  const cards = document.querySelectorAll("#features #featureCards .featureCards")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector("#features #featureButtonTabs .tabButtons.active").classList.remove("active")
      tab.classList.add("active")
      
      const targetIndex = tab.getAttribute("data-index")
      const targetCard = cards[targetIndex]

      if (targetCard) {
        const targetX = targetCard.offsetLeft

        sliderViewport.scrollTo({
          left: targetX - 20,
          behavior: "smooth"
        })
      }
    })
  })

  sliderViewport.addEventListener("scroll", () => {
    if (window.innerWidth < 769) {
      const viewCenter = sliderViewport.scrollLeft + (sliderViewport.offsetWidth / 2)

      cards.forEach((card) => {
        const cardLeft = card.offsetLeft
        const cardRight = cardLeft + card.offsetWidth

        if (viewCenter >= cardLeft && viewCenter <= cardRight) {
          const cardIndex = card.getAttribute("data-index")
          const currentActiveTab = document.querySelector("#features #featureButtonTabs .tabButtons.active")
          const matchingTab = document.querySelector(`#features #featureButtonTabs .tabButtons[data-index='${cardIndex}']`)

          if (currentActiveTab !== matchingTab) {
            currentActiveTab.classList.remove("active")
            matchingTab.classList.add("active")
          }
        }
      })
    }
  })

  let autoScrollTimer = null
  let interactionCooldownTimeout = null
  let isUserInteracting = false

  function startAutoScroll() {
    if (window.innerWidth >= 769) {
      stopAutoScroll()

      autoScrollTimer = setInterval(() => {
        if (!isUserInteracting) {
          sliderViewport.scrollLeft += 1

          const halfScrollWidth = sliderViewport.scrollWidth / 2

          if (sliderViewport.scrollLeft >= halfScrollWidth) {
            sliderViewport.scrollLeft = 0
          }
        }
      }, 20)
    }
  }

  function stopAutoScroll() {
    if (autoScrollTimer) clearInterval(autoScrollTimer)
  }

  function  handleUserInteraction() {
    isUserInteracting = true

    if (interactionCooldownTimeout) clearTimeout(interactionCooldownTimeout)
    
    interactionCooldownTimeout = setTimeout(() => {
      isUserInteracting = false
    }, 2000);
  }

  sliderViewport.addEventListener("wheel", handleUserInteraction, { passive: true})
  sliderViewport.addEventListener("touchmove", handleUserInteraction, { passive: true })
  sliderViewport.addEventListener("touchstart", handleUserInteraction, { passive: true })
  sliderViewport.addEventListener("mouseenter", () => { isUserInteracting = true })
  sliderViewport.addEventListener("mouseleave", () => { isUserInteracting = false })

  startAutoScroll()

  window.addEventListener("resize", () => {
    stopAutoScroll()
    startAutoScroll()
  })
})