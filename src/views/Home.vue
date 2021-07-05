<template>
  <div>
    <v-container class="small-container">
      <div class=" pa-5 pt-6">
        <span class="text-h5">Top Cryptocurrency Prices by Market Cap</span><br>
        <small>The global crypto market cap is </small>
      </div>
      <v-row class="mb-10">
        <v-col cols="12">
          <CryptoList :headers="coinsHeaders" :coins="listedCoins" :listItemActions="coinItemAction" :loader="loader" :itemsPerPage="itemsPerPage" tableTitle="Top 100 Coins by Marketcap" />
          <div class="text-center mt-3">
            <v-pagination :value="currentPage" :length="maxPages" total-visible="11" circle @input="nextPage"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import CryptoList from '../components/CryptoList.vue'
  import {
    numberWithCommas,
    addDecimal
  } from '../functions/numberTools'
  import {
    controllers
  } from 'chart.js'
  export default {
    name: 'Home',
    components: {
      CryptoList
    },
    data: () => {
      return {
        listedCoins: [],
        loader: true,
        maxCryptos: 8200,
        currentPage: 0,
        maxPages: 0,
        itemsPerPage: 25,
        coinsHeaders: [{
            text: "#",
            value: 'market_cap_rank',
            maxPages: 0,
            currentPage: 0,
            itemsPerPage: 25,
            sortable: false,
          },
          {
            text: 'Watchlist',
            value: 'watchlist',
            sortable: false,
          },
          {
            text: 'Name',
            value: 'name',
            sortable: false,
          },
          {
            text: 'Price',
            value: 'current_price',
            sortable: false,
          },
          {
            text: '24%',
            value: 'price_change_percentage_24h',
            sortable: false,
          },
          {
            text: '24H High',
            value: 'high_24h',
            sortable: false,
          },
          {
            text: '24H Low',
            value: 'low_24h',
            sortable: false,
          },
          {
            text: 'Market Cap',
            value: 'market_cap',
            sortable: false,
          }
        ]
      }
    },
    async created() {
      this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1;
      this.itemsPerPage = this.$route.query.itemsPerPage ? parseInt(this.$route.query.itemsPerPage) : 25;
      let cryptoData = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&&sparkline=falseorder=market_cap_desc&per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(res => res.data);
      cryptoData = cryptoData.sort((a, b) => (a.market_cap_rank > b.market_cap_rank) ? 1 : -1)
      const proccessedData = cryptoData.map((coin) => {
        coin.current_price = "$" + numberWithCommas(addDecimal(coin.current_price))
        coin.market_cap = "$" + numberWithCommas(coin.market_cap)
        coin.low_24h = "$" + numberWithCommas(addDecimal(coin.low_24h))
        coin.high_24h = "$" + numberWithCommas(addDecimal(coin.high_24h))
        coin.price_change_percentage_24h = (addDecimal(coin.price_change_percentage_24h)) + "%"
        return coin
      })
      this.maxPages = Math.ceil(this.maxCryptos / this.itemsPerPage)
      this.listedCoins = proccessedData
      this.loader = false
    },
    methods: {
      //pushes to coin page
      coinItemAction(coin) {
        this.$router.push(`/coin/${coin.id}`);
      },
      async proccessData(data) {
        const processedData = await data
        return processedData
      },
      async nextPage(newPage) {
        this.loader = true
        this.listedCoins = []
        this.currentPage = newPage
        this.$router.push({
          path: '/',
          query: {
            page: this.currentPage,
            itemsPerPage: this.itemsPerPage
          }
        })
        let cryptoData = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&&sparkline=falseorder=market_cap_desc&per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(res => res.data);
        cryptoData = cryptoData.sort((a, b) => (a.market_cap_rank > b.market_cap_rank) ? 1 : -1)
        const proccessedData = cryptoData.map((coin) => {
          coin.current_price = "$" + numberWithCommas(addDecimal(coin.current_price))
          coin.market_cap = "$" + numberWithCommas(coin.market_cap)
          coin.low_24h = "$" + numberWithCommas(addDecimal(coin.low_24h))
          coin.high_24h = "$" + numberWithCommas(addDecimal(coin.high_24h))
          coin.price_change_percentage_24h = (addDecimal(coin.price_change_percentage_24h)) + "%"
          return coin
        })
        this.maxPages = Math.ceil(this.maxCryptos / this.itemsPerPage)
        this.listedCoins = proccessedData
        this.loader = false
      }
    },
    watch: {
      itemsPerPage: async function(val) {
        this.loader = true
        this.listedCoins = []
        this.itemsPerPage = val
        let cryptoData = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&&sparkline=falseorder=market_cap_desc&per_page=${this.itemsPerPage}&page=${this.currentPage}`).then(res => res.data);
        cryptoData = cryptoData.sort((a, b) => (a.market_cap_rank > b.market_cap_rank) ? 1 : -1)
        const proccessedData = cryptoData.map((coin) => {
          coin.current_price = "$" + numberWithCommas(addDecimal(coin.current_price))
          coin.market_cap = "$" + numberWithCommas(coin.market_cap)
          coin.low_24h = "$" + numberWithCommas(addDecimal(coin.low_24h))
          coin.high_24h = "$" + numberWithCommas(addDecimal(coin.high_24h))
          coin.price_change_percentage_24h = (addDecimal(coin.price_change_percentage_24h)) + "%"
          return coin
        })
        this.maxPages = Math.ceil(this.maxCryptos / this.itemsPerPage)
        this.listedCoins = proccessedData
        this.loader = false
      }
    }
  }
</script>

<style lang="css">
  .market-cap-title-container {
    margin: 8em 0 8em 0;
  }
  .support-container {
    padding: 10em 0 8em 0;
    margin-top: 10px;
  }
</style>
