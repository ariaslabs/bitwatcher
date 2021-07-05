<template>
  <v-alert 
  :type="alertType"
  :value="showAlert"
  >
    {{alertMessage}}
  </v-alert>
</template>

<script>
export default {
  props: [
    "alertMessage",
    "alertType",
    "showAlert",
  ]
}
</script>

<style>

</style>