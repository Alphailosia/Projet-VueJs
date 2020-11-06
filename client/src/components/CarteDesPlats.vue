<template>
  <v-container>
    <h1>Nos Plats</h1>
    <h2>Hors d'œuvres</h2>
    <ul>
      <v-card v-for="(ho, index) in horsdOeuvre" :key="index">
          <v-card-title>{{ ho.name }}</v-card-title>
          <img :src="ho.photo" alt="photo">
          <v-card-text> {{ ho.description }} </v-card-text>
          <v-card-text> {{ ho.prix }}€ </v-card-text>
      </v-card>
    </ul>
    <h2>Plats Du Jour</h2>
    <ul>
      <v-card v-for="(pl, index) in platDuJour" :key="index">
          <v-card-title>{{ pl.name }}</v-card-title>
          <img :src="pl.photo" alt="photo">
          <v-card-text> {{ pl.description }} </v-card-text>
          <v-card-text> {{ pl.prix }}€ </v-card-text>
      </v-card>
    </ul>
    <h2>Dessert</h2>
    <ul>
      <v-card v-for="(de, index) in dessert" :key="index">
          <v-card-title>{{ de.name }}</v-card-title>
          <img :src="de.photo" alt="photo">
          <v-card-text> {{ de.description }} </v-card-text>
          <v-card-text> {{ de.prix }}€ </v-card-text>
      </v-card>
    </ul>
  <v-btn @click="affichePlatDuJour()">Plat du Jour</v-btn>
  <v-btn @click="afficheMenuGastro()">Menu Gastronomique</v-btn>
  <div v-if="togglePlatDuJour">
    <h1>Plat du Jour</h1>
    <Menu
    :ho="horsdOeuvre[0]"
    :pl="platDuJour[0]"
    :de="dessert[0]"
    />
  </div>
  <div v-if="toggleMenuGastronomique">
    <h1>Menu Gastronomique</h1>
    <Menu
    :ho="horsdOeuvre[1]"
    :pl="platDuJour[1]"
    :de="dessert[1]"
    />
  </div>
  </v-container>
</template>

<script>
import Menu from "./Menu"
import Plats from "../plats.json"

export default {
  name: "cartedesplats",
  components: {
    Menu
  },
  data: () => ({
    horsdOeuvre: [],
    platDuJour: [],
    dessert: [],
    carte: [],
    lejson: [],
    togglePlatDuJour: false,
    toggleMenuGastronomique: false
  }),
  mounted() {
      this.lejson = Plats;
      this.getCarteFromJson();
  },
  methods: {
      getCarteFromJson: function(){
          let index = Math.round(Math.random()*4);
          console.log(index);
          this.carte = Plats[index];
          console.log(this.carte)
          this.getPlatFromCarte();
      },
      getPlatFromCarte: function(){
          console.log("ho");
          for(let ho of this.carte[1].horsdoeuvre){
              this.horsdOeuvre.push(ho);
          }
          console.log("plat");
          for(let pl of this.carte[2].platjour){
              this.platDuJour.push(pl);
          }
          console.log("dessert");
          for(let d of this.carte[3].dessert){
              this.dessert.push(d);
          }
      },
      affichePlatDuJour: function(){
        this.togglePlatDuJour = !this.togglePlatDuJour;
      },
      afficheMenuGastro: function(){
        this.toggleMenuGastronomique = !this.toggleMenuGastronomique;
      }
  }
};
</script>