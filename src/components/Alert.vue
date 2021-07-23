<template>
  <v-alert 
  :value="active"
  :type="alertType"
  :icon="'mdi-' + alertIcon"
  dismissible
  elevation="4"
  max-width="400"
  min-width="300"
  transition="slide-x-transition"
  >
    {{alertMessage}}
  </v-alert>
</template>

<script>
export default {
  data: () => {
    return {
      active: true
    }
  },
  props: [
    "alertID",
    "alertMessage",
    "alertType",
    "alertIcon"
  ],
  methods: {
    removeAlert(id) {
      this.$store.dispatch('removeAlert', id)
    }
  },
  created() {
    setTimeout(() => {
      this.active = false
      this.removeAlert(this.alertID)
    }, 4000)
  }
}
</script>

<style>

</style>