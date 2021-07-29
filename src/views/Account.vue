<template>
  <div>
    <v-container class="small-container">
      <v-card max-width="600px" min-width="500px" class="mx-auto">
        <v-card-title>Account</v-card-title>
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-account
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
              <v-list-item-title>{{user.email}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <v-list-item-subtitle>Full Name</v-list-item-subtitle>
              <v-list-item-title>{{user.firstName}} {{user.lastName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <v-list-item-subtitle>First Name</v-list-item-subtitle>
              <v-list-item-title>{{user.firstName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <v-list-item-subtitle>Last Name</v-list-item-subtitle>
              <v-list-item-title>{{user.lastName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle></v-list-item-subtitle>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn class="" absolute right top @click="editOverlay = true">
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit Account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- Edit Overlay. -->
    <v-overlay :value="editOverlay">
      <v-card light min-width="400px">
        <v-form
        lazy-validation
        ref="form"
        v-model="valid"
        >
          <v-card-title>Edit Account</v-card-title>
          <v-card-text>
            <v-text-field label="First Name" :rules="required" v-model="newFirstName" :value="user.firstName" placeholder="First Name"></v-text-field>
            <v-text-field label="Last Name" :rules="required" v-model="newLastName" :value="user.lastName" placeholder="Last Name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn icon absolute top right @click="editOverlay = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <v-btn color="primary" @click="save(), editOverlay = false" :disabled="!valid">
              submit
            </v-btn>
            <v-btn @click="editOverlay = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        valid: false,
        editOverlay: false,
        newFirstName: '',
        newLastName: '',
        required: [
          v => !!v || "Input is required."
        ]
      }
    },
    methods: {
      save() {
        this.$store.dispatch('editUser', {
          firstName: this.newFirstName,
          lastName: this.newLastName
        })
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