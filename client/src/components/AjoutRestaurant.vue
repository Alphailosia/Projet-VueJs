<template>
  <v-container>
    <router-link :to="'/'" style="text-decoration: none" >
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