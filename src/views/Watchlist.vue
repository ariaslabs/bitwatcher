<template>
  <v-container class="small-container">
    <div class=" pa-5 pt-6">
      <span class="text-h5">{{user.firstName}} {{user.lastName}}'s Watchlist</span><br>
    </div>
    <QuickSelectToolbar />
    <CryptoList :headers="coinsHeaders" :coins="watchlistFormated" :listItemActions="coinItemAction" :loader="loader" :itemsPerPage="itemsPerPage" tableTitle="Watchlist" />
  </v-container>
</template>

<script>
  import axios from 'axios'
  import CryptoList from '../components/CryptoList.vue'
  import QuickSelectToolbar from '../components/QuickSelectToolbar.vue'
  import {
    numberWithCommas,
    addDecimal
  } from '../functions/numberTools'
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
            align: 'center'
          },
          {
            text: 'Price',
            value: 'current_price',
            sortable: false,
            align: 'center'
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
      CryptoList,
      QuickSelectToolbar
    },
    async created() {
      let watchlistPayload = [];
      watchlistPush: for (const coinID of this.user.watchlist) {
        //fixes any duplications in watchlist
        for (const coin of watchlistPayload) {
          if (coinID === coin.id) continue watchlistPush
        }
        const coinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinID}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
          .then(res => res.data)
        watchlistPayload.push({
          id: coinData.id,
          name: coinData.name,
          image: coinData.image.small,
          price_change_percentage_24h: addDecimal(coinData.market_data.price_change_percentage_24h) + "%",
          market_cap_rank: coinData.market_cap_rank,
          current_price: '$' + numberWithCommas(addDecimal(coinData.market_data.current_price['usd'])),
          high_24h: '$' + numberWithCommas(addDecimal(coinData.market_data.high_24h['usd'])),
          low_24h: '$' + numberWithCommas(addDecimal(coinData.market_data.low_24h['usd'])),
          market_cap: '$' + numberWithCommas(addDecimal(coinData.market_data.market_cap['usd'])),
        })
      }
      this.watchlistFormated = watchlistPayload
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