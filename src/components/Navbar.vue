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
      absolute
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
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: false
    }
  }
}
</script>

<style>

</style>