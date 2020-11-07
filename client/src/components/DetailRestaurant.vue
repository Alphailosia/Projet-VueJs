<template>
  <v-container>
    
    <h1 class="title-restaurant" id="nom-resto">{{ resto.name }}</h1>
    <div class="informations-container">
      <img :src="addImage()" alt="image resto" />
      <div class="informations">
        <p>Cuisine : {{ resto.cuisine }}</p>
        <p>Note : {{ note }}</p>
        <p>Ville : {{ resto.borough }}</p>
      </div>
    </div>
    <div class="map-container">
      <h2 class="title-map">Localisation</h2>
      <div class="map">
      <iframe
        title="resto map"
        width="100%"
        height="400px"
        :src="url"
        style="border-radius: 20px"
      ></iframe>
      </div>
    </div>
    <CarteDesPlats />
 
  </v-container>
</template>

<script>
import CarteDesPlats from "./CarteDesPlats";

export default {
  name: "restaurant",
  components: {
    CarteDesPlats,
  },
  data: () => ({
    resto: {},
    url: "",
    images: [
      "https://cdn.discordapp.com/attachments/762755906634907659/771743169515094023/restaurant-pre-sale-interieur-2-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743447224156200/wagon-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743531672010762/pupetta-4-le-marais-mood-restaurant-le-marais-paris-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743619505193001/restaurant-bio-bara-soup-salle-interieure-7908-118-200x300.png",
      "https://mazaroca.com/wp-content/uploads/2018/12/restaurante-03-200x300.jpg",
      "https://oaformation.com/wp-content/uploads/2018/05/D%C3%A9coration-restaurant-200x300.jpg",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743771875606558/mg-2178-1-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743953304682536/IMG_6807_300x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771743956642824212/restaurante-03-200x300.png",
      "https://cdn.discordapp.com/attachments/762755906634907659/771744025468207114/57180308.png",
    ],
    note: 0,
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
      if (this.resto.grades === undefined) {
        this.note = "Non renseigné";
      } else {
        let moyenne = 0;
        let sommeTotal = 0;
        for (let note of this.resto.grades) {
          sommeTotal += note.score;
        }
        moyenne = sommeTotal / this.resto.grades.length;
        console.log(moyenne);
        this.note = Math.round(moyenne) + "";
      }
    },
    getRestoFromeServer: async function () {
      let url = "http://localhost:8080/api/restaurants/";
      url += this.id;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            this.resto = resJS.restaurant;
            console.log(this.resto);
            this.geolocate();
            this.calculNoteMoyenne();
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
    addImage: function () {
      let index = Math.random() * 9;
      index = Math.round(index);
      console.log(index);
      return this.images[index];
    },
  },
};
</script>

<style scoped>


.title-menu {
  text-align: center;
  height: 3%;
}

.menu-items {
  margin-top: 15%;
}


.title-restaurant {
  line-height: 200px;
  font-size: 3em;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: center;
}

.informations-container {
  display: flex;
  justify-content: center;
}

.informations {
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.map-container {
  width: 100%;
  margin-top: 100px;
}

.title-map {
  text-align: center;
}

.map {
  margin-right: 100px;
  margin-left: 100px;
}


</style>
