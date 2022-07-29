<template>
  <v-container>
    <v-app-bar
        app
        color="white"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Name"
            class="shrink mt-1"
            contain
            min-width="150"
            width="150"
            src="../assets/finterra_logo.svg"
            transition="scale-transition"
        />
      </div>

      <v-spacer></v-spacer>

      <!--    <v-btn-->
      <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
      <!--        target="_blank"-->
      <!--        text-->
      <!--    >-->
      <!--      <span class="mr-2">Latest Release</span>-->
      <!--      <v-icon>mdi-open-in-new</v-icon>-->
      <!--    </v-btn>-->
    </v-app-bar>
  </v-container>

</template>

<script>
export default {
  name: "AppBar"
}
</script>

<style scoped>

</style>