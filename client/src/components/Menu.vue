<template>
  <v-container>
    <v-card>
        <v-card-title>Hors d'oeuvre : {{ ho.name }}</v-card-title>
        <img :src="ho.photo" alt="photo">
        <v-card-text> {{ ho.description }} </v-card-text>
        <v-card-text> {{ ho.prix }}€ </v-card-text>
        <br>
        <v-card-title>Plat : {{ pl.name }}</v-card-title>
        <img :src="pl.photo" alt="photo">
        <v-card-text> {{ pl.description }} </v-card-text>
        <v-card-text> {{ pl.prix }}€ </v-card-text>
        <br>
        <v-card-title>Dessert : {{ de.name }}</v-card-title>
        <img :src="de.photo" alt="photo">
        <v-card-text> {{ de.description }} </v-card-text>
        <v-card-text> {{ de.prix }}€ </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
    props:{
        ho : Object,
        pl : Object,
        de : Object
    }
}
</script>