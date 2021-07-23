<template>
  <v-footer padless>
    <v-card 
    flat
    tile
    class="flex py-3"
    >
    <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn 
            v-for="link in links" 
            :key="link.name"  
            @click="$router.push(link.url)"
            text
            rounded
            class="my-1"
            >
              {{link.name}}
            </v-btn>
          </v-col>
          <v-col class="text-center py-4">
            {{ new Date().getFullYear() }} — <strong>ARIASLABS</strong>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => {
    return {
      links: [
        {
          name: 'Crypto',
          url: '/'
        },
        {
          name: 'Exchanges',
          url: '/exchanges'
        },
        // {
        //   name: 'Portfolio',
        //   url: '/portfolio'
        // },
        {
          name: 'Watchlist',
          url: '/watchlist'
        },
      ]
    }
  }
}
</script>

<style>

</style>