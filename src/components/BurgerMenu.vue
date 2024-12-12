<template>
  <div id="burger-menu" class="burger-menu" @click="toggleMenu" >
    <span class="burger-menu-line" :class="{'active':open}"></span>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'


export default {
  name: 'BurgerMenu',
  setup() {
    const store = useStore();
    const open = computed(() => store.state.open);
    const toggleMenu = () => {
      store.dispatch('closeOrOpen', !store.state.open);
    }

    return {
      toggleMenu,open 
    }
  }
}
</script>
