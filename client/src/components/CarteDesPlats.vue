<template>
  <v-container>
    <title>Nos Plats</title>
    <h1>Hors d'œuvres</h1>
    <ul>
      <li v-for="(ho, index) in horsdOeuvre" :key="index">
          {{ ho.name }}
          <ul>
              <li> {{ ho.description }} </li>
              <li> {{ ho.photo }} </li>
              <li> {{ ho.prix }} </li>
          </ul>
      </li>
    </ul>
    <h1>Plats Du Jour</h1>
    <ul>
      <li v-for="(pl, index) in platDuJour" :key="index">
          {{ pl.name }}
          <ul>
              <li> {{ pl.description }} </li>
              <li> {{ pl.photo }} </li>
              <li> {{ pl.prix }} </li>
          </ul>
      </li>
    </ul>
    <h1>Dessert</h1>
    <ul>
      <li v-for="(de, index) in dessert" :key="index">
          {{ de.name }}
          <ul>
              <li> {{ de.description }} </li>
              <li> {{ de.photo }} </li>
              <li> {{ de.prix }} </li>
          </ul>
      </li>
    </ul>
  </v-container>
</template>

<script>
import Plats from "../plats.json"

export default {
  name: "cartedesplats",
  data: () => ({
    horsdOeuvre: [],
    platDuJour: [],
    dessert: [],
    carte: [],
    lejson: []
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
      }
  }
};
</script>