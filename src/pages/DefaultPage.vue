<template>
  <div class="title-bar">
    <RouterLink to="/">
      <img src="../assets/logo.svg" alt="Sneakprognose" class="title-img">
    </RouterLink>
    <RouterLink to="/">
      <h1>SneakPrognose.de</h1>
    </RouterLink>
    <div class="filler"/>
    <h2 class="cinema-name" v-if="selectedCinema">{{selectedCinema.name}} {{selectedCinema.city}}</h2>
    <div class="filler"/>
    <CinemaSearch :defaultCinema="selectedCinema" class="search"/>
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
    this.$watch(
        () => this.$route.params,
        () => {
          if (!isNaN(parseInt(this.$route.params.cinemaId))) {
            this.$api.getCinema(this.$route.params.cinemaId).then((c) => this.selectedCinema = c);
          }
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
    )
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
img.title-img {
  padding-left: 20px;
  height: 50px;
  margin-right: -10px;
}
@media (prefers-color-scheme: dark) {
  img.title-img {
    filter: invert(80%);
  }
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
  .search {
    display: none;
  }
  .cinema-name {
    width: 100%;
    font-size: 18px;
  }
}
@media screen and (max-width: 500px) {
  img.title-img {
    height: 40px;
  }
  h1 {
    font-size: 25px;
  }
}
#main {
  /*display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;*/
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
  font-weight: bold;
  text-align: center;
  padding: 0;
  margin: 0;
}
</style>