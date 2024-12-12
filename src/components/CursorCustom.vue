<template>
  <div>
    <div class="cursor" ref="cursor">
      <div class="circle"></div>
      <div class="image-wrapper" ref="imageWrapper">
        <img src="../assets/img/cursor.png" alt="Rotating Image" />
      </div>
    </div>
    <!-- Вміст сторінки -->
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

export default {
  name: "CursorCustom",
  setup() {
    const cursor = ref(null);
    const imageWrapper = ref(null);
    let isHovering = false;
    let currentRotation = 0;
    // Початок обертання при наведенні
    const startRotation = () => {
      if (!isHovering) {
        isHovering = true;
        gsap.to(imageWrapper.value, {
          duration: 6,
          rotation: `+=-360`,
          repeat: -1,
          ease: "linear",
          onUpdate: () => {
            const computedStyle = window.getComputedStyle(imageWrapper.value);
            const transform = computedStyle.getPropertyValue("transform");
            const values = transform.match(/matrix.*\((.+)\)/);
            if (values) {
              const matrix = values[1].split(", ");
              const a = parseFloat(matrix[0]);
              const b = parseFloat(matrix[1]);
              currentRotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            }
          },
        });
      }
    };

  // Зупинка обертання при відведенні
    const stopRotation = () => {
      if (isHovering) {
        isHovering = false;
        gsap.killTweensOf(imageWrapper.value);
        gsap.to(imageWrapper.value, {
          rotation: currentRotation,
          duration: 0,
        });
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.composedPath ? e.composedPath()[0] : e.target;
      if (target && target.getAttribute && target.getAttribute("data-cursor-hover") !== null) {
        startRotation();
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.composedPath ? e.composedPath()[0] : e.target;
      if (target && target.getAttribute && target.getAttribute("data-cursor-hover") !== null) {
        stopRotation();
      }
    };

    onMounted(() => {
      // Анімація переміщення курсора
      window.addEventListener("mousemove", (e) => {
        gsap.to(cursor.value, {
          duration: 0.2,
          x: e.clientX,
          y: e.clientY,
          ease: "power2.out",
        });
      });

      document.addEventListener("mouseenter", handleMouseEnter, true);
      document.addEventListener("mouseleave", handleMouseLeave, true);
    });

    return {
      cursor,
      imageWrapper,
    };
  },
};
</script>
  