<template>
  <div>
    <v-data-table :headers="headers" :items="coins" :loading="loader" :items-per-page="itemsPerPage" @click:row="listItemActions" hide-default-footer loading-text="Loading..." class="elevation-0">
      <template v-slot:item.watchlist="{ item }">
        <v-simple-checkbox
          :value="checkWatchlist(item)"
          off-icon="mdi-star-outline"
          @click.stop="handleWatchlistAction(item)"
          :ripple="false"
          on-icon="mdi-star"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center " >
          <v-img max-height="30" max-width="30" class="float-left mr-2 mr-sm-4" :src="item.image"></v-img>
          {{item.name}}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        search: ''
      }
    },
    methods: {
      handleWatchlistAction(item) {
        console.log('In the func')
        if(!this.user.loggedIn) {
          this.$router.push('/login');
        }

        for(const coinID of this.user.watchlist) {
          if(item.id === coinID) {
            console.log(coinID)
            //remove item
            console.log('Remove Item')//REMOVE_FROM_WATCHLIST
            this.$store.dispatch('removeFromWatchlist', item)
            return
          }
        }

        //addItem
        console.log("add Item")
        this.$store.dispatch('addToWatchlist', item)
      },
      checkWatchlist(item) {
        if(!this.user.loggedIn) {
          return false
        }

        for(const coinID of this.user.watchlist) {
          if(item.id === coinID) return true
        }
        return false
      }
    },
    props: [
      'headers',
      'coins',
      'tableTitle',
      'listItemActions',
      'loader',
      'itemsPerPage'
    ],
    computed: {
      user() {
        console.log(this.$store.state.user)
        return this.$store.state.user
      }
    }
  }
</script>

<style>

</style>