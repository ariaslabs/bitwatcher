<template>
  <div>
    <v-toolbar flat class="d-none d-sm-block">
      <v-btn small class="mr-2" 
      v-for="btn of btns" 
      :key="btn"
      v-if="checkRoute(btn.url)"
      @click="$router.push(btn.url)"
      >
        <v-icon left>
          {{btn.icon}}
        </v-icon>
        {{btn.title}}
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      btns: [ 
        {
          title: 'Watchlist',
          icon: 'mdi-star',
          url: '/watchlist'
        },
        {
          title: 'Portfolio',
          icon: 'mdi-chart-arc',
          url: '/portfolio'
        },
        {
          title: 'Cryto',
          icon: 'mdi-circle-multiple',
          url: '/'
        },
        {
          title: 'Exchanges',
          icon: 'mdi-transfer',
          url: '/exchanges'
        }
      ]
    }
  },
  methods: {
    checkRoute(url) {
      if(this.$route.path === url) return false
      return true
    }
  }
}
</script>

<style>

</style>