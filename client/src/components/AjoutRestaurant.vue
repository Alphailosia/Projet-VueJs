<template>
  <v-container>
    <router-link :to="'/'" style="text-decoration: none">
      <v-icon x-large>mdi-arrow-left-circle</v-icon>
    </router-link>
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
  </v-container>
</template>
<script>
export default {
    data: () => ({
      nom: "",
      cuisine: "",
      snackbar: false,
      reponse: ""
    }),
  methods: {
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
      this.nom = "";
      this.cuisine = "";
    },
  },
};
</script>