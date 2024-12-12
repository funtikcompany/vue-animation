<template>
  <div id="app">
    <HeaderMain />
    <!-- Оверлей -->
    <div ref="overlay" class="overlay"></div>
    <CursorCustume />

    <!-- Переходи між сторінками -->
    <transition
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { gsap } from 'gsap';
import CursorCustume from './components/CursorCustom.vue';
import HeaderMain from './components/HeaderMain.vue';

export default defineComponent({
  name: 'App',
  components: {
    CursorCustume,
    HeaderMain,
  },
  setup() {
    const overlay = ref(null); // посилання на оверлей
    const isInitialLoad = ref(true); // прапорець для першого завантаження

    const beforeEnter = () => {
      // Перекриваємо екран оверлеєм перед завантаженням нового контенту
      gsap.set(overlay.value, { x: '0%' });
    };

    const enter = (el, done) => {
      if (isInitialLoad.value) {
        // Якщо це перше завантаження сторінки
        gsap.to(overlay.value, {
          duration: 1,
          x: '100%',
          ease: 'power2.inOut',
          onComplete: () => {
            isInitialLoad.value = false;
            done(); // Завершуємо перехід і показуємо контент
          },
        });
      } else {
        // Якщо це не перше завантаження
        gsap.timeline({ onComplete: done })
          .to(overlay.value, {
            duration: 0.5,
            x: '0%', 
            ease: 'power2.inOut',
          })
          .to(overlay.value, {
            duration: 0.5,
            x: '100%',
            ease: 'power2.inOut',
          });
      }
    };

    return {
      overlay,
      beforeEnter,
      enter,
    };
  },
});
</script>

