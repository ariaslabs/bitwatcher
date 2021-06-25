<template>
  <div>
    <v-toolbar flat>
      <v-btn small  class="mr-2">
        <v-icon left>
          mdi-star-outline
        </v-icon>
        Watch List
      </v-btn>
      <v-btn small>
        <v-icon left>
          mdi-chart-arc
        </v-icon>
        Portfolio
      </v-btn>
    </v-toolbar>
    <v-data-table
    :headers="headers"
    :items="coins"
    :loading="loader"
    @click:row="listItemActions"
    loading-text="Loading..."
    class="elevation-0"
    >
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center ">
          <v-img max-height="30" max-width="30" class="float-left mr-2 mr-sm-4" :src="item.image"></v-img>
          {{item.name}}
        </div>
      </template>
    </v-data-table>
  </div>
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