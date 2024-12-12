<template>
  <div class="main" @mousemove="handleMouseMove">
      <div class="container">
          <div class="ellipse"></div>
          <h1 class="main-title" data-cursor-hover ref="mainTitle">FULL-CYCLE EVENT AGENCY</h1>
          <div class="text-running-content">
        <div class="text-running-items" role="marquee">
          <div class="text-running-row">
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
          </div>
          <div class="text-running-row">
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
            <div class="text-running-item -stroke"><span>FULL-CYCLE EVENT AGENCY </span></div>
          </div>
        
        </div>
      </div>
      <NavComponent />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import NavComponent from '../components/NavComponent.vue'

export default {
  name: 'MainView',
  components: {
    NavComponent,
  },
  setup() {
    const mainTitle = ref(null)
    const mouseX = ref(0)
    const mouseY = ref(0)

    // Слідкування головного тексту за мишкою
    const handleMouseMove = (e) => {
      mouseX.value = e.clientX
      mouseY.value = e.clientY

      if (mainTitle.value) {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        const deltaX = (mouseX.value - centerX) * 0.05
        const deltaY = (mouseY.value - centerY) * 0.05

        gsap.to(mainTitle.value, {
          duration: 0.5,
          x: deltaX,
          y: deltaY,
          ease: "power2.out"
        })
      }
    }
  // Бігучий текст
    onMounted(() => {
      if (mainTitle.value) {
        gsap.set(mainTitle.value, { x: 0, y: 0 })
      }

      const rows = document.querySelectorAll(".text-running-row");
      rows.forEach(function (e, index) {
        let row_width = e.getBoundingClientRect().width;
        let row_item_width = e.children[0].getBoundingClientRect().width;
        
        let initial_offset = ((2 * row_item_width) / row_width) * 100 * -1;
        
        let duration = 10;
        
        var tl = gsap.timeline();
          gsap.set(e, {
            xPercent: index % 2 === 0 ?  initial_offset:0
          });
          
          tl.to(e, {
            ease: "none",
            duration: duration,
            xPercent: index % 2 === 0 ? 0:initial_offset,
            repeat: -1
          });
        
      });
    })

    onBeforeUnmount(() => {
      if (mainTitle.value) {
        gsap.killTweensOf(mainTitle.value)
      }
    })

    return {
      mainTitle,
      handleMouseMove
    }
  }
}
</script>
