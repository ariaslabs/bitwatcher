<template>
  <v-card>
    <v-card-title>
      {{tableTitle}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        sort="false"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
    :headers="headers"
    :items="coins"
    :loading="loader"
    @click:row="listItemActions"
    :search="search"
    loading-text="Loading..."
    class="elevation-0"
    ></v-data-table>
  </v-card>
  
</template>

<script>
export default {
  data: () => {
    return {
      search: ''
    }
  },
  props: [
    'headers',
    'coins',
    'tableTitle',
    'listItemActions',
    'loader'
  ]
}
</script>

<style>

</style>