<template>
  <SearchComponent :suggestions="suggestions" :titleFunction="(m) => `${m.name} (${m.year})`"
                   @change="makeSuggestions" @close="suggestions = []" @select="selectMovie"
                   placeholder="Film suchen..." backColor="white"/>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";
export default {
  name: "MovieSearch",
  components: {SearchComponent},
  emits: ["select"],
  data() {
    return {
      suggestions: []
    };
  },
  methods: {
    makeSuggestions(typed) {
      if (!typed || typed.trim() === "") {
        this.suggestions = [];
        return;
      }
      let queryTyped = encodeURI(typed);
      const apiLink = "aHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9zZWFyY2gvbW92aWU/YXBpX2tleT01ZDYyMTkxZTYwZTI1N2UwY2RkNjAxYWJlNzYzZTg1ZSZsYW5ndWFnZT1kZS1ERSZwYWdlPTEmaW5jbHVkZV9hZHVsdD1mYWxzZSZxdWVyeT0=";
      fetch(atob(apiLink) + queryTyped)
          .then((res) => res.json())
          .then((result) => {
            this.suggestions = [];
            if ("error" in result) {
              return;
            }
            for (let entry of result.results) {
              this.suggestions.push({
                name: entry.title,
                year: "release_date" in entry ? entry.release_date.split("-")[0] : "?",
                tmdbId: entry.id
              });
            }
          });
    },
    selectMovie(movie) {
      this.$emit("select", movie);
    }
  }
}

</script>

<style scoped>

</style>