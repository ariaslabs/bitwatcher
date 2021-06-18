<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-title>{{ coin.name }} Chart</v-card-title>
          <v-card-text>
            <LineChart :data="tickerData" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card>
          <v-card-title class="mb-3 text-justify">
            <v-img
              max-height="50"
              max-width="50"
              :src="coin.image.large"
            ></v-img>
            <h3 class="mx-3">{{ coin.name }}</h3>
            <v-spacer></v-spacer>
            <v-chip label class="">Rank #{{ coin.marketCapRank }}</v-chip>
          </v-card-title>
          <v-card-text class="mt-n4">
            <v-row>
              <v-col class="">
                <div>
                  <span
                    >{{ coin.name }} Price ({{
                      coin.symbol.toUpperCase()
                    }})</span
                  >
                  <div>
                    <h1 class="mt-2 mb-4">${{ coin.currentPrice }}</h1>
                    <v-chip color="green" class="text-right mr-3">
                      <span class="white--text">+24%</span>
                    </v-chip>
                    <span class="mr-3">{{ coin.priceChange24 }}</span>
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
          <v-card-actions>
            <v-btn text color="black" disabled> Description </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-card-text>
                <div v-html="coin.description"></div>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import LineChart from "../components/LineChart.vue";
import { numberWithCommas, addDecimal } from "../functions/numberTools";

export default {
  data: () => {
    return {
      show: false,
      tickerData: [],
      coin: {},
    };
  },
  components: {
    LineChart,
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

      this.tickerData = payloadTickerData.prices.map((item) => item[1])

    this.coin = {
      id: data.id,
      description: data.description["en"],
      image: data.image,
      website: data.links.homepage[0],
      marketCapRank: data.market_cap_rank,
      name: data.name,
      symbol: data.symbol,
      currentPrice: numberWithCommas(
        addDecimal(data.market_data.current_price["usd"])
      ),
      priceChange24: numberWithCommas(
        addDecimal(data.market_data.price_change_24h)
      ),
    };
    console.log(data);
  },
};
</script>

<style>
</style>