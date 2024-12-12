<template>
    <div v-if="visible" class="transition-block"></div>
  </template>
  
  <script>
  export default {
    name:'TransitionBlock',
    props: {
      visible: {
        type: Boolean,
        required: true,
        
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  