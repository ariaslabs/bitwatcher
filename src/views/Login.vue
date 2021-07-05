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
        v-model="email"
        ></v-text-field>
        <v-text-field
        label="Password"
        type="password"
        v-model="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
        @click="login"
        color="primary"
        >Submit</v-btn>
        <v-btn @click="$router.push('/signup')">Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => {
    return {
      email: '',
      password: '',
      loader: false,
      disable: false,
      alert: {
        message: '',
        type: '',
        show: false
      },
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {

        this.$router.push('/');
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