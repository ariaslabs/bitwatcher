<template>
  <v-container>
    <v-card max-width="600px" class="mx-auto mt-7">
      <v-form
      lazy-validation
      ref="form"
      v-model="valid"
      >
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field label="Email" :rules="required" v-model="email"></v-text-field>
        <v-text-field label="Password" type="password" :rules="required" v-model="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="login" :disabled="!valid" color="primary">Submit</v-btn>
        <v-btn @click="$router.push('/signup')">Signup</v-btn>
      </v-card-actions>
    </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import {
    nanoid
  } from 'nanoid'
  export default {
    data: () => {
      return {
        valid: false,
        email: '',
        password: '',
        loader: false,
        disable: false,
        alert: {
          message: '',
          type: '',
          show: false
        },
        required: [
          v => !!v || "Input is required."
        ]
      }
    },
    methods: {
      login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            const errorMessage = {
              id: nanoid(),
              type: 'error',
              icon: "alert-box",
              message: err.message
            }
            this.$store.dispatch('addAlert', errorMessage)
          })
      }
    }
  }
</script>

<style>

</style>