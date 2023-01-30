<template>
  <div class="title-bar">
    <img src="../assets/logo.svg" alt="Sneakprognose">
    <RouterLink to="/"><h1>SneakPrognose.de</h1></RouterLink>
    <div class="filler"/>
    <CinemaSearch :defaultCinema="selectedCinema" class="search"/>
    <div class="cinema-name" v-if="selectedCinema">{{selectedCinema.name}} {{selectedCinema.city}}</div>
  </div>
  <div :class="{'nav-bar': true, open: isNavbarOpen, closed: !isNavbarOpen}">
    <div class="nav-item sidebar-open" @click="isNavbarOpen = !isNavbarOpen">
      <img src="../assets/menu.png" v-if="!isNavbarOpen" alt="Menü">
      <img src="../assets/close_menu.png" v-if="isNavbarOpen" alt="Schließen">
      <div>Navigation</div>
    </div>
    <RouterLink to="/">
      <div class="nav-item collapsable">
        <img src="../assets/home.png" alt="Kinos">
        <div>Kinoauswahl</div>
      </div>
    </RouterLink>
    <RouterLink :to="`/cinema/${selectedCinema.id}/add_sneak`" @click="isNavbarOpen = false"
                v-if="selectedCinema && !$route.path.includes('add_sneak')">
      <div class="nav-item collapsable">
        <img src="../assets/movie.png" alt="Eintragen">
        <div>Sneak eintragen</div>
      </div>
    </RouterLink>
    <RouterLink :to="`/cinema/${selectedCinema.id}`" @click="isNavbarOpen = false"
                v-if="selectedCinema && $route.path.includes('add_sneak')">
      <div class="nav-item collapsable">
        <img src="../assets/movie.png" alt="Kino">
        <div>Zum Kino</div>
      </div>
    </RouterLink>
    <RouterLink to="/add_cinema" @click="isNavbarOpen = false">
      <div class="nav-item collapsable">
        <img src="../assets/add_circle.png" alt="Hinzufügen">
        <div>Kino hinzufügen</div>
      </div>
    </RouterLink>
    <RouterLink to="/info" @click="isNavbarOpen = false">
      <div class="nav-item collapsable">
        <img src="../assets/info.png" alt="Infos">
        <div>Informationen</div>
      </div>
    </RouterLink>
  </div>
  <div id="main" class="middle">
    <RouterView></RouterView>
  </div>
</template>

<script>
import CinemaSearch from "@/components/CinemaSearch.vue";
import {routeLocationKey} from "vue-router";
export default {
  name: "CinemaPage",
  computed: {
    routeLocationKey() {
      return routeLocationKey
    }
  },
  components: {CinemaSearch},
  emits: [],
  data() {
    return {
      isNavbarOpen: false,
      selectedCinema: null
    }
  },
  mounted() {
    if (!isNaN(parseInt(this.$route.params.cinemaId))) {
      this.$api.getCinema(this.$route.params.cinemaId).then((c) => this.selectedCinema = c);
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
  color: var(--color-primary-text);
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
    height: 260px !important;
  }
  .nav-bar.closed .nav-item.collapsable {
    display: none !important;
  }
  .nav-item {
    padding: 10px 0 !important;
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
  .cinema-name {
    display: unset !important;
  }
}
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;
  max-width: 100%;
}

.nav-bar {
  display: flex;
  gap: 30px;
  justify-content: center;
  height: 40px;
  background: var(--color-nav-bar);
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
  background: var(--color-nav-bar-hover);
}
.nav-item > img {
  height: 20px;
  filter: invert(100%);
}
.nav-item > div {
  color: var(--color-text-invert);
}
.sidebar-open {
  display: none;
}
.cinema-name {
  display: none;
  font-weight: bold;
  width: 100%;
  text-align: center;
}
</style>