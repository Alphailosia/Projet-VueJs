<template>
  <v-card class="mb-5">
    <v-card-title>Restaurant : {{ nom }}</v-card-title>
    <v-card-text>Cuisine : {{ cuisine }}</v-card-text>
    <v-card-text>Note : {{ note }}</v-card-text>
    <v-card-actions>
      <v-btn @click="envoieRequeteFetchDelete()">Supprimer</v-btn>
      <v-btn @click="formModifRestaurant()">Modifier</v-btn>
    </v-card-actions>
    <form v-if="formDisabled"   @submit.prevent="modificationRestaurant()">
      <label>
        Nom : <input type="text" name="nom" required v-model="nomModif" />
      </label>
      <label>
        Cuisine :
        <input type="text" name="cuisine" required v-model="cuisineModif" />
      </label>

      <button>Modifier</button>
    </form>
  </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    nom: String,
    cuisine: String,
    note: Number,
  },
  data: () => ({
    formDisabled: false,
    nomModif: "",
    cuisineModif: ""
  }),
  methods: {
    envoieRequeteFetchDelete: function () {
      let url = "http://localhost:8080/api/restaurants/" + this.id;
      this.$emit("suprime");
      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then(function (res) {
            // Maintenant res est un vrai objet JavaScript
            console.log(res);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formModifRestaurant: function(){
      this.formDisabled = !this.formDisabled;
    },
    modificationRestaurant: async function () {
      const pms = {
        nom: this.nomModif,
        cuisine: this.cuisineModif
      }
      console.log("modif sur ",pms)
      const url = new URL('http://localhost:8080/api/restaurants/'+this.id),
        params = pms
      Object.keys(params).forEach((key) =>url.searchParams.append(key, params[key]));
      const res = await fetch(url,{method:"PUT"});
      const json = await res.json;
      console.log(json.data);
      this.$emit("suprime");
      this.nomModif = "";
      this.cuisineModif ="";
    },
  },
};
</script>