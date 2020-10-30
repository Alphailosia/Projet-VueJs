<template>
  <v-container>
    <h1>Détail du restaurant : </h1>
    <img :src="addImage()">  
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
    <CarteDesPlats/>
  </v-container>
</template>

<script>
import CarteDesPlats from "./CarteDesPlats";

export default {
  name: "restaurant",
  components: {
    CarteDesPlats
  },
  data: () => ({
    resto: {},
    url: "",
    images: [
      "https://cdn.discordapp.com/attachments/762755906634907659/771743169515094023/restaurant-pre-sale-interieur-2-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743447224156200/wagon-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743531672010762/pupetta-4-le-marais-mood-restaurant-le-marais-paris-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743619505193001/restaurant-bio-bara-soup-salle-interieure-7908-118-200x300.png",
      "https://lh3.googleusercontent.com/proxy/6SXYlS_aUaorSrhLvH4j3j41ydRrjOTfovnC7dr11K-nR7pDiorfrtuOQDs7uTOXpQfpmMg-ysg8WsRWQyniBIsyuWrDu-pmx2wZILnP-lr6JMmtWDSI-waKW5LRT_bsGYU5appc",
      "https://oaformation.com/wp-content/uploads/2018/05/D%C3%A9coration-restaurant-200x300.jpg",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743771875606558/mg-2178-1-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743953304682536/IMG_6807_300x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743956642824212/restaurante-03-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771744025468207114/57180308.png"
    ]
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
    calculNoteMoyenne: function () {
      for (let r of this.restaurants) {
        console.log(r);
        if (r.grades === undefined) {
          r.note = NaN;
        } else {
          let moyenne = 0;
          let sommeTotal = 0;
          for (let note of r.grades) {
            sommeTotal += note.score;
          }
          moyenne = sommeTotal / r.grades.length;
          console.log(moyenne);
          r.note = Math.round(moyenne);
        }
      }
    },
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
    },
    addImage: function (){
      let index = Math.random()*9;
      index = Math.round(index);
      return this.images[index];
    } 
  },
};
</script>