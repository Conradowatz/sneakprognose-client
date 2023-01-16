<template>
  <DataContainer id="movies-container" title="Filme">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Wkt.</th>
          <th>Film</th>
          <th>Rating</th>
          <th>Kinostart</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sneak, index) in sneaks">
          <td>{{ index + 1 }}</td>
          <td class="confidence-cell"><div class="confidence" :style=" { width: 100*sneak.confidence/maxConfidence+'%' }"/></td>
          <td><a :href="`https://www.imdb.com/title/${sneak.movie_imdbId}`">{{ sneak.movie_name }}</a></td>
          <td class="rating">{{ (sneak.movie_rating/10).toFixed(1) }}</td>
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
  methods: {},
  data() {
    return {
      sneaks: [],
      maxConfidence : 0
    }
  },
  mounted() {
    this.$api.getSneaks(this.cinemaId).then(sneaks => {
      this.sneaks = sneaks;
      for (let sneak of sneaks) {
        let confidence = parseFloat(sneak.confidence);
        if (confidence > this.maxConfidence) {
          this.maxConfidence = confidence;
        }
      }
      console.log(this.maxConfidence);
    })
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
  background: #8B0B45;
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
.daysTill, .rating {
  text-align: right;
}
</style>