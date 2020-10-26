<template>
  <v-container>
    <h1>Détail du restaurant : </h1>
    <p>Nom : {{ resto.name }}</p>
    <p>Cuisine : {{ resto.cuisine }}</p>
    <p>Note : {{ resto.note }}</p>
    <p>Ville : {{ resto.borough }}</p>
    <iframe
      width="100%"
      height="400px"
      frameborder="0"
      scrolling="yes"
      marginheight="0"
      marginwidth="0"
      :src="url"
      style="border-radius: 20px"
    ></iframe>
  </v-container>
</template>

<script>
export default {
  name: "restaurant",
  data: () => ({
    resto: {},
    url: ""
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
            //console.log(resJS);
            this.resto = resJS.restaurant;
            console.log(this.resto);
            this.geolocate();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    geolocate: function () {
      let size = 0.003;
      let lat = this.resto.address.coord[1];
      let lgn = this.resto.address.coord[0];

      let lgnup = lgn + size;
      let lgndown = lgn - size;
      let latleft = lat - size;
      let latright = lat + size;

      this.url = `http://www.openstreetmap.org/export/embed.html?bbox=${lgndown}%2C${latleft}%2C${lgnup}%2C${latright}&layer=mapnik&marker=${lat}%2C${lgn}`;
    }
  },
};
</script>