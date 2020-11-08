<template>
  <v-card class="mb-5">
    <div id="oskour">
    <v-card-title>Restaurant : {{ nom }}</v-card-title>
      </div>
    <v-card-text>Cuisine : {{ cuisine }}</v-card-text>
    <v-card-text>Note : {{ note }}</v-card-text>
    <v-card-actions id="boutons">
      <v-btn v-if="!modifResto && !deleteResto" ><router-link :to="'/restaurant/'+id" style="text-decoration: none" >Détails</router-link></v-btn>
      <v-btn v-if="modifResto && !deleteResto" @click="formModifRestaurant()"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn v-if="!modifResto && deleteResto" @click="envoieRequeteFetchDelete()"><v-icon>mdi-delete</v-icon></v-btn>
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
    modifResto: Boolean,
    deleteResto: Boolean,
    formDisabled: Boolean
  },
  data: () => ({
    nomModif: "",
    cuisineModif: ""
  }),
  methods: {
    envoieRequeteFetchDelete: function () {
      let url = "http://localhost:8080/api/restaurants/" + this.id;
      this.$emit("refresh");
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
      this.$emit("refresh");
      this.nomModif = "";
      this.cuisineModif ="";
    }
  }
};
</script>
<style scoped>
#oskour
{
  display:flex;
  justify-content: space-between; 
  margin-top: 20px;
}

#boutons{
    display: flex;
    justify-content: flex-end;
}
</style>