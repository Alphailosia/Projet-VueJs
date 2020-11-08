<template>
  <v-card class="organisation">
    <div id="oskour">
    <v-card-title>Restaurant : {{ nom }}</v-card-title>
      </div>
    <v-card-text>Cuisine : {{ cuisine }}</v-card-text>
    <v-card-text>Note : {{ note }}</v-card-text>
    <v-card-actions id="boutons">
      <router-link :to="'/restaurant/'+id" style="text-decoration: none" >
      <v-btn v-if="!modifResto && !deleteResto" >Détails</v-btn>
      </router-link>
      <v-btn v-if="modifResto && !deleteResto" @click="formModifRestaurant()"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn v-if="!modifResto && deleteResto" @click="envoieRequeteFetchDelete()"><v-icon>mdi-delete</v-icon></v-btn>
    </v-card-actions>
     <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Modification des restaurants</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nom*"
                  name="nom"
                  v-model="resto.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                
              >
                <v-text-field
                  label="Cuisine*"
                  name="cuisine"
                  v-model="resto.cuisine"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                
              >
                <v-text-field
                  label="Coordonnée 1*"
                  name="coord1"
                  v-model="resto.address.coord[0]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Coordonnée 2*"
                  name="coord2"
                  v-model="resto.address.coord[1]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Ville*"
                  name="borough"
                  v-model="resto.borough"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Bâtiment"
                  name="building"
                  v-model="resto.address.building"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Rue"
                  name="street"
                  v-model="resto.address.street"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Code Postal"
                  name="zipcode"
                  v-model="resto.address.zipcode"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="fermerDialogue()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="modificationRestaurant()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    formDisabled: Boolean,
    resto: Object,
  },
  data: () => ({
    dialog: false,
    resto2:{
    }
  }),
  mounted() {
    this.resto2=this.resto;
  },
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
      this.dialog = true;
    },
    modificationRestaurant: async function () {
      const pms = {
        nom: this.resto.name,
        cuisine: this.resto.cuisine,
        coord1: this.resto.address.coord[0],
        coord2: this.resto.address.coord[1],
        borough: this.resto.borough,
        building: this.resto.address.building,
        street: this.resto.address.street,
        zipcode: this.resto.address.zipcode,
      }
      console.log("modif sur ",pms)
      const url = new URL('http://localhost:8080/api/restaurants/'+this.id),
        params = pms
      Object.keys(params).forEach((key) =>url.searchParams.append(key, params[key]));
      const res = await fetch(url,{method:"PUT"});
      const json = await res.json;
      console.log(json.data);
      this.$emit("refresh");
      this.dialog=false;
    },
    fermerDialogue: function(){
      this.nom=this.resto2.name;
      this.cuisine=this.resto2.cuisine;
      this.resto.name=this.resto2.name;
      this.resto.cuisine=this.resto2.cuisine;
      this.resto.borough=this.resto2.borough;
      this.resto.address.coord[0]=this.resto2.address.coord[0];
      this.resto.address.coord[1]=this.resto2.address.coord[1];
      this.resto.address.building=this.resto2.address.building;
      this.resto.address.street=this.resto2.address.street;
      this.resto.address.zipcode=this.resto2.address.zipcode;
      this.dialog=false;
      console.log(this.resto2);
      
    }
  }
};
</script>
<style scoped>
#oskour{
  display:flex;
  justify-content: space-between; 
  margin-top: 20px;
}

#boutons{
    display: flex;
    justify-content: flex-end;
}

.organisation {
  width: 40%;
  margin-left: 30px;
  margin-top: 30px;
}
</style>