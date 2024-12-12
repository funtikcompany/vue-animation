<template>
  <div class="about">
    <router-link class="about-link" data-cursor-hover to="/">Go back</router-link>
  </div>
</template>
<style lang="scss">
  .about {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &-link {
      font-family: 'Grtsk Giga';
      font-style: normal;
      color:#373737;
      position: relative;
      
      &::after { 
          content:'';
          position: absolute;
          width: 0px;
          height: 2px;
          bottom: -5px;
          left: 0px;
          background: #fff;
          transition: all .2s linear;
          
      }
      

      &:hover {
          color:#fff;
          &::after {
              width: 100%;
          }
      }
    }
  }
</style>
