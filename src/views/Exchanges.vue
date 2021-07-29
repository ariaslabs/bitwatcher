<template>
  <v-container class="small-container mt-3">
    <div class=" pa-5 pt-6">
      <span class="text-h5">Exchanges</span><br>
    </div>
    <QuickSelectToolbar />
    <v-data-table :headers="headers" hide-default-footer :items="exhangeData" :page.sync="currentPage" :total-visible="7" :loading="loader" :items-per-page="itemsPerPage">
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center " @click="toSite(item)" >
          <v-img max-height="30" max-width="30" class="float-left mr-2 mr-sm-4" :src="item.image"></v-img>
          {{item.name}}
        </div>
      </template>
    </v-data-table>
    <div class="text-center mt-3">
      <v-pagination circle v-model="currentPage" :length="maxPages"></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import QuickSelectToolbar from '../components/QuickSelectToolbar.vue'

  export default {
    data: () => {
      return {
        exhangeData: [],
        loader: true,
        maxExchanges: 0,
        maxPages: 0,
        currentPage: 1,
        itemsPerPage: 25,
        headers: [{
            text: "#",
            value: 'trust_score_rank',
            sortable: false,
          },
          {
            text: 'Name',
            value: 'name',
            sortable: false,
          },
          {
            text: 'Year Established',
            value: 'year_established',
            sortable: false,
            align: 'center'
          }
        ]
      }
    },
    components: {
      QuickSelectToolbar
    },
    async created() {
      const exchangeRes = await axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(res => res);
      this.maxExchanges = exchangeRes.headers.total
      this.exhangeData = exchangeRes.data
      this.maxPages = Math.ceil(this.maxExchanges / this.itemsPerPage)
      this.loader = false
    },
    watch: {
      currentPage: async function(val) {
        this.loader = true
        this.currentPage = val
        const exchangeRes = await axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(res => res);
        this.exhangeData = exchangeRes.data
        this.maxExchanges = exchangeRes.headers.total
        this.maxPages = Math.ceil(this.maxExchanges / this.itemsPerPage)
        this.loader = false
      },
      itemsPerPage: async function(val) {
        this.loader = true
        this.itemsPerPage = val
        const exchangeRes = await axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(res => res);
        this.exhangeData = exchangeRes.data
        this.maxExchanges = exchangeRes.headers.total
        this.maxPages = Math.ceil(this.maxExchanges / this.itemsPerPage)
        this.loader = false
      }
    },
    methods: {
      toSite(item) {
        window.location = item.url;
      }
    }
  }
</script>

<style>
  .page-select {
    width: 2em !important;
  }
</style>