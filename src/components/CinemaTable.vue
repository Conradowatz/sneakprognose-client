<template>
  <DataContainer id="cinema-container" title="Kinos">
    <RouterLink :to="`/cinema/${cinema.id}`" v-for="cinema in cinemaList">
      <p>
        {{ cinema.name + " " + cinema.city }}
      </p>
    </RouterLink>
  </DataContainer>
</template>

<script>
import DataContainer from "@/components/DataContainer.vue";
export default {
  name: "CinemaTable",
  components: {DataContainer},
  data() {
    return {
      cinemaList: []
    }
  },
  mounted() {
    this.$api.getAllCinemas().then((allCinemas) => {
      this.cinemaList = this.$api.getLastCinemas();
      for (let i = 0; i < 10-this.cinemaList.length; i++) {
        this.cinemaList.push(allCinemas[Math.floor(Math.random()*allCinemas.length)])
      }
    })
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 5px 5px 5px 20px;
  font-weight: normal;
}
a:nth-child(even) > p {
  background: #dedede;
}

a:hover > p {
  background: #c39696;
  cursor: pointer;
}
</style>