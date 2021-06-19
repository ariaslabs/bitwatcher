<template>
  <v-container>
    <v-card
    max-width="600px"
    class="mx-auto mt-7"
    >
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
        label="Email"
        ></v-text-field>
        <v-text-field
        label="Password"
        type="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
        color="primary"
        >Submit</v-btn>
        <v-btn>Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from '../services/firebase'

export default {
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithCredential()
      .then(() => {

      })
      .catch(err => {
        console.error(err);
      })
    }
  }
}
</script>

<style>

</style>