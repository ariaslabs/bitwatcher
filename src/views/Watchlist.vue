<template>
  <v-container class="small-container">
    <CryptoList :headers="coinsHeaders" :coins="watchlistFormated" :listItemActions="coinItemAction" :loader="loader" :itemsPerPage="itemsPerPage" tableTitle="Watchlist" />
  </v-container>
</template>

<script>
  import axios from 'axios'
  import CryptoList from '../components/CryptoList.vue'
  export default {
    data: () => {
      return {
        loader: true,
        itemsPerPage: 25,
        watchlistFormated: [],
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
    components: {
      CryptoList
    },
    async created() {
      let watchlistPayload = []
      console.log(this.user.watchlist)
      for (const coinID of this.user.watchlist) {
        const coinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinID}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
          .then(res => res.data)
        watchlistPayload.push({
          id: await coinID,
          name: await coinData.name,
          image: await coinData.image.small,
          market_cap_rank: await coinData.market_cap_rank,
          current_price: await coinData.current_price['usd'],
          high_24h: await coinData.high_24h['usd'],
          low_24h: await coinData.low_24h['usd'],
          market_cap: await coinData.market_cap['usd'],
        })
      }
      console.log(watchlistPayload)
      this.loader = false
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      coinItemAction(coin) {
        this.$router.push(`/coin/${coin.id}`);
      },
    }
  }
</script>

<style>

</style>