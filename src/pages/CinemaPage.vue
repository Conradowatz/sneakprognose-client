<template>
  <DefaultPage :selectedCinema="selectedCinema">
    <div class="two-split">
      <RouterView></RouterView>
    </div>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/pages/DefaultPage.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import MovieTable from "@/components/MovieTable.vue";
import HintTable from "@/components/HintTable.vue";
export default {
  name: "CinemaPage",
  components: {LoadingComponent, DefaultPage, MovieTable, HintTable},
  props: ["cinemaId"],
  data() {
    return {
      selectedCinema: null
    }
  },
  mounted() {
    let id = parseInt(this.cinemaId);
    if (!isNaN(id)) {
      this.$api.getCinema(id).then((cinema) => {
        this.selectedCinema = cinema;
        this.$api.addLastCinema(cinema);
      });
    }
  }
}
</script>

<style scoped>

.two-split {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

</style>