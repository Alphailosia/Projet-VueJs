<template>
  <v-container>
    <h1>Détail du restaurant : </h1>
    <p>Nom : {{ resto.name }}</p>
    <p>Cuisine : {{ resto.cuisine }}</p>
    <p>Ville : {{ resto.borough }}</p>
  </v-container>
</template>

<script>
export default {
  name: "restaurant",
  data: () => ({
    resto: {},
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getRestoFromeServer();
  },
  methods: {
    getRestoFromeServer: async function () {
      let url = "http://localhost:8080/api/restaurants/";
      url += this.id;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            console.log(resJS);
            this.resto = resJS.restaurant;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>