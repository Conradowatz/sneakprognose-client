<template>
  <DataContainer title="Sneak einreichen" hasClose="true" @close="this.$router.push(`/cinema/${cinema.id}`)">
    <div class="addHintContainer">
      <form v-if="cinema">
        <div class="form-entry">
          <label>Kino</label>
          <div class="selected-movie">{{cinema.name}} {{cinema.city}}</div>
        </div>
        <div class="form-entry">
          <label>Datum</label>
          <input type="date" v-model="sneakDate">
        </div>
        <div class="form-entry">
          <label>Film</label>
          <MovieSearch v-if="!selectedMovie" @select="selectMovie"/>
          <div class="selected-movie" v-if="selectedMovie">
            <div>{{selectedMovie.name}} ({{selectedMovie.year}})</div>
            <a @click="selectedMovie = null">x</a>
          </div>
        </div>
        <input type="button" value="Einreichen" @click="submit" :disabled="passesChecks()">
      </form>
      <div class="error" v-if="error">
        {{ this. error }}
      </div>
    </div>
  </DataContainer>
</template>

<script>
import DataContainer from "./DataContainer.vue";
import MovieSearch from "@/components/MovieSearch.vue";
export default {
  name: "AddHintContainer",
  components: {MovieSearch, DataContainer},
  data() {
    return {
      cinema: null,
      sneakDate: "",
      selectedMovie: null,
      error: null
    }
  },
  mounted() {
    if (!isNaN(parseInt(this.$route.params.cinemaId))) {
      this.$api.getCinema(this.$route.params.cinemaId).then((c) => this.cinema = c);
    }
  },
  methods: {
    submit() {
      this.error = null;
      this.$api.addHint(this.cinema.id, this.sneakDate, this.selectedMovie.tmdbId)
          .then((response) => {
            if ("error" in response) {
              this.error = response.error;
            } else {
              this.error = null;
              this.$router.push(`/cinema/${this.cinema.id}`);
            }
          })
          .catch((reason) => {
            this.error = "Fehler beim Verarbeiten der Daten.";
          })
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
    passesChecks() {
      let now = new Date().toISOString().substring(0, 10);
      return this.sneakDate == "" || this.selectedMovie == null || this.sneakDate > now;
    }
  }
}
</script>

<style scoped>
h4 {
  text-align: center;
  margin: 0;
}
.addHintContainer {
  padding: 10px;
}
label {
  margin-bottom: 5px;
}
input[type=date] {
  background-color: var(--color-background);
  padding: 0 10px ;
  height: 40px;
  border-radius: 7px;
  border: solid 1px var(--color-border);
  color: var(--color-primary-text);
}
.selected-movie {
  font-weight: bold;
  display: flex;
  margin-left: 5px;
}
a {
  margin-left: 10px;
}
input[type="button"] {
  margin-top: 10px;
  padding: 5px;
}
form {
  padding: 10px;
}
.form-entry {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: 10px;
}
.form-entry:first-of-type {
  margin-top: 0;
}
.error {
  border-radius: 7px;
  border: var(--color-negative) solid 2px;
  padding: 10px;
}
</style>