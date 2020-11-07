<template>
  <v-container>
    <v-card class="container">
      <div>
        <v-navigation-drawer permanent width="300">
          <v-list class="title-menu">
            <h2>Menu</h2>
          </v-list>
          <v-divider></v-divider>
          <v-list nav dense>
            <v-list-item link class="menu-items">
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Acceuil</v-list-item-title>
            </v-list-item>
            <v-list-item link class="menu-items">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Ajouter des restaurants</v-list-item-title>
            </v-list-item>
            <v-list-item link class="menu-items">
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>?</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>

      <div id="home">
        <div class="title-container">
          <h1 class="title-home">Restaurants</h1>
          <form @submit.prevent="getRestaurantsFromServer()" class="searchBar">
            <label>
              <input
                placeholder="Search..."
                @input="chercherResto()"
                class="form-control"
                type="text"
                name="name"
                v-model="name"
              />
              <v-alert v-if="this.name && this.restaurants.length > 0">
                {{ nbRestaurantsTotal }} restaurant<span
                  v-if="this.restaurants.length > 1"
                  >s</span
                >
                trouvé<span v-if="this.restaurants.length > 1">s</span>
              </v-alert>
              <div>
                <v-alert v-if="this.name && this.restaurants.length === 0">
                  <img
                    src="https://media.tenor.com/images/4077fe524ba38a05b97c37865167da9c/tenor.gif"
                    alt="gif"
                  />
                  0 restaurant trouvé
                </v-alert>
              </div>
            </label>
          </form>
        </div>
        <h1>Ajouter un restaurant</h1>
        <form @submit.prevent="ajouterRestaurant()">
          <label>
            Nom : <input type="text" name="nom" required v-model="nom" />
          </label>
          <label>
            Cuisine :
            <input type="text" name="cuisine" required v-model="cuisine" />
          </label>

          <button @click="snackbar = true">Ajouter</button>
          <v-snackbar :timeout="2000" v-model="snackbar" color="success">
            Le restaurant a bien été ajouté.
          </v-snackbar>
        </form>

        <br />
        <v-pagination
          v-model="page"
          :total-visible="7"
          :length="nbPagesTotal"
          @input="getRestaurantsFromServer()"
          circle
        ></v-pagination>
        <div id="resto">
          <tr v-for="(r, index) in restaurants" :key="index" class="pa-3">
            <CarteRestaurants
              @refresh="getRestaurantsFromServer()"
              :id="r._id"
              :nom="r.name"
              :cuisine="r.cuisine"
              :note="r.note"
            />
          </tr>
        </div>
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
      </div>
    </v-card>
  </v-container>
</template>

<script>
import CarteRestaurants from "./CarteRestaurants";
import { debounce } from "lodash";

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
    snackbar: false,
  }),
  watch: {
    groupe() {
      this.drawer = false;
    },
  },
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
      if (nbReelPage > pageRound) {
        this.nbPagesTotal = pageRound + 1;
      } else {
        this.nbPagesTotal = pageRound;
      }
    },
    getRestaurantsFromServer: function () {
      console.log(this.page);
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + (this.page - 1);
      url += "&pagesize=" + this.pageSize;
      if (this.name !== "") {
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
            if (this.restaurants.length === 0 && this.name === "") {
              this.page--;
              this.getRestaurantsFromServer();
            } else if (
              this.restaurants.length === 0 &&
              this.name !== "" &&
              this.page > 1
            ) {
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
    chercherResto: debounce(function () {
      this.getRestaurantsFromServer();
    }, 300),
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }
}

#home {
  width: 100%;
  justify-content: center;
  text-align: center;
}

#resto {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: auto;
  display: inline-block;
}

.title-container {
  position: relative;
  height: 200px;
}

.title-home {
  line-height: 200px;
  font-size: 5em;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.title-menu {
  text-align: center;
  height: 3%;
}

.searchBar {
  position: absolute;
  top: 0;
  right: 0;
}

.menu-items {
  margin-top: 15%;
}
</style>