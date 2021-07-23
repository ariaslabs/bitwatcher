<template>
  <div>
    <v-app-bar
      app
      elevate-on-scroll
      height="70px"
    >
      <v-img
        class="mr-2 hover"
        src="../assets/images/bitwatcher.png"
        max-height="45"
        max-width="45"
        contain
        @click="$router.push('/')"
      ></v-img>
      <v-toolbar-title class="hover" @click="$router.push('/')">BITWATCHER</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

  <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
    >
      <v-btn
      absolute
      right
      top
      icon
      @click="drawer = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-list
        class="mt-12"
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item
          v-for="link of links"
          :key="link.name"
          :to="link.url"
          link
          >
            <v-list-item-icon>
              <v-icon>mdi-{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{link.name}}</v-list-item-title>
          </v-list-item>
          <v-list-item 
          v-if="user.loggedIn"
          link
          to="/account"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block v-if="user.loggedIn" depressed
          @click="logout"
          >
            Logout
          </v-btn>
          <div v-else>
            <v-btn block class="mb-2" depressed @click="$router.push('/login')">
              <v-icon left>
                mdi-login
              </v-icon>
              Login
            </v-btn>
            <v-btn block depressed @click="$router.push('/signup')">
              <v-icon left>
                mdi-clipboard-edit
              </v-icon>
              Sign Up
            </v-btn>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase'
import { nanoid } from 'nanoid'

export default {
  data: () => {
    return {
      drawer: false,
      signedIn: false,
      links: [
        {
          name: 'Crypto',
          url: '/',
          icon: 'circle-multiple'
        },
        {
          name: 'Exchanges',
          url: '/exchanges',
          icon: 'transfer'
        },
        // {
        //   name: 'Portfolio',
        //   url: '/portfolio',
        //   icon: 'wallet'
        // },
        {
          name: 'Watchlist',
          url: '/watchlist',
          icon: 'star'
        },
      ]
    }
  },
  methods: {
    async logout() {
      firebase.auth().signOut()
      this.$router.go('/')

      const logoutMessage = {
        id: nanoid(),
        type: 'info',
        icon: 'logout',
        message: 'Successfully logged Out.'
      }
      
      this.$store.dispatch('addAlert', logoutMessage)
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style>

</style>