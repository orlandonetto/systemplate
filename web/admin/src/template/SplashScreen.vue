<template>
  <v-main class="background">
    <v-container fill-height fluid>
      <v-row class="justify-center align-center">
        <v-col cols="6" sm="5" md="4" lg="3">
          <v-img :src="require($vuetify.theme.dark? '@/assets/logo/logo-light.png': '@/assets/logo/logo-dark.png')"/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {};
</script>

<style>
</style>
