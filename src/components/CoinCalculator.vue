<template>
  <v-card>
    <v-card-title>
      {{this.coin.name}} Converstion
    </v-card-title>
    <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
            filled
            @change="processCoin"
            :label="`${coin.name} (${coin.symbol})`"
            :value="coinAmount"
            type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
            filled
            @change="processFiat"
            :label="`United States Dollar (USD)`"
            v-model="fiatAmount"
            ></v-text-field>
          </v-col>
        </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    numberWithCommas,
    addDecimal
  } from "../functions/numberTools";

export default {
  data: () => {
    return {
      coinAmount: 0,
      fiatAmount: 0,
      convertionRate: 0
    } 
  },
  props: [
    'coin',
  ],
  created() {
    this.convertionRate = Number(this.coin.currentPrice.replace(',', ''))
    this.coinAmount = 1
    this.fiatAmount = numberWithCommas((this.coinAmount * this.convertionRate).toFixed(2))
  },
  methods: {
    processCoin(num) {
      this.coinAmount = Number(num)
      this.fiatAmount = numberWithCommas((this.coinAmount * this.convertionRate).toFixed(2))
    },
    processFiat(num) {
      this.fiatAmount = numberWithCommas(addDecimal(num))
      this.coinAmount = addDecimal(this.fiatAmount * this.convertionRate)
    }
  }
}
</script>

<style>

</style>