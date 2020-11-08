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
            <v-list-item @click="accueilRestaurant()" link class="menu-items">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="menu-props">Accueil des restaurants</v-list-item-title>
            </v-list-item>
            <router-link :to="'/ajout'" class="lien-ajout">
              <v-list-item link class="menu-items">
                <v-list-item-icon>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="menu-props">Ajouter des restaurants</v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item @click="modifierRestaurant()" class="menu-items">
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="menu-props">Modifier des restaurants</v-list-item-title>
            </v-list-item>
            <v-list-item @click="supprimerRestaurant()" class="menu-items">
              <v-list-item-icon>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="menu-props">Supprimer des restaurants</v-list-item-title>
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
              <v-icon>mdi-magnify</v-icon>
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
        <br />
        <v-pagination
          v-model="page"
          :total-visible="7"
          :length="nbPagesTotal"
          @input="getRestaurantsFromServer()"
          circle
        ></v-pagination>
        <div id="resto">
            <CarteRestaurants
              @refresh="getRestaurantsFromServer()"
              :index="index"
              :id="r._id"
              :nom="r.name"
              :cuisine="r.cuisine"
              :note="r.note"
              :modifResto="modifResto"
              :deleteResto="deleteResto"
              :resto="r"
              v-for="(r, index) in restaurants" :key="index"
            />
        </div>
        <p>
          Nombre de restaurants par page
          <input
            @change="getRestaurantsFromServer()"
            type="range"
            min="10"
            max="100"
            step="10"
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
    nbRestaurantsTotal: 0,
    page: 1,
    pageSize: 10,
    nbPagesTotal: 0,
    modifResto: false,
    deleteResto: false,
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
    modifierRestaurant: function () {
      this.modifResto = true;
      this.deleteResto = false;
      this.formDisabled = false;
      this.getRestaurantsFromServer();
    },
    supprimerRestaurant: function () {
      this.modifResto = false;
      this.deleteResto = true;
      this.formDisabled = false;
      this.getRestaurantsFromServer();
    },
    accueilRestaurant: function () {
      this.modifResto = false;
      this.deleteResto = false;
      this.formDisabled = false;
      this.getRestaurantsFromServer();
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
    margin: auto;
    width: auto;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: -30px;
    margin-top: -30px;
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
  height: 5%;
  font-family: Georgia, "Times New Roman", Times, serif;
  margin-top: 4%;
  font-size: 30px;
}

.menu-props {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 2;
}

.searchBar {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 20px;
}

.menu-items {
  margin-top: 15%;
}

.carte-resto :hover {
  /*-webkit-transform: scale(1.1);
	transform: scale(1.1);*/
  background-color: #dde8eb;
}

.form-control {
  border: solid 1px;
  border-radius: 4px;
}

.lien-ajout {
  text-decoration: none;
  color: black;
}
</style>