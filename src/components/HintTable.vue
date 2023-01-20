<template>
  <DataContainer title="Vergangene Sneaks" has-add="true" @add="this.$router.push(`/cinema/${cinemaId}/add_sneak`)">
    <table>
      <thead>
      <tr>
        <th class="date">Datum</th>
        <th>Film</th>
        <th>Score</th>
        <th class="action">Aktion</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hint in hints">
        <td class="date"><div class="date-part">{{ parseDay(hint.date) }}</div><div>{{ parseYear(hint.date) }}</div></td>
        <td>
          <a :href="`https://www.themoviedb.org/movie/${hint.movie.tmdbId}`" target="_blank">{{ hint.movie.name }}</a>
        </td>
        <td class="score">{{ hint.score }}</td>
        <td class="action">
          <img src="../assets/right.png" alt="Upvote" @click="vote(hint, true)"
               :class="{ 'voted-up': hasSavedVote(hint.id, true), upvote: true }">
          <img src="../assets/wrong.png" alt="Downvote" @click="vote(hint, false)"
               :class="{ 'voted-down': hasSavedVote(hint.id, false), downvote: true }">
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
  watch: {
    cinemaId() {
      this.refreshHints();
    }
  },
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
    parseDay(dateString) {
      let dateInts = dateString.split("-");
      return `${dateInts[2]}.${dateInts[1]}.`;
    },
    parseYear(dateString) {
      let dateInts = dateString.split("-");
      return dateInts[0];
    },
    refreshHints() {
      this.$api.getHints(this.cinemaId)
          .then((hints) => {
            this.hints = hints;
          });
    }
  },
  mounted() {
    localStorage.setItem("available", "true");
    this.refreshHints();
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
  background: #130b38;
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
img.voted-up {
  filter: invert(13%) sepia(98%) saturate(4354%) hue-rotate(88deg) brightness(88%) contrast(88%);
}
img.voted-down {
  filter: invert(9%) sepia(98%) saturate(5203%) hue-rotate(325deg) brightness(77%) contrast(93%);
}
img.upvote:hover {
  filter: invert(13%) sepia(98%) saturate(4354%) hue-rotate(88deg) brightness(88%) contrast(88%);
  cursor: pointer;
}
img.downvote:hover {
  filter: invert(14%) sepia(53%) saturate(4850%) hue-rotate(356deg) brightness(88%) contrast(110%);
  cursor: pointer;
}
.date-part {
  float: left;
}
.date {
  display: flex;
}
@media screen and (max-width: 450px) {
  .date {
    display: block;
  }
}
.action {
  min-width: 60px;
}
.score {
  text-align: right;
}
</style>