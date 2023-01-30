<template>
  <div class="upper-border"/>
  <div class="title-container">
    <div class="title">
      <img src="../assets/logo.svg" alt="Sneakprognose" />
      <h1>SneakPrognose.de</h1>
    </div>
  </div>
  <div id="main" v-if="cinemaList">
    <CinemaSearch style="margin-bottom: 10px"/>
    <RouterLink class="add-cinema" to="/add_cinema">+ Kino hinzufügen</RouterLink>
    <CinemaTable/>
  </div>
  <LoadingComponent v-if="!cinemaList"/>
</template>

<script>
import CinemaSearch from "@/components/CinemaSearch.vue";
import CinemaTable from "@/components/CinemaTable.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  name: "StartPage",
  components: {LoadingComponent, CinemaTable, CinemaSearch},
  data() {
    return {
      cinemaList: null
    }
  },
  mounted() {
    document.title = "Sneakprognose";
    this.$api.getAllCinemas().then((c) => this.cinemaList = c);
  }
}
</script>

<style scoped>
.title-container {
  padding-top: 60px;
  display: flex;
  justify-content: center;
}
.title > img {
  float: left;
  margin-right: -15px;
  height: 60px;
}
h1 {
  font-size: 40px;
  padding: 0;
  text-align: center;
  color: black;
  float: right;
  margin: 5px 0 0;
}
@media screen and (max-width: 500px) {
  .title > img {
    height: 40px;
  }
  h1 {
    font-size: 25px;
  }
}
#main {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.upper-border {
  height: 30px;
  width: 100%;
  background: var(--color-nav-bar);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.26);
}
.add-cinema {
  margin-bottom: 20px;
}
</style>