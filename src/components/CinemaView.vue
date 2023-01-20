<template>
  <MovieTable :cinemaId="cinemaId" />
  <HintTable :cinemaId="cinemaId" />
</template>

<script>
import MovieTable from "@/components/MovieTable.vue";
import HintTable from "@/components/HintTable.vue";
export default {
  name: "CinemaView",
  components: {HintTable, MovieTable},
  props: ["cinemaId"]
}
</script>

<style scoped>

</style>