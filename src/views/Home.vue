<template>
  <div>
    <v-container class="">
    <div class=" pa-5 pt-6">
      <span class="text-h5">Top Cryptocurrency Prices by Market Cap</span><br>
      <small>The global crypto market cap is </small>
    </div>
      <v-row>
        <v-col cols="12">
          <CryptoList :headers="coinsHeaders" :coins="listedCoins" :listItemActions="coinItemAction" :loader="loader" tableTitle="Top 100 Coins by Marketcap" />
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
  export default {
    name: 'Home',
    components: {
      CryptoList
    },
    data: () => {
      return {
        listedCoins: [],
        loader: true,
        coinsHeaders: [{
            text: "#",
            value: 'market_cap_rank'
          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Price',
            value: 'current_price'
          },
          {
            text: '24%',
            value: 'price_change_percentage_24h'
          },
          {
            text: '24H High',
            value: 'high_24h'
          },
          {
            text: '24H Low',
            value: 'low_24h'
          },
          {
            text: 'Market Cap',
            value: 'market_cap'
          }
        ]
      }
    },
    async created() {
      let data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
        .then(res => res.data)
      data.sort((a, b) => (a.market_cap_rank > b.market_cap_rank) ? 1 : -1) //sorts coins by marketcap.
      console.log(data);
      const proccessedData = data.map((coin) => {
        coin.current_price = "$" + numberWithCommas(addDecimal(coin.current_price))
        coin.market_cap = "$" + numberWithCommas(coin.market_cap)
        coin.low_24h = "$" + numberWithCommas(addDecimal(coin.low_24h))
        coin.high_24h = "$" + numberWithCommas(addDecimal(coin.high_24h))
        coin.price_change_percentage_24h = (addDecimal(coin.price_change_percentage_24h)) + "%"
        return coin
      })
      this.listedCoins = proccessedData
      this.loader = false;
    },
    methods: {
      //pushes to coin page
      coinItemAction(coin) {
        this.$router.push(`/coin/${coin.id}`);
      },
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
