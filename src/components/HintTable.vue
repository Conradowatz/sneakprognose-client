<template>
  <DataContainer title="Vergangene Sneaks" has-add="true" @add="this.$router.push(`/cinema/${cinemaId}/add_sneak`)">
    <table>
      <thead>
      <tr>
        <th>Datum</th>
        <th>Film</th>
        <th></th>
        <th><RouterLink to="/info#mitmachen">Korrekt?</RouterLink></th>
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
          <div><img src="../assets/right.png" alt="Zustimmen" @click="vote(hint, true)"
               :class="{ 'voted-up': hasSavedVote(hint.id, true), upvote: true }"></div>
          <div><img src="../assets/wrong.png" alt="Ablehnen" @click="vote(hint, false)"
                :class="{ 'voted-down': hasSavedVote(hint.id, false), downvote: true }"></div>
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
        hints: [],
        isVoting: false
    }
  },
  methods: {
    getSavedVotes(upVotes) {
      let string = localStorage.getItem("votedHints" + (upVotes ? "Up" : "Down"));
      if (string == null) {
        localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), JSON.stringify([]));
      }
      let arr;
      try {
        arr = JSON.parse(localStorage.getItem("votedHints" + (upVotes ? "Up" : "Down")));
      } catch (e) {
        localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), JSON.stringify([]));
        arr = [];
      }
      return arr;
    },
    addSavedVote(id, upVotes) {
      let arr = this.getSavedVotes(upVotes);
      arr.push(id);
      localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), JSON.stringify(arr));
    },
    hasSavedVote(id, upVotes) {
      let arr = this.getSavedVotes(upVotes);
      return arr.includes(id);
    },
    removeSavedVote(id, upVotes) {
      let arr = this.getSavedVotes(upVotes);
      arr.splice(arr.indexOf(id), 1);
      localStorage.setItem("votedHints" + (upVotes ? "Up" : "Down"), JSON.stringify(arr));
    },
    vote(hint, isUp) {
      if (localStorage.getItem("available") == null) return;

      if (this.hasSavedVote(hint.id, isUp)) {
        // if we already voted in that direction, remove vote
        this.attemptVote(hint, !isUp, 1, true, isUp, false);
      } else {
        if (this.hasSavedVote(hint.id, !isUp)) {
          // if we previously voted in the other direction, remove vote and add new
          this.attemptVote(hint, isUp, 2, true, !isUp, true);
        } else {
          // if we did not previously vote, just save it
          this.attemptVote(hint, isUp, 1, false, null, true);
        }
      }
    },
    attemptVote(hint, isUpvote, count, remove, removeUp, save) {
      if (this.isVoting) return;
      this.isVoting = true;
      this.$api.vote(hint.id, isUpvote, count)
          .then((newHint => {
            if (remove) {
              this.removeSavedVote(hint.id, removeUp);
            }
            if (save) {
              this.addSavedVote(hint.id, isUpvote);
            }
            hint.score = newHint.score;
            this.isVoting = false;
          }))
          .catch((reason) => {
            this.isVoting = false;
          });
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
  background: var(--color-container-top);
  color: white;
}
tr:nth-child(even) {
  background: var(--color-background-secondary);
}
td:first-child, th:first-child {
  padding-left: 20px;
}
td:last-child, th:last-child {
  padding-right: 20px;
}
img {
  width: 30px;
  padding: 5px;
  filter: none;
}
@media (prefers-color-scheme: dark) {
  img {
    filter: invert(80%);
  }
}
.action > div {
  border-radius: 20px;
  width: fit-content;
  height: 40px;
  float: right;
}
.action > div:hover {
  background: var(--color-hover);
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
  height: 30px;
  align-items: center;
}
@media screen and (max-width: 450px) {
  .date {
    display: block;
  }
}
.action {
  min-width: 80px;
  padding: 0;
  text-align: center;
}
th > a {
  color: var(--color-text-invert);
}
.score {
  text-align: right;
}
</style>