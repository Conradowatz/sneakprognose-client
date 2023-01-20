<template>
  <DataContainer id="movies-container" title="Filme">
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="confidence-cell">Wkt.</th>
          <th>Film</th>
          <th>Rating</th>
          <th>Start</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sneak, index) in sneaks">
          <td>{{ index + 1 }}</td>
          <td class="confidence-cell"><div class="confidence" :style=" { width: 100*sneak.confidence/maxConfidence+'%' }"/></td>
          <td><a :href="`https://www.themoviedb.org/movie/${sneak.movie_tmdbId}`" target="_blank">{{ sneak.movie_name }}</a> <div class="genres"> {{ sneak.movie_genres }}</div></td>
          <td class="rating">{{ sneak.movie_rating == 0 ? "?" : (sneak.movie_rating/10).toFixed(1) }}</td>
          <td class="daysTill">+{{ sneak.daysTill }}</td>
        </tr>
      </tbody>
    </table>
  </DataContainer>
</template>

<script>
import DataContainer from "@/components/DataContainer.vue";
export default {
  name: "MovieTable",
  components: {DataContainer},
  props: ["cinemaId"],
  watch: {
    cinemaId() {
      this.refreshMovies();
    }
  },
  methods: {
    refreshMovies() {
      this.$api.getSneaks(this.cinemaId).then(sneaks => {
        this.sneaks = sneaks;
        for (let sneak of sneaks) {
          let confidence = parseFloat(sneak.confidence);
          if (confidence > this.maxConfidence) {
            this.maxConfidence = confidence;
          }
        }
      })
    }
  },
  data() {
    return {
      sneaks: [],
      maxConfidence : 0
    }
  },
  mounted() {
    this.refreshMovies();
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  padding-left: 10px;
}
td, th {
  padding: 5px;
}
th {
  text-align: start;
  background: #130b38;
  color: white;
}
tr:nth-child(even) {
  background: #dedede;
}
td:first-child, th:first-child {
  padding-left: 20px;
}
td:last-child, th:last-child {
  padding-right: 20px;
}
.confidence {
  height: 15px;
  background: #252525;
  width: 0;
}
.confidence-cell {
  width: 60px;
}
@media screen and (max-width: 450px) {
  .confidence-cell {
    display: none;
  }
}
.daysTill, .rating {
  text-align: right;
}
.genres {
  width: fit-content;
  color: #5e5e5e;
  font-size: 14px;
}
</style>