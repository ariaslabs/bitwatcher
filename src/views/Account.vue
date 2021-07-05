<template>
  <div>

  </div>
</template>

<script>
export default {
  data: () => {
    return {
      
    }
  },
  created() {
    if(!this.user.loggedIn) {
      this.$router.push('/login');
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