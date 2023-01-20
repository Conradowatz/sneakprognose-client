<template>
  <div class="title-bar">
    <img src="../assets/icon_small.png" alt="Sneakprognose">
    <RouterLink to="/"><h1>SneakPrognose.de</h1></RouterLink>
    <div class="filler"/>
    <CinemaSearch :defaultCinema="selectedCinema" class="search"/>
  </div>
  <div :class="{'nav-bar': true, open: isNavbarOpen, closed: !isNavbarOpen}">
    <div class="nav-item sidebar-open" @click="isNavbarOpen = !isNavbarOpen">
      <img src="../assets/menu.png" v-if="!isNavbarOpen">
      <img src="../assets/close_menu.png" v-if="isNavbarOpen">
      <div>Navigation</div>
    </div>
    <RouterLink to="/">
      <div class="nav-item collapsable">
        <img src="../assets/home.png">
        <div>Kinoauswahl</div>
      </div>
    </RouterLink>
    <RouterLink :to="`/cinema/${selectedCinema.id}/add_sneak`" v-if="selectedCinema">
      <div class="nav-item collapsable">
        <img src="../assets/movie.png">
        <div>Sneak eintragen</div>
      </div>
    </RouterLink>
    <RouterLink to="/add_cinema">
      <div class="nav-item collapsable">
        <img src="../assets/add.png">
        <div>Kino hinzufügen</div>
      </div>
    </RouterLink>
    <RouterLink to="/info">
      <div class="nav-item collapsable">
        <img src="../assets/info.png">
        <div>Informationen</div>
      </div>
    </RouterLink>
    <RouterLink to="/contact">
      <div class="nav-item collapsable">
        <img src="../assets/contact.png">
        <div>Kontakt</div>
      </div>
    </RouterLink>
  </div>
  <div id="main" class="middle">
    <slot/>
  </div>
</template>

<script>
import MovieTable from "@/components/MovieTable.vue";
import HintTable from "@/components/HintTable.vue";
import AddHintContainer from "@/components/AddHintContainer.vue";
import CinemaSearch from "@/components/CinemaSearch.vue";
export default {
  name: "CinemaPage",
  components: {CinemaSearch},
  props: ["selectedCinema"],
  emits: [],
  data() {
    return {
      isNavbarOpen: false
    }
  },
  methods: {}
}
</script>

<style scoped>
.title-bar {
  min-height: 60px;
  padding: 10px 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  flex-wrap: wrap;
}
.title-bar > img {
  padding-left: 20px;
  height: 50px;
  margin-right: -10px;
}
h1 {
  padding: 0;
  margin: 0;
  color: black;
  cursor: pointer;
}
.filler {
  flex-grow: 1;
}
@media screen and (max-width: 800px) {
  .title-bar {
    padding: 10px;
  }
  .nav-bar {
    flex-direction: column;
    width: 100%;
    float: right;
    padding: 10px 0 !important;
    gap: 5px !important;
    justify-content: start !important;
  }
  .nav-bar.open {
    height: 320px !important;
  }
  .nav-bar.closed .nav-item.collapsable {
    display: none !important;
  }
  .nav-item {
    padding: 10px !important;
    width: 100% !important;
  }
  .nav-item > img {
    margin-left: 10px;
  }
  .sidebar-open {
    display: flex !important;
  }
}
@media screen and (max-width: 500px) {
  .title-bar > img {
    height: 40px;
  }
  h1 {
    font-size: 25px;
  }
  .search {
    display: none;
  }
}
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.nav-bar {
  display: flex;
  gap: 30px;
  justify-content: center;
  height: 40px;
  background: #810D41;
  transition: 0.5s;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  padding: 5px;
  height: 30px;
}
.nav-item:hover {
  background: #9b2f60;
}
.nav-item > img {
  height: 20px;
  filter: invert(100%);
}
.nav-item > div {
  color: white;
}
.sidebar-open {
  display: none;
}
</style>