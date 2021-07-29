<template>
  <v-container class="small-container">
    <v-card max-width="800px" class="mx-auto mt-8">
      <v-form
      lazy-validation
      ref="form"
      v-model="valid"
      >
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-text-field label="Email" :rules="emailRules" type="email" v-model="email"></v-text-field>
          <v-text-field label="Email Again" :rules="[emailRules, emailConfirmationRule]" type="email" v-model="emailAgain"></v-text-field>
          <v-text-field label="First Name" :rules="nameRules" v-model="firstName"></v-text-field>
          <v-text-field label="Last Name" :rules="nameRules" v-model="lastName"></v-text-field>
          <v-text-field label="Password" :rules="passwordRules" type="password" v-model="password"></v-text-field>
          <v-text-field label="Password Again" :rules="[ passwordConfirmationRule, passwordRules]" type="password" v-model="passwordAgain"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!valid" @click="signIn" > 
            <v-progress-circular v-if="loader" indeterminate color="primary" size="20"></v-progress-circular>
            <span v-else>Submit</span>
          </v-btn>
          <v-btn @click="$router.push('/login')">Login</v-btn>
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
        emailAgain: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordAgain: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        loader: false,
        disable: false,
        alert: {
          message: '',
          type: '',
          show: false
        },
        nameRules: [
          v => !!v || 'Name is required',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          
        ]
      }
    },
    methods: {
      signIn() {
        try {
          this.loader = true;
          this.disable = true;
          this.email = this.email.trim();
          this.emailAgain = this.emailAgain.trim();
          this.firstName = this.firstName.trim();
          this.lastName = this.lastName.trim();
          this.password = this.password.trim();
          this.passwordAgain = this.passwordAgain.trim();
          if (this.email !== this.emailAgain) {
            this.emailErrorMessage = "Emails do not match."
            return
          }
          if (this.password !== this.passwordAgain) {
            this.passwordErrorMessage = "Passwords do not match."
            return
          }
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
              const user = firebase.auth().currentUser
              const usersRef = firebase.firestore().collection('users');
              try {
                usersRef.doc(user.uid).set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  email: this.email,
                  portfolio: [],
                  watchlist: []
                })
              } catch (err) {
                const errorMessage = {
                  id: nanoid(),
                  type: 'error',
                  icon: "alert-box",
                  message: err.message
                }
                this.$store.dispatch('addAlert', errorMessage)
              }
              this.loader = false;
              this.disable = false;
              this.$router.push('/');
            })
            .catch(err => {
              if (err) {
                const errorMessage = {
                  id: nanoid(),
                  type: 'error',
                  icon: "alert-box",
                  message: err.message
                }
                this.$store.dispatch('addAlert', errorMessage)
                this.disable = false;
                this.loader = false;
              }
            })
        } catch (err) {
          console.error(err);
          this.loader = false;
          this.disable = false;
        }
      },
      validate () {
        this.$refs.form.validate()
      },
    },
    computed: {
      passwordConfirmationRule() {
        return () => (this.password === this.passwordAgain) || 'Password must match'
      },
      emailConfirmationRule() {
        return () => (this.email === this.emailAgain) || 'Email must match'
      }
    }
  }
</script>

<style>

</style>