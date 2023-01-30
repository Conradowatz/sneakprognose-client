<template>
  <div class="container">
    <h2>Mein Kino ist nicht dabei</h2>
    Wenn du dein Kino über die Suche nicht finden kannst, kann das zwei Gründe
    <ul>
      <li>Der Name des Kinos ist anders eingetragen</li>
      <li>Dein Kino ist noch nicht in unserer Liste</li>
    </ul>
    Bevor du versuchst, dein Kino als neu einzureichen, vergewissere dich bitte, dass es nicht unter anderer
    Schreibweise in der Liste vorhanden ist. Nutze die Suche um bspw. den Namen deiner Stadt einzugeben.
    Kannst du dein Kino immer noch nicht finden, hast du unten die Möglichkeit dieses zum Hinzufügen vorzuschlagen.

    <h2>Kino vorschlagen</h2>
    Falls wir dein Kino nicht in unserer Liste haben, tut uns das leid. Du kannst mit dem unten stehenden
    Formular dein Kino als Vorschlag einreichen. Dabei wird eine E-Mail, mit den angegebenen Daten an uns gesendet.
    Wenn wir deine Informationen bestätigen konnten, bekommst du ggf. eine Bestätigungsmail, und kannst dein Kino
    dann zukünftig nutzen. Angabe zur Person sind optional!
    <form v-if="!sent">
      <label>Dein Name</label>
      <input type="text" v-model="name"/>
      <label>Dein E-Mail</label>
      <input type="email" v-model="mail"/>
      <label>Stadt des Kinos*</label>
      <input type="text" required v-model="cinemaCity"/>
      <label>Name des Kinos*</label>
      <input type="text" required v-model="cinemaName"/>
      <input type="submit" value="Einreichen" @click.prevent="submitCinema">
    </form>
    <div class="sucess-text" v-if="sent">{{sent}}</div>
  </div>
</template>

<script>
import DefaultPage from "@/pages/DefaultPage.vue";

export default {
  name: "AddCinemaPage",
  components: {DefaultPage},
  data() {
    return {
      name: "",
      mail: "",
      cinemaCity: "",
      cinemaName: "",
      sent: ""
    }
  },
  methods: {
    submitCinema() {
      this.$api.suggestCinema(this.cinemaName, this.cinemaCity, this.name, this.mail)
          .then((res) => {
            console.log(res);
            this.sent = res["status"]
          });
    }
  },
  mounted() {
    document.title = "Sneakprognose - Kino vorschlagen";
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  width: 100%;
}
label {
  font-weight: bold;
  margin-top: 10px;
}
input[type="text"], input[type="email"] {
  border-radius: 5px;
  border: var(--color-border) solid 1px;
  background: var(--color-background-primary);
  padding: 5px;
  margin-top: 5px;
}
input[type="submit"] {
  padding: 5px;
  margin-top: 10px;
}
form {
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
}
.sucess-text {
  padding: 20px;
  border-radius: 7px;
  width: 300px;
  margin-top: 20px;
  border: var(--color-positive) solid 2px;
}
</style>