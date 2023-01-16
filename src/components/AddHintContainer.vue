<template>
  <DataContainer title="Sneak einreichen" hasClose="true" @close="this.$emit('close')">
    <div class="addHintContainer">
      <h4>Kino: {{ cinema.name }}</h4>
      <form>
        <label>Datum*</label>
        <input type="date" v-model="sneakDate">
        <br/>
        <label>IMDB*</label>
        <input type="text" v-model="imdbLink" placeholder="https://www.imdb.com/title/...">
        <label>Kinostart</label>
        <input type="date" v-model="startDate">
        <br/>
        <input type="button" value="Einreichen" @click="submit">
      </form>
      <div class="error" v-if="error">
        {{ this. error }}
      </div>
    </div>
  </DataContainer>
</template>

<script>
import DataContainer from "./DataContainer.vue";
export default {
  name: "AddHintContainer",
  components: {DataContainer},
  props: ["cinema"],
  emits: ["added"],
  data() {
    return {
      sneakDate: "",
      imdbLink: "",
      startDate: "",
      error: null
    }
  },
  methods: {
    submit() {
      this.error = null;
      this.$api.addHint(this.cinema.id, this.sneakDate, this.imdbLink, this.startDate)
          .then((response) => {
            if ("error" in response) {
              this.error = response.error;
            } else {
              this.$emit("added", this.response);
            }
          })
          .catch((reason) => {
            this.error = "Fehler beim Verarbeiten der Daten.";
          })
    }
  }
}
</script>

<style scoped>
h4 {
  text-align: center;
  margin: 0;
}
.addHintContainer {
  padding: 10px;
}
label {
  margin-right: 20px;
}
input[type=text] {
  width: 100%;
}
</style>