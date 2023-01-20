<template>
  <div class="autocomplete">
    <div class="search-container">
      <img src="../assets/search.png" alt="Search" />
      <input type="text" class="textinput" id="myInput" :placeholder="placeholder"
             @input="registerChange" v-model="typed" @click="registerChange"
             @keydown="keydown" :style="{'background-color': backColor}" />
    </div>
    <div v-if="suggestions.length>0" class="autocomplete-items">
      <div v-for="(suggestion, index) in suggestions"
           :class="{ 'autocomplete-active': index === currentFocus }"
           @click="processSelect(suggestion)">
        {{ titleFunction(suggestion) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchComponent",
  props: ["placeholder", "suggestions", "titleFunction", "backColor", "defaultText"],
  emits: ["select", "change", "close"],
  watch: {
    defaultText(text) {
      this.typed = text;
    }
  },
  data() {
    return {
      timerId: null,
      typed: this.defaultText,
      currentFocus: -1
    };
  },
  mounted() {
    document.addEventListener("click", this.closeSuggestions);
  },
  unmounted() {
    document.removeEventListener("click", this.closeSuggestions);
  },
  methods: {
    registerChange() {
      if (this.timerId != null) clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.$emit("change", this.typed);
      }, 500);
    },

    focusOnActiveItem() {
      this.$nextTick(() => {
        if (document.getElementsByClassName("autocomplete-active").length > 0) {
          document.getElementsByClassName("autocomplete-active")[0].scrollIntoView()
        }
      });
    },

    keydown(event) {
      if (event.key === "ArrowDown") {
        this.currentFocus++;
        if (this.currentFocus >= this.suggestions.length) this.currentFocus = 0;
        this.focusOnActiveItem();
      } else if (event.key === "ArrowUp") {
        this.currentFocus--;
        if (this.currentFocus < 0) this.currentFocus = this.suggestions.length-1;
        this.focusOnActiveItem();
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (this.currentFocus > -1) {
          this.processSelect(this.suggestions[this.currentFocus]);
        }
      } else if (event.key === "Escape") {
        this.closeSuggestions();
      }
    },

    closeSuggestions() {
      this.$emit("close");
    },

    processSelect(suggestion) {
      this.$emit('select', suggestion);
      this.typed = this.titleFunction(suggestion);
    }
  }
}

</script>

<style scoped>
input {
  border: 1px solid transparent;
  background-color: #F2F2F2;
  padding: 10px;
  font-size: 16px;
}
.search-container {
  border-radius: 7px;
  border: solid 1px #BFBFBF;
  background-color: #F2F2F2;
}
img {
  height: 30px;
  position: absolute;
  top: 5px;
  left: 5px
}
input[type="text"] {
  width: 300px;
  max-width: calc(100vw - 120px);
  padding: 0 10px 0 35px;
  height: 40px;
  border-radius: 7px;
}
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>