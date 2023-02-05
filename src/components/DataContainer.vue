<template>
  <div :id="id" class="subcontainer">
    <img v-if="hasAdd" src="../assets/add.svg" alt="Hinzufügen" class="upper-button" @click="this.$emit('add')">
    <img v-if="hasClose" src="../assets/close.svg" alt="Schließen" class="upper-button" @click="this.$emit('close')">
    <img v-if="hasShare" src="../assets/share.svg" alt="Teilen" class="upper-button" @click="this.$emit('share')">
    <div class="subc-heading">
      <h3>{{ title }}</h3>
    </div>
    <div class="subc-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "DataContainer",
  props: ["id", "title", "hasAdd", "hasClose", "hasShare"],
  emits: ["add", "close", "share"]
}
</script>

<style scoped>
.subcontainer {
  border: solid var(--color-border) 1px;
  border-radius: 7px;
  width: 500px;
  max-width: 95vw;
  background: var(--color-background-primary);
}
.subc-heading {
  background: var(--color-container-top);
  border: solid var(--color-container-top) 1px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  color: var(--color-text-invert);
  padding: 7px;
}
.subc-content {
  padding: 0
}
h3 {
  margin: 0;
  text-align: center;
}
.upper-button {
  filter: invert(100%);
  float: right;
  height: 25px;
  margin-right: 5px;
  margin-top: 5px;
}
.upper-button:hover {
  cursor: pointer;
  filter: invert(80%);
}
</style>