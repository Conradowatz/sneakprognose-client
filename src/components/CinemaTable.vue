<template>
  <DataContainer id="cinema-container" title="Kinos">
      <p v-for="cinema in cinemas" @click="selectCinema(cinema)">
        {{ cinema.name + " " + cinema.city }}
      </p>
  </DataContainer>
</template>

<script>
import DataContainer from "@/components/DataContainer.vue";
export default {
  name: "CinemaTable",
  components: {DataContainer},
  props: ["cinemas"],
  emits: ["select"],
  methods: {
    selectCinema(cinema) {
      this.$emit("select", cinema)
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 5px;
  padding-left: 20px;
}
p:nth-child(even) {
  background: #dedede;
}

p:hover {
  background: #c39696;
  cursor: pointer;
}
</style>