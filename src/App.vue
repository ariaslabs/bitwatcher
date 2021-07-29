<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view/>
      <div class="alert-container">
        <Alert class="alerts" static right bottom v-for="item of alerts" :key="item.id" :alertMessage="item.message" :alertType="item.type" :alertIcon="item.icon" :alertID="item.id" />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import Alert from './components/Alert.vue'
  export default {
    name: 'App',
    data: () => ({
      loggedIn: true
    }),
    components: {
      Navbar,
      Footer,
      Alert
    },
    computed: {
      alerts() {
        return this.$store.state.alerts
      }
    }
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto&display=swap');

  html,body {
    font-family: 'Roboto', sans-serif;
  }

  .brand {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 3px;
    font-size: 18px;
  }
  .hover {
    cursor: pointer;
  }
  tr {
    cursor: pointer;
  }
  .small-container {
    max-width: 1000px;
  }
  .alert-container {
    position: fixed;
    right: 10px;
    bottom: 10px;
    z-index: 1;
  }
</style>
