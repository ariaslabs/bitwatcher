<template>
  <v-footer padless>
    <v-card 
    flat
    tile
    class="flex py-5"
    >
    <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <v-card-text >
              <div class="d-flex align-center">
                <v-img
                class="mr-2 hover float-left"
                src="../assets/images/bitwatcher.png"
                max-height="35"
                max-width="35"
                contain
                @click="$router.push('/')"
                ></v-img>
                <h4 class="">BITWATCHER</h4>
              </div>
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-text>

            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      
      
      <v-card-text>

      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  links: []
}
</script>

<style>

</style>