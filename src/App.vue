<template>
  <div id="heading-back">
    <h1>SneakPrognose</h1>
  </div>
  <div v-if="selectedCinema" id="subheading-back">
    <img src="./assets/back.svg" alt="Zurück" class="back-button" @click="selectedCinema = null">
    <h2>{{ selectedCinema.name }}</h2>
  </div>
  <div id="main" v-if="cinemaList.length > 0">
    <CinemaSearch v-if="!selectedCinema" @select="selectCinema"/>
    <div class="two-split">
      <CinemaTable :cinemas="makeCinemaList()" @select="selectCinema" v-if="!selectedCinema && !isAddHint"/>
      <MovieTable :movies="movies" v-if="selectedCinema && !isAddHint"/>
      <HintTable v-if="selectedCinema && !isAddHint" @add="isAddHint = true"/>
    </div>
    <AddHintContainer v-if="isAddHint" cinema="KOTHAUSEN" @close="isAddHint = false"/>
  </div>
</template>

<script>
import CinemaSearch from "@/components/CinemaSearch.vue";
import MovieTable from "@/components/MovieTable.vue";
import CinemaTable from "@/components/CinemaTable.vue";
import HintTable from "@/components/HintTable.vue";
import AddHintContainer from "@/components/AddHintContainer.vue";
export default {
  components: {AddHintContainer, HintTable, CinemaTable, MovieTable, CinemaSearch},
  data() {
    return {
      selectedCinema: null,
      cinemaList: [{name: "Kino 1"}, {name: "Kino 2"}, {name: "Kino 3"}],
      movies: [],
      isAddHint: false
    };
  },
  methods: {
    selectCinema(chosenCinema) {
      this.selectedCinema = chosenCinema;
      this.addLastCinema(chosenCinema);
    },
    getLastCinemas() {
      if (localStorage.getItem("lastCinemas") == null) {
        return []
      } else {
        return JSON.parse(localStorage.getItem("lastCinemas"));
      }
    },
    addLastCinema(cinema) {
      let arr = this.getLastCinemas();
      if (arr.length >= 10) {
        arr = arr.slice(0, 9);
      }
      arr.unshift(cinema);
      localStorage.setItem("lastCinemas", JSON.stringify(arr));
    },
    makeCinemaList() {
      let lastCinemas = this.getLastCinemas();
      for (let i = 0; i < 10-lastCinemas.length; i++) {
        lastCinemas.push(this.cinemaList[Math.floor(Math.random()*this.cinemaList.length)])
      }
      return lastCinemas;
    }
  },
  mounted() {
    this.movies.push({rank: 1, name: "Shotgun Wedding - Ein knallhartes Team", confidence: 100, rating: "5/10", imdblink: "google.com"});
    this.movies.push({rank: 2, name: "M3GAN", confidence: 88, rating: "5/10", imdblink: "google.com"});
    this.movies.push({rank: 3, name: "Ein Mann namens Otto", confidence: 71, rating: "5/10", imdblink: "google.com"});
    this.movies.push({rank: 4, name: "Rache auf texanisch", confidence: 66, rating: "5/10", imdblink: "google.com"});
    this.movies.push({rank: 5, name: "Final Cut of the Dead", confidence: 63, rating: "5/10", imdblink: "google.com"});

    //this.$api.getAllCinemas().then(cinemas => this.cinemaList = cinemas);
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font: 16px Arial;
}
#heading-back {
  background: #8B0B45;
  width: 100%;
  height: 60px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 60%);
  padding-top: 20px;
  padding-bottom: 20px;
}
#subheading-back {
  margin-top: -45px;
  background: #1b2358;
  width: 60%;
  height: 65px;
  clip-path: polygon(0% 0%, 100% 40%, 100% 70%, 0% 100%);
  padding-top: 35px;
  padding-right: 40%;
}
h1, h2 {
  padding: 0;
  margin: 0;
  text-align: center;
  color: white;
}
#main {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.two-split {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}
.back-button {
  position: absolute;
  filter: invert(100%);
  float: left;
  height: 40px;
  left: 10px;
}
.back-button:hover {
  cursor: pointer;
  background: #bababa;
  border-radius: 20px;
}
</style>
