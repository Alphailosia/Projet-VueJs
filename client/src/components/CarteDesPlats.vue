<template>
  <v-container>
    <h1 class="plats">Nos Plats</h1>
    <h2 class="type-plat">Hors d'œuvres</h2>
    <ul class="liste-plat">
      <v-card v-for="(ho, index) in horsdOeuvre" :key="index" class="plat">
        <v-card-title class="plat-title">{{ ho.name }}</v-card-title>
        <img :src="ho.photo" alt="photo" class="plat-image"/>
        <div class="description-plat">
          <v-card-text> {{ ho.description }} </v-card-text>
          <v-card-text> {{ ho.prix }}€ </v-card-text>
        </div>
      </v-card>
    </ul>
    <h2 class="type-plat">Plats Du Jour</h2>
    <ul class="liste-plat">
      <v-card v-for="(pl, index) in platDuJour" :key="index" class="plat">
        <v-card-title class="plat-title">{{ pl.name }}</v-card-title>
        <img :src="pl.photo" alt="photo" class="plat-image"/>
        <div class="description-plat">
          <v-card-text> {{ pl.description }} </v-card-text>
          <v-card-text> {{ pl.prix }}€ </v-card-text>
        </div>
      </v-card>
    </ul>
    <h2 class="type-plat">Dessert</h2>
    <ul class="liste-plat">
      <v-card v-for="(de, index) in dessert" :key="index" class="plat">
        <v-card-title class="plat-title">{{ de.name }}</v-card-title>
        <img :src="de.photo" alt="photo" class="plat-image"/>
        <div class="description-plat">
          <v-card-text> {{ de.description }} </v-card-text>
          <v-card-text> {{ de.prix }}€ </v-card-text>
        </div>
      </v-card>
    </ul>
    <v-btn @click="affichePlatDuJour()" :disabled="togglePlatDuJour">Plat du Jour</v-btn>
    <v-btn @click="affichePlatDuJour()" :disabled="!togglePlatDuJour">Menu Gastronomique</v-btn>
    <div v-if="togglePlatDuJour">
      <h1>Plat du Jour</h1>
      <Menu :ho="horsdOeuvre[0]" :pl="platDuJour[0]" :de="dessert[0]" />
    </div>
    <div v-if="!togglePlatDuJour">
      <h1>Menu Gastronomique</h1>
      <Menu :ho="horsdOeuvre[1]" :pl="platDuJour[1]" :de="dessert[1]" />
    </div>
  </v-container>
</template>

<script>
import Menu from "./Menu";
import Plats from "../plats.json";

export default {
  name: "cartedesplats",
  components: {
    Menu,
  },
  data: () => ({
    horsdOeuvre: [],
    platDuJour: [],
    dessert: [],
    carte: [],
    lejson: [],
    togglePlatDuJour: false,
  }),
  mounted() {
    this.lejson = Plats;
    this.getCarteFromJson();
  },
  methods: {
    getCarteFromJson: function () {
      let index = Math.round(Math.random() * 4);
      console.log(index);
      this.carte = Plats[index];
      console.log(this.carte);
      this.getPlatFromCarte();
    },
    getPlatFromCarte: function () {
      console.log("ho");
      for (let ho of this.carte[1].horsdoeuvre) {
        this.horsdOeuvre.push(ho);
      }
      console.log("plat");
      for (let pl of this.carte[2].platjour) {
        this.platDuJour.push(pl);
      }
      console.log("dessert");
      for (let d of this.carte[3].dessert) {
        this.dessert.push(d);
      }
    },
    affichePlatDuJour: function () {
      this.togglePlatDuJour = !this.togglePlatDuJour;
    },
  },
};
</script>

<style scoped>
.liste-plat {
  display: flex;
  justify-content: center;
}

.plat {
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

.plats {
  margin-top: 30px;
  text-align: center;
}

.type-plat {
  margin-top: 30px;
}
</style>