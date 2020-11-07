<template>
  <v-container>
    <ul class="liste-plat">
    <v-card class="plat-choisi">
      <div class="plat">
      <v-card-title class="plat-title">Hors d'oeuvre : {{ ho.name }}</v-card-title>
      <img :src="ho.photo" alt="photo" class="plat-image"/>
      <div class="description-plat">
      <v-card-text> {{ ho.description }} </v-card-text>
      <v-card-text> {{ ho.prix }}€ </v-card-text>
      </div>
      </div>
    </v-card>
      <br />
      <v-card class="plat-choisi">
      <v-card-title>Plat : {{ pl.name }}</v-card-title>
      <img :src="pl.photo" alt="photo" />
      <v-card-text> {{ pl.description }} </v-card-text>
      <v-card-text> {{ pl.prix }}€ </v-card-text>
      </v-card>
      <br />
      <v-card class="plat-choisi">
      <v-card-title>Dessert : {{ de.name }}</v-card-title>
      <img :src="de.photo" alt="photo" />
      <v-card-text> {{ de.description }} </v-card-text>
      <v-card-text> {{ de.prix }}€ </v-card-text>
    </v-card>
    </ul>
  </v-container>
</template>

<script>
export default {
  props: {
    ho: Object,
    pl: Object,
    de: Object,
  },
};
</script>

<style scoped>

.liste-plat {
  display: flex;
  justify-content: center;
}

plat {
  width: auto;
  display:flex;
  flex-wrap: wrap;
  width: 50%;
}

.plat-title {
  width: 100%;
  
}
.description-plat {
  flex: 1;
}

.plat-choisi{
  width: 150%;
}

</style>