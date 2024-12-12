<template>
    <div class="nav" :class="{'open': open}" ref="menuRef">
        <div class="nav-close">
            <div  class="burger-menu" @click="closeMenu" :class="{'active':open}">
                <span class="burger-menu-line" :class="{'active':open}"></span>
            </div>
        </div>
      <div class="nav-item nav-item-left" data-cursor-hover>
        <router-link to="/about" @click="closeMenu">where?</router-link> 
      </div>
      <div class="nav-item nav-item-center" data-cursor-hover>
        <router-link to="/about" @click="closeMenu">who?</router-link>
      </div>
      <div class="nav-item nav-item-right" data-cursor-hover>
        <router-link to="/about" @click="closeMenu">what?</router-link>
      </div>
    </div>
  </template>
  
  <script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'NavComponent',
  setup() {
    const store = useStore();
    const open = computed(() => store.state.open);
    const menuRef = ref(null);

    const handleClickOutside = (event) => {
      // Перевіряємо, чи меню відкрите
      if (open.value) {
        const clickedBurger = event.target.closest('#burger-menu');

        // Якщо клік не по самому меню і не по бургер-меню, тоді закриваємо
        if (menuRef.value && !menuRef.value.contains(event.target) && !clickedBurger) {
          store.dispatch('closeOrOpen', false);
        }
      }
    }
    const closeMenu =()=>{
        store.dispatch('closeOrOpen', false);
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      open,
      menuRef,
      closeMenu
    }
  }
}
</script>
  