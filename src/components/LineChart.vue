<template>
  <div>
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import moment from 'moment'
import {
    numberWithCommas,
    addDecimal
  } from "../functions/numberTools";

export default {
  name: 'LineChart',
  props: [
    "label",
    "coinData"
  ],
  data: () => {
    return {
      //dataLabels: ["1", "2" , "3"],
      values: [1,2,4],
      formattedData: {}
    }
  },
  async mounted() {
    const xLabels = this.coinData.map(item => {
      return moment(item[0]).format("HH:mm MMM DD, YYYY")
    })

    const data = this.coinData.map(item => {
        return addDecimal(item[1])
    })

    this.formattedData = {
        type: "line",
        data: {
          labels: xLabels,
          datasets: [
            {
              label: this.label,
              data: data,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3
            },
          ]
        },
        options: {
          responsive: true,
          lineTension: 2,
          elements: {
              point:{
                  radius: 0
              }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  padding: 0,
                  callback: function(value, index, values) {
                        return '$' + numberWithCommas(addDecimal(value));
                    }
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                }
              }
            ],
            xAxes: [{
                type: 'time',
                ticks: {
                  padding: 5,
                  autoSkip: true,
                  maxTicksLimit: 24
                }
            }]
          }
        }
      }

    const ctx = document.getElementById('line-chart');
    new Chart(ctx, this.formattedData);
  }
}
</script>
 
