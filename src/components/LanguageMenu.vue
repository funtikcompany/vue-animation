<template>
    <div data-cursor-hover 
      class="language-selector-container" 
      @mouseenter="showLanguages" 
      @mouseleave="hideLanguages"
    >
      <img src="@/assets/img/laguage_img.png" alt="Logo" class="language-logo"/>
      <div class="languages" ref="languagesRef">
        <span ref="ruRef" class="language">RU</span>
        <span ref="uaRef" class="language">UA</span>
      </div>
    </div>
  </template>
  <script>
  import { ref, onMounted } from 'vue'
  import { gsap } from 'gsap'
  
  export default {
    name: 'LanguageSelector',
    setup() {
      const languagesRef = ref(null)
      const ruRef = ref(null)
      const uaRef = ref(null)
      let tl = null
  
      onMounted(() => {
        tl = gsap.timeline({ paused: true })
          .fromTo(languagesRef.value, 
            { opacity: 0 ,x: -20}, 
            { opacity: 1,x: 0, duration: 0.2, ease: "power2.out" }
          )
          .fromTo(ruRef.value, 
            { opacity: 0, x: -20 }, 
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
            "+=0.1"
          )
          .fromTo(uaRef.value, 
            { opacity: 0, x: -20 }, 
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
            "+=0.2"
          )
      })
  
      const showLanguages = () => {
        tl.play()
      }
  
      const hideLanguages = () => {
        tl.reverse()
      }
  
      return {
        languagesRef,
        ruRef,
        uaRef,
        showLanguages,
        hideLanguages
      }
    }
  }
  </script>
  