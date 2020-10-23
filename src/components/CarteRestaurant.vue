<template>
  <v-container>
    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input type="text" name="nom" required v-model="name" />
      </label>
      <label>
        Cuisine :
        <input type="text" name="cuisine" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>

    <h1>Nombre de restaurants : {{ nbRestaurantsTotal }}</h1>
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
    <p>Nombre total de pages : {{ nbPagesTotal }}</p>
    <tr
          v-for="(r, index) in restaurants" :key="index"
          >
          <Restaurant
          @suprime="getRestaurantsFromServer()"
          :id="r._id"
          :nom="r.name"
          :cuisine="r.cuisine"
          :note="r.note"
          />
    </tr>
  </v-container>
</template>

<script>
import Restaurant from './Restaurant'

export default {
  components:{
    Restaurant
  },
  data: () => ({
    restaurants: [],
    name: "",
    cuisine: "",
    nbRestaurantsTotal: 0,
    page: 1,
    pageSize: 10,
    nbPagesTotal: 0
  }),
  mounted () {
    console.log("oskour avant l'affichage");
    this.getRestaurantsFromServer();
  },
  methods: {
    calculNoteMoyenne: function() {
      for (let r of this.restaurants) {
        console.log(r);
        if (r.grades === undefined) {
          r.note = "NA";
        } else {
          let moyenne = 0;
          let sommeTotal = 0;
          for (let note of r.grades) {
            sommeTotal += note.score;
          }
          moyenne = sommeTotal / r.grades.length;
          console.log(moyenne);
          r.note = moyenne;
        }
      }
    },
    pagePrecedante: function() {
      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante: function() {
      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer: function() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            console.log(resJS);
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pageSize
            );
            this.calculNoteMoyenne();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    supprimerRestaurant: function(index) {
      this.restaurants.splice(index, 1);
    },
    ajouterRestaurant: async function(event) {
      console.log(event)
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);
      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
          });
        })
        .catch((err) => {
          console.log(err);
        });

      this.name = "";
      this.cuisine = "";
      this.getRestaurantsFromServer();
    },
    getColor: function(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>
