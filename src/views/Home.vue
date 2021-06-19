<template>
  <v-container class="mt-5">
    <v-card>
      <CryptoList 
      :headers="coinsHeaders" 
      :coins="listedCoins" 
      :listItemActions="coinItemAction" 
      :loader="loader" 
      tableTitle="Top 100 Coins by Marketcap"
      />
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import CryptoList from '../components/CryptoList.vue'
import { numberWithCommas,addDecimal } from '../functions/numberTools'

export default {
  name: 'Home',
  components: {
    CryptoList
  },
  data: () => {
    return {
      listedCoins: [],
      loader: true,
      coinsHeaders: [
        {
          text: "#",
          value: 'market_cap_rank'
        },
        {
          text: 'Name',
          value : 'name'
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
      .then( res => res.data)

    data.sort((a, b) => (a.market_cap_rank > b.market_cap_rank) ? 1 : -1)
    const proccessedData = data.map((coin) => {
      coin.current_price = "$" + numberWithCommas(addDecimal(coin.current_price))
      coin.market_cap = "$" + numberWithCommas(coin.market_cap)
      coin.low_24h = "$" + numberWithCommas(addDecimal(coin.low_24h))
      return coin
    })



    this.listedCoins = proccessedData
    this.loader = false;
  },
  methods: {
    //pushs to coin page
    coinItemAction(coin) {
     this.$router.push(`/coin/${coin.id}`);
    },
    

  }
}
</script>
