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
        <tr v-for="movie in movies">
          <td>{{ movie.rank }}</td>
          <td class="confidence-cell"><div class="confidence" :style=" { width: movie.confidence+'%' }"/></td>
          <td><a :href="movie.imdblink">{{ movie.name }}</a></td>
          <td>{{ movie.rating }}</td>
          <td>{{ getDaysTill(movie.release) }}</td>
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
  props: ["title", "movies"],
  methods: {
    getDaysTill() {
      return "+3";
    }
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
</style>