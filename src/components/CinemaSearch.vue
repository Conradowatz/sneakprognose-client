<template>
  <SearchComponent :suggestions="suggestions" :titleFunction="(c) => c.name + ' ' + c.city"
                   @change="makeSuggestions" @close="suggestions = []" @select="selectCinema"
                   placeholder="Kino suchen..."
                   :defaultText="defaultCinema ? defaultCinema.name + ' ' + defaultCinema.city : null"/>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";
export default {
  name: "CinemaSearch",
  components: {SearchComponent},
  props: ["defaultCinema"],
  data() {
    return {
      cinemas: [],
      suggestions: []
    };
  },
  mounted() {
    this.$api.getAllCinemas().then(cinemas => this.cinemas = cinemas);
  },
  methods: {
    makeSuggestions(typed) {
      if (!typed) return;
      this.suggestions = [];
      for (let cinema of this.cinemas) {
        let name = cinema.name + " " + cinema.city;
        let searchTerms = typed.toUpperCase().split(" ");
        let isFound = true;
        for (let term of searchTerms) {
          if (!name.toUpperCase().includes(term)) {
            isFound = false;
            break;
          }
        }
        if (isFound) {
          this.suggestions.push(cinema);
        }
      }
    },
    selectCinema(cinema) {
      this.$router.push(`/cinema/${cinema.id}`)
    }
  }
}

</script>

<style scoped>

</style>