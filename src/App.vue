<template>
  <v-app>
    <v-app-bar
      app
      
    >
    <v-toolbar-title class="hover" @click="$router.push('/')">BitWatcher</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="loggedIn">
      <v-btn icon>
        <v-avatar color="primary">
           <span class="white--text text-h6">CA</span>
        </v-avatar>
      </v-btn>
    </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    loggedIn: true
  }),
};
</script>

<style lang="scss">
  .hover {
    cursor: pointer;
  }

  tr {
    cursor: pointer;
  }
</style>
