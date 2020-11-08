<template>
  <v-container>
    <router-link :to="'/'" style="text-decoration: none">
      <v-icon x-large>mdi-arrow-left-circle</v-icon>
    </router-link>
    <h1>Ajouter un restaurant</h1>
    <form @submit.prevent="ajouterRestaurant()">
      <label>
        Nom* : <input type="text" name="nom" required v-model="nom" />
      </label>
      <br>
      <label>
        Cuisine* :
        <input type="text" name="cuisine" required v-model="cuisine" />
      </label>
      <br>
      <label>
        Ville* :
        <input type="text" name="borough" required v-model="ville" />
      </label>
      <br>
      <label>
        Address :
        <br>
        Building :
        <input type="text" name="building" v-model="building" />
        <br>
        Coordonnée 1* :
        <input type="text" name="coord1" required v-model="c1" />
        <br>
        Coordonnée 2* :
        <input type="text" name="coord2" required v-model="c2" />
      </label>
        <br>
        Street :
        <input type="text" name="street" v-model="street" />
        <br>
        Zipcode :
        <input type="text" name="zipcode" v-model="zipcode" />
      <br>
      <button @click="snackbar = true">Ajouter</button>
      <v-snackbar :timeout="2000" v-model="snackbar" color="success">
        Le restaurant a bien été ajouté.
      </v-snackbar>
    </form>
  </v-container>
</template>
<script>
export default {
    data: () => ({
      nom: "",
      cuisine: "",
      ville:"",
      snackbar: false,
      reponse: "",
      c1:0,
      c2:0,
      building: "",
      street: "",
      zipcode: ""
    }),
  methods: {
    ajouterRestaurant: async function () {

      /*
      nom
      cuisine
      borough
      address (objet) : coord (array), street, zipcode
      grades (array) : score 

      */
      const pms = {
        nom: this.nom,
        cuisine: this.cuisine,
        borough: this.ville,
        coord1 : this.c1,
        coord2 : this.c2,
        bulding : this.bulding,
        street : this.street,
        zipcode : this.zipcode
      };

      const url = new URL("http://localhost:8080/api/restaurants"),
        params = pms;
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      const res = await fetch(url, { method: "POST" });
      const json = await res.json;
      console.log(json);
      this.nom = "";
      this.cuisine = "";
      this.ville = "";
      this.bulding = "";
      this.street = "";
      this.zipcode = "";
    },
  },
};
</script>