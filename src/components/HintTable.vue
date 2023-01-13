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
        <td>{{ hint.date }}</td>
        <td>
          <a :href="hint.imdblink">{{ hint.movie }}</a>
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
  data() {
    return {
        hints: [
          {date: "12.01.23", movie: "Radio Rebel", score: 12, imdblink: "google.com", id: 1},
          {date: "12.01.23", movie: "Radio Rebel", score: 12, imdblink: "google.com", id: 2},
          {date: "12.01.23", movie: "Radio Rebel", score: 12, imdblink: "google.com", id: 3}
        ]
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
        this.removeSavedVote(hint.id, isUp);
        hint.score += isUp ? -1 : 1;
      } else {
        if (this.hasSavedVote(hint.id, !isUp)) {
          this.removeSavedVote(hint.id, !isUp);
          hint.score += isUp ? 1 : -1;
        }
        this.addSavedVote(hint.id, isUp);
        hint.score += isUp ? 1 : -1;
      }
    }
  },
  mounted() {
    localStorage.setItem("available", "true");
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