<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',

  data: () => ({
    loggedIn: true
  }),
  components: {
    Navbar,
    Footer
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
