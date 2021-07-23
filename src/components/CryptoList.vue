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
  import { nanoid } from 'nanoid'

  export default {
    data: () => {
      return {
        search: ''
      }
    },
    methods: {
      handleWatchlistAction(item) {
        if(!this.user.loggedIn) {
          this.$router.push('/login');
          const errorMessage = {
            id: nanoid(),
            type: 'error',
            icon: 'login',
            message: 'Please login.'
          }
          
          this.$store.dispatch('addAlert', errorMessage)
        }

        for(const coinID of this.user.watchlist) {
          if(item.id === coinID) {
            this.$store.dispatch('removeFromWatchlist', item)
            return
          }
        }
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
        return this.$store.state.user
      }
    }
  }
</script>

<style>

</style>