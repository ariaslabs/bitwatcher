<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',

  data: () => ({
    loggedIn: true
  }),
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
  .hover {
    cursor: pointer;
  }

  tr {
    cursor: pointer;
  }
</style>
