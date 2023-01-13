<template>
  <DataContainer title="Sneak einreichen" hasClose="true" @close="this.$emit('close')">
    <div class="addHintContainer">
      <h4>Kino: {{ cinema }}</h4>
      <form>
        <label>Datum</label>
        <input type="date" v-model="date">
        <br/>
        <label>IMDB:</label>
        <input type="text" v-model="imdblink" placeholder="https://www.imdb.com/title/...">
        <br/>
        <input type="button" value="Einreichen" @click="submit">
      </form>
    </div>
  </DataContainer>
</template>

<script>
import DataContainer from "./DataContainer.vue";
export default {
  name: "AddHintContainer",
  components: {DataContainer},
  props: ["cinema"],
  data() {
    return {
      date: "",
      imdblink: "",
    }
  },
  methods: {
    submit() {
      console.log(this.date);
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