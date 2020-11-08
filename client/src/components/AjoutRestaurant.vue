<template>
  <v-container>
    <router-link :to="'/'" style="text-decoration: none">
      <v-icon x-large>mdi-arrow-left-circle</v-icon>
    </router-link>
    <h1 class="title-ajout">Ajouter un restaurant</h1>
    <v-card class="formulaire">
      <form @submit.prevent="ajouterRestaurant()">
        <label class="titre-champ"
          ><span class="number">1</span> Le restaurant :
        </label>
        <label class="champ">
          <div class="champ-nom">Nom<span class="obligatoire">*</span> :</div>
          <input
            placeholder="Nom..."
            type="text"
            name="nom"
            required
            v-model="nom"
            class="remplir"
          />
        </label>
        <label class="champ">
          <div class="champ-nom">
            Cuisine<span class="obligatoire">*</span> :
          </div>
          <input
            placeholder="Cuisine..."
            type="text"
            name="cuisine"
            required
            v-model="cuisine"
            class="remplir"
          />
        </label>
        <label class="titre-champ"
          ><span class="number">2</span> Adresse :
        </label>
        <label class="champ">
          <div class="champ-nom">
            Coordonnée 1<span class="obligatoire">*</span> :
          </div>
          <input
            placeholder="Longitude..."
            type="text"
            name="coord1"
            required
            v-model="c1"
            class="remplir"
          />
        </label>
        <label class="champ">
          <div class="champ-nom">
            Coordonnée 2<span class="obligatoire">*</span> :
          </div>
          <input
            placeholder="Latitude..."
            type="text"
            name="coord2"
            required
            v-model="c2"
            class="remplir"
          />
        </label>
        <label class="champ">
          <div class="champ-nom">Bâtiment :</div>
          <input
            placeholder="Bâtiment..."
            type="text"
            name="building"
            v-model="building"
            class="remplir"
          />
        </label>
        <label class="champ">
          <div class="champ-nom">Rue :</div>
          <input
            type="text"
            name="street"
            v-model="street"
            class="remplir"
            placeholder="Rue..."
          />
        </label>
        <label class="champ">
          <div class="champ-nom">Ville<span class="obligatoire">*</span> :</div>
          <input
            placeholder="Ville..."
            type="text"
            name="borough"
            required
            v-model="ville"
            class="remplir"
          />
        </label>
        <label class="champ">
          <div class="champ-nom">
          Code postal :
          </div>
          <input
            type="text"
            name="zipcode"
            v-model="zipcode"
            class="remplir"
            placeholder="Code postal..."
          />
        </label>
         <small>*indicates required field</small>
        <button @click="snackbar = true" class="btn">Ajouter</button>
        <v-snackbar :timeout="2000" v-model="snackbar" color="success">
          Le restaurant a bien été ajouté.
        </v-snackbar>
      </form>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    nom: "",
    cuisine: "",
    ville: "",
    snackbar: false,
    reponse: "",
    c1: "",
    c2: "",
    building: "",
    street: "",
    zipcode: "",
  }),
  methods: {
    ajouterRestaurant: async function () {
      const pms = {
        nom: this.nom,
        cuisine: this.cuisine,
        borough: this.ville,
        coord1: this.c1,
        coord2: this.c2,
        bulding: this.bulding,
        street: this.street,
        zipcode: this.zipcode,
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

<style scoped>
.title-ajout {
  line-height: 150px;
  font-size: 3em;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: center;
}

.formulaire {
  margin: 0 auto;
  width: 500px;
  height: 720px;
  border: solid 2px  #2a88ad;
  
}

.titre-champ {
  display: block;
  font-family: Georgia, "Times New Roman", Times, serif;
  /*margin: 20px 3%;*/
  color: #2a88ad;
  margin-bottom: 5px;
  font: normal 20px "Bitter", serif;
  padding: 20px;
}
.champ {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px 3%;
  font-size: 14px;
}

.champ-nom {
  width: 150px;
}

.btn {
  margin: 10px;
  float: right;
  background: #2a88ad;
    padding: 8px 20px 8px 20px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.12);
    font: normal 30px 'Bitter',serif;
    -moz-box-shadow: inset 0 2px 2px 0 rgba(255,255,255,0.17);
    -webkit-box-shadow: inset 0 2px 2px 0 rgba(255,255,255,0.17);
    box-shadow: inset 0 2px 2px 0 rgba(255,255,255,0.17);
    border: 1px solid #257c9e;
    font-size: 15px;
}

.obligatoire {
  color: red;
}

.remplir {
  border: solid 1px gray;
  display: inline-block;
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border: 2px solid #fff;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.33);
    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,0.33);
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.33);
}

.number {
  background: #2a88ad;
  padding: 5px 10px 5px 10px;
  border: 4px solid #fff;
  font-size: 14px;
  -webkit-border-radius: 50%;
  margin-left: -35px;
  color: #fff;
  margin-top: -3px;
}
</style>