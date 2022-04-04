<template>
  <router-view></router-view>
</template>

<script>
import MenuBar from './components/MenuBar.vue'

export default {
  name: 'App',
  components: {
    MenuBar
  },  
  data: () => ({
    //
  }),
}
</script>
<style>
*, body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  padding-top: 5rem!important;
  padding: 0.89rem;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 992px) {
    .container {
        max-width: 1250px;
    }
}
</style>
