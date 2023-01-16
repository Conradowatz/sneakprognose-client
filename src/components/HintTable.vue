<template>
  <DataContainer title="Vergangene Sneaks" has-add="true">
    <table>
      <thead>
      <tr>
        <th>Datum</th>
        <th>Film</th>
        <th>Score</th>
        <th>Aktion</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hint in hints">
        <td>{{ parseDate(hint.date) }}</td>
        <td>
          <a :href="`https://www.imdb.com/title/${hint.movie.imdbId}`" target="_blank">{{ hint.movie.name }}</a>
        </td>
        <td>{{ hint.score }}</td>
        <td>
          <img src="../assets/thumb_up.png" alt="Upvote" @click="vote(hint, true)" :class="{ voted: hasSavedVote(hint.id, true) }">
          <img src="../assets/thumb_down.png" alt="Downvote" @click="vote(hint, false)" :class="{ voted: hasSavedVote(hint.id, false) }">
        </td>
      </tr>
      </tbody>
    </table>
  </DataContainer>
</template>

<script>
import DataContainer from "./DataContainer.vue";
export default {
  name: "HintTable",
  components: {DataContainer},
  props: ["cinemaId"],
  data() {
    return {
        hints: []
    }
  },
  methods: {
    getSavedVotes(upVotes) {
      if (localStorage.getItem("votedHints" + (upVotes ? "Up" : "Down")) == null) {
        localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), "");
      }
      return localStorage.getItem("votedHints" + (upVotes ? "Up" : "Down")).split(",");
    },
    addSavedVote(id, upVotes) {
      let arr = this.getSavedVotes(upVotes);
      arr.push(id);
      localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), arr.join(","));
    },
    hasSavedVote(id, upVotes) {
      let arr = this.getSavedVotes(upVotes);
      return arr.includes(id.toString());
    },
    removeSavedVote(id, upVotes) {
      let arr = this.getSavedVotes(upVotes);
      arr.splice(arr.indexOf(id), 1);
      localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), arr.join(","));
    },
    vote(hint, isUp) {
      if (localStorage.getItem("available") == null) return;

      if (this.hasSavedVote(hint.id, isUp)) {
        this.attemptVote(hint, !isUp, 1, true, isUp, false);
      } else {
        if (this.hasSavedVote(hint.id, !isUp)) {
          this.attemptVote(hint, isUp, 2, true, !isUp, true);
        } else {
          this.attemptVote(hint, isUp, 1, false, null, true);
        }
      }
    },
    attemptVote(hint, isUpvote, count, remove, removeUp, save) {
      this.$api.vote(hint.id, isUpvote, count).then((newHint => {
        if (remove) {
          this.removeSavedVote(hint.id, removeUp);
        }
        if (save) {
          this.addSavedVote(hint.id, isUpvote);
        }
        hint.score = newHint.score;
      }));
    },
    parseDate(dateString) {
      let dateInts = dateString.split("-");
      return `${dateInts[2]}.${dateInts[1]}.${dateInts[0]}`;
    }
  },
  mounted() {
    localStorage.setItem("available", "true");
    this.$api.getHints(this.cinemaId)
        .then((hints) => {
          this.hints = hints;
        });
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  padding-left: 10px;
}
td, th {
  padding: 5px;
}
th {
  text-align: start;
  background: #8B0B45;
  color: white;
}
tr:nth-child(even) {
  background: #dedede;
}
td:first-child, th:first-child {
  padding-left: 20px;
}
td:last-child, th:last-child {
  padding-right: 20px;
}
img {
  width: 20px;
  padding-right: 10px;
  filter: none;
}
img.voted {
  filter: invert(9%) sepia(98%) saturate(5203%) hue-rotate(325deg) brightness(77%) contrast(93%);
}
img:hover {
  filter: invert(9%) sepia(98%) saturate(5203%) hue-rotate(325deg) brightness(77%) contrast(93%);
  cursor: pointer;
}
</style>