<template>
  <v-container>
    <h1>Ajouter un restaurant</h1>
    <form @submit.prevent="ajouterRestaurant()">
      <label>
        Nom : <input type="text" name="nom" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input type="text" name="cuisine" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>
    <h1>Info page :</h1>
    <p> Nombre de restaurants : {{ nbRestaurantsTotal }}, Nombre total de pages : {{ nbPagesTotal }}</p>
    <p>
      Nombre de restaurants par page
      <input
        @change="getRestaurantsFromServer()"
        type="range"
        min="5"
        max="100"
        step="5"
        v-model="pageSize"
      />
      {{ pageSize }}
    </p>
    <v-pagination
      v-model="page"
      :total-visible="7"
      :length="nbPagesTotal"
      @input="getRestaurantsFromServer()"
      circle
    ></v-pagination>

    <h1>Rechercher un restaurant</h1>
    <form @submit.prevent="getRestaurantsFromServer()">
      <label>
        <input placeholder="Search..." class="form-control" type="text" name="name" v-model="name" />
      </label>
      <button>Rechercher</button>
    </form>
    <br>
    <tr v-for="(r, index) in getFiltredRestaurant" :key="index">
      <CarteRestaurants
        @refresh="getRestaurantsFromServer()"
        :id="r._id"
        :nom="r.name"
        :cuisine="r.cuisine"
        :note="r.note"
      />
    </tr>
  </v-container>
</template>

<script>
import CarteRestaurants from "./CarteRestaurants";

export default {
  components: {
    CarteRestaurants,
  },
  data: () => ({
    restaurants: [],
    name: "",
    nom: "",
    cuisine: "",
    nbRestaurantsTotal: 0,
    page: 1,
    pageSize: 10,
    nbPagesTotal: 0,
  }),
  mounted() {
    console.log("Avant l'affichage");
    this.getRestaurantsFromServer();
  },
  methods: {
    calculNoteMoyenne: function () {
      for (let r of this.restaurants) {
        console.log(r);
        if (r.grades === undefined) {
          r.note = NaN;
        } else {
          let moyenne = 0;
          let sommeTotal = 0;
          for (let note of r.grades) {
            sommeTotal += note.score;
          }
          moyenne = sommeTotal / r.grades.length;
          console.log(moyenne);
          r.note = Math.round(moyenne);
        }
      }
    },
    calculNbPageMax: function () {
      let nbReelPage = this.nbRestaurantsTotal / this.pageSize;
      let pageRound = Math.round(nbReelPage);
      console.log(nbReelPage);
      if ( nbReelPage > pageRound ) {
        this.nbPagesTotal = pageRound+1;
      } else {
        this.nbPagesTotal = pageRound;
      }
    },
    getRestaurantsFromServer: function () {
      console.log(this.page);
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + (this.page - 1);
      url += "&pagesize=" + this.pageSize;
      if(this.name!==""){
        url += "&name=" + this.name;
      }
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            console.log(resJS);
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.calculNbPageMax();
            this.calculNoteMoyenne();
            if(this.restaurants.length===0){
              this.page--;
              this.getRestaurantsFromServer();
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ajouterRestaurant: async function () {
      const pms = {
        nom: this.nom,
        cuisine: this.cuisine,
      };

      const url = new URL("http://localhost:8080/api/restaurants"),
        params = pms;
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      const res = await fetch(url, { method: "POST" });
      const json = await res.json;
      console.log(json.data);
      this.getRestaurantsFromServer();
      this.nom = "";
      this.cuisine = "";
    },
  },
  computed:{
    getFiltredRestaurant: function(){
      return this.restaurants.filter(resto => {
        return resto.name.toLowerCase().includes(this.name.toLowerCase());
      });
    }
  }
};
</script>
