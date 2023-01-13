<template>
  <form>
    <div class="autocomplete">
      <input type="text" class="textinput" id="myInput" placeholder="Kino suchen..." name="cinema"
          @input="makeSuggestions" v-model="typed" @click="makeSuggestions"
          @keydown="keydown"/>
      <div v-if="suggestions.length>0" class="autocomplete-items">
        <div v-for="(suggestion, index) in suggestions"
             :class="{ 'autocomplete-active': index === currentFocus }"
              @click="this.$emit('select', suggestion)">
          {{suggestion.name + " " + suggestion.city }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "CinemaSearch",
  emits: ["select"],
  data() {
    return {
      cinemas: [],
      suggestions: [],
      typed: "",
      currentFocus: -1
    };
  },
  mounted() {
    document.addEventListener("click", this.closeSuggestions);
    //this.$api.getAllCinemas().then(cinemas => this.cinemas = cinemas);
  },
  unmounted() {
    document.removeEventListener("click", this.closeSuggestions);
  },
  methods: {
    makeSuggestions() {
      this.suggestions = [];
      for (let cinema of this.cinemas) {
        let name = cinema.name + " " + cinema.city;
        let searchTerms = this.typed.toUpperCase().split(" ");
        let isFound = true;
        for (let term of searchTerms) {
          if (!name.toUpperCase().includes(term)) {
            isFound = false;
            break;
          }
        }
        if (isFound) {
          this.suggestions.push(cinema);
        }
      }
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
          this.$emit("select", this.suggestions[this.currentFocus]);
        }
      } else if (event.key === "Escape") {
        this.closeSuggestions();
      }
    },

    closeSuggestions() {
      this.suggestions = []
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
input[type="text"] {
  background-color: #F2F2F2;
  width: 300px;
  max-width: 100vw;
  padding: 0px 10px ;
  height: 40px;
  border-radius: 7px;
  border: solid 1px #BFBFBF;
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
  overflow-y: scroll;
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