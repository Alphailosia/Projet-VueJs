<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
     
    </v-app-bar>

    <v-main>
      <CarteRestaurant/>
    </v-main>
  </v-app>
</template>

<script>
import CarteRestaurant from './components/CarteRestaurant'

export default {
  name: 'App',

  components: {
    CarteRestaurant,
  },

  data: () => ({
    //
  }),
};
</script>