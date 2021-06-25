<template>
  <v-container class="small-container">
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5 mx-auto">
          <v-card-text class="">
            <v-row>
              <v-col cols="12" sm="6" class=" text-justify float-left">
                <div class="d-flex align-center ">
                  <v-img max-height="50" max-width="50" class="float-left" :src="coin.image.large"></v-img>
                  <h2 class="ml-4 d-none d-sm-block">{{ coin.name }}</h2>
                </div>
                <div class="d-flex justify-end mt-n14 mt-sm-0 justify-sm-start">
                  <v-chip label class="mt-4">Rank #{{ coin.marketCapRank }}</v-chip>
                </div>
              </v-col>
              <v-col class="" cols="12" sm="6">
                <div class="d-flex-row justify-start justify-sm-end text-sm-right">
                  <div class="">
                    <span>{{ coin.name }} Price ({{ coin.symbol }})</span>
                  </div>
                  <div class="d-flex-row">
                    <div class="d-flex justify-sm-end align-center my-2">
                      <v-chip :color="percentColor" class="order-2 order-sm-2">
                        <span class="white--text">{{ percentChangeHandler(coin.priceChange24percent) }}%</span>
                      </v-chip>
                      <h1 class="order-sm-2 ordet-1 mr-2 ml-sm-2">${{ coin.currentPrice }}</h1>
                    </div>
                    <div class="d-flex align-center justify-sm-end mt-4">
                      <v-chip small label class="mr-2 order-2">24h Change</v-chip>
                      <span :class=" 'order-2 ' + textColor + ' ' +textShade" class="">${{ coin.priceChangeInCurrency }}</span>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <a class="subtitle-1 mr-2" :href="coin.website">{{
                    coin.website
                  }}</a>
              </v-col>
            </v-row>
          </v-card-text>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>Description</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-html="coin.description"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2">
          <!-- Chart -->
          <line-chart :label="coin.name + ' 24h Price Chart'" :coinData="tickerData"></line-chart>
        </v-card>
      </v-col>
      <v-col cols="12">
        <!-- Coin Statistics -->
        <v-card>
          <v-card-title>{{coin.name}} Statistics</v-card-title>
          <v-card-text class="mt-n4">
            <div v-for="(item, index) in marketData" :key="item">
              <v-subheader v-if="item.header" :key="item.header" class="mt-5 px-0">{{item.header}}</v-subheader>
              <v-divider v-else-if="item.divider" :key="index"></v-divider>
              <div v-else class="d-flex my-3 justify-space-between">
                <h4>{{item.title}}</h4>
                <span>{{item.value}}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "axios";
  import {
    numberWithCommas,
    addDecimal
  } from "../functions/numberTools";
  import LineChart from '../components/LineChart.vue'

  export default {
    data: () => {
      return {
        show: false,
        tickerData: [],
        coin: {},
        percentColor: 'green',
        textColor: 'green',
        marketData: [],
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        },
         datacollection: null
      };
    },
    components: {
      LineChart
    },
    async created() {
      const data = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${this.$route.params.coin_id}`
        )
        .then((res) => res.data);
      const payloadTickerData = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${this.$route.params.coin_id}/market_chart?vs_currency=usd&days=1`
        )
        .then((res) => res.data);
      console.log(payloadTickerData);

      this.tickerData = payloadTickerData.prices
      this.coin = {
        id: data.id,
        description: data.description["en"],
        image: data.image,
        website: data.links.homepage[0],
        marketCapRank: data.market_cap_rank,
        name: data.name,
        symbol: data.symbol.toUpperCase(),
        currentPrice: numberWithCommas(addDecimal(data.market_data.current_price["usd"])),
        priceChange24percent: numberWithCommas(
          addDecimal(data.market_data.price_change_percentage_24h_in_currency["usd"])
        ),
        priceChangeInCurrency: numberWithCommas(addDecimal(data.market_data.price_change_24h_in_currency["usd"]))
      };
      this.marketData = [{
          header: this.coin.name + " Price Today"
        },
        {
          divider: true
        },
        {
          title: this.coin.name + ' Price',
          value: "$ " + this.coin.currentPrice
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'Price Change',
          value: "$ " + this.coin.priceChangeInCurrency
        },
        {
          divider: true,
          inset: true
        },
        {
          title: "24h Low / 24h High",
          value: "$ " + numberWithCommas(addDecimal(data.market_data.high_24h['usd'])) + " /  $ " + numberWithCommas(addDecimal(data.market_data.low_24h['usd']))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'Market Rank',
          value: "#" + this.coin.marketCapRank
        },
        {
          divider: true,
          inset: true
        },
        {
          header: this.coin.name + " Price History"
        },
        {
          divider: true,
          inset: true
        },
        {
          title: '7d Change',
          value: data.market_data.price_change_percentage_7d + "% / $ " + numberWithCommas(addDecimal(data.market_data.price_change_percentage_7d_in_currency["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: '14d Change',
          value: data.market_data.price_change_percentage_14d + "% / $ " + numberWithCommas(addDecimal(data.market_data.price_change_percentage_14d_in_currency["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: '30d Change',
          value: data.market_data.price_change_percentage_30d + "% / $ " + numberWithCommas(addDecimal(data.market_data.price_change_percentage_30d_in_currency["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: '60d Change',
          value: data.market_data.price_change_percentage_60d + "% / $ " + numberWithCommas(addDecimal(data.market_data.price_change_percentage_60d_in_currency["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: '200d Change',
          value: data.market_data.price_change_percentage_200d + "% / $ " + numberWithCommas(addDecimal(data.market_data.price_change_percentage_200d_in_currency["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: '1y Change',
          value: data.market_data.price_change_percentage_7d + "% / $ " + numberWithCommas(addDecimal(data.market_data.price_change_percentage_7d_in_currency["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'All Time High',
          value: data.market_data.ath_change_percentage["usd"] + "% / $ " + numberWithCommas(addDecimal(data.market_data.ath["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'All Time Low',
          value: data.market_data.atl_change_percentage["usd"] + "% / $ " + numberWithCommas(addDecimal(data.market_data.atl["usd"]))
        },
        {
          divider: true,
          inset: true
        },
        {
          header: this.coin.name + " Supply"
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'Circulating Supply',
          value: numberWithCommas(data.market_data.circulating_supply)
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'Total Supply',
          value: numberWithCommas(data.market_data.circulating_supply)
        },
        {
          divider: true,
          inset: true
        },
        {
          title: 'Max Supply',
          value: data.market_data.max_supply !== null ? numberWithCommas(data.market_data.max_supply) : "No Data"
        }
      ]
      this.fillData();
    },
    methods: {
      percentChangeHandler(price) {
        if (Math.sign(price) === 1) {
          this.percentColor = "green darken-1"
          this.textColor = "green--text"
          this.textShade = 'text--darken-1'
          return price
        }
        this.percentColor = "red darken-2"
        this.textColor = "red--text",
          this.textShade = 'text--darken-2'
        return price
      },
    }
  };
</script>

<style>
  .small-container {
    max-width: 900px;
  }
</style>