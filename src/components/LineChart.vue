<template>
  <v-sparkline
    :value="data"
    color="#000000"
    height="100"
    padding="24"
    stroke-linecap="round"
    radius="5"
    smooth
    auto-draw
  >
    <template v-slot:label="item">
      ${{ item.value }}
    </template>
  </v-sparkline>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style>

</style>