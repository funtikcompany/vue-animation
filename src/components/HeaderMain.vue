<template>
    <div class="header">
        <LanguageMenu />
        <AnimatedLogo />
        <BurgerMenu/>
    </div>
</template>
<script>
import AnimatedLogo from '../components/AnimatedLogo.vue'
import LanguageMenu from '../components/LanguageMenu.vue'
import BurgerMenu from '../components/BurgerMenu.vue'

export default {
  name: 'HeaderMain',
  components: {
    AnimatedLogo,
    LanguageMenu,
    BurgerMenu
  }
}
</script>
<style >
  
</style>