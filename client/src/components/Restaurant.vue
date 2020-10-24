<template>
  <v-card class="mb-5">
      <v-card-title>Restaurant : {{ nom }}</v-card-title>
      <v-card-text>Cuisine : {{ cuisine }}</v-card-text>
      <v-card-text>Note : {{ note }}</v-card-text>
      <v-card-actions>
        <v-btn @click="envoieRequeteFetchDelete()">Supprimer</v-btn>
        <v-btn @click="modificationRestaurant()">Modifier</v-btn>
      </v-card-actions> 
  </v-card>
</template>

<script>

export default {
  props: {
    id: String,
    nom: String,
    cuisine: String,
    note: Number
  },
  methods: {
    envoieRequeteFetchDelete: function ()  {
      let url = "http://localhost:8080/api/restaurants/" + this.id;
      this.$emit('suprime');
      fetch(url, {
        method: "DELETE",
      })
        .then( (responseJSON) =>{
          responseJSON.json().then(function (res) {
            // Maintenant res est un vrai objet JavaScript
            console.log(res);
          });
        })
        .catch( (err) =>{
          console.log(err);
        });
    },
    modificationRestaurant: function(){
       //TODO: a faire 
    }
  },
};
</script>