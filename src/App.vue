<template>
  <RouterView></RouterView>
  <div class="bottom-bar">
    <RouterLink to="/contact">Impressum</RouterLink>
    <RouterLink to="/data_privacy">Datenschutz</RouterLink>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectedCinema: null
    };
  },
  methods: {
    selectCinema(chosenCinema) {
      this.selectedCinema = chosenCinema;
      window.history.pushState({...chosenCinema}, "", `/cinema/${chosenCinema.id}`);
    },
    deselectCinema() {
      this.selectedCinema = null;
      window.history.pushState(null, "", "/");
    }
  },
  mounted() {},
};
</script>

<style>

</style>
