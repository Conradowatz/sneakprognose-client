<template>
  <div class="container">
    <h2 id="sneak-preview">Was ist eine Sneak-Preview?</h2>
    Eine <strong>Sneak-Preview</strong> ist eine Film-Vorführung im Kino, bei der vor dem Start nicht klar ist,
    welcher Film gezeigt wird. Die Filme werden dabei vor dem offiziellen Kino-Starttermin gezeigt, meist erscheinen
    sie erst wenige Tage oder Wochen später.

    <h2 id="sneakprognose">Informationen zur Sneakprognose</h2>
    Sneakprognose.de zeigt vorab, welche Filme in der Sneak-Preview laufen könnten. Die Berechnung basiert dabei auf
    Nutzer-basierten Daten. Gehst du in eine Sneak-Preview-Vorstellung, kannst du im Nachhinein auf dieser Webseite
    eintragen, welchen Film du gesehen hast. Das hilft dabei, die Sneakprognose genauer zu machen. <br/>
    Die Idee dieses Dienstes basiert auf der Sneakprognose von "Score11", welche vormals ähnliche Funktionen aufwies.

    <h2 id="mitmachen">Mitmachen</h2>
    Du kannst diese Seite verbessern, indem du selbst Daten einreichst. Wenn du in einer Sneak-Preview warst, kannst
    du hinterher den gesehenen Film eintragen. Hat ihn bereits ein anderer Nutzer eingetragen, siehst du ihn unter
    "Vergangene Sneaks". Dort kannst du eine Einreichung bestätigen oder ablehnen, wenn du sie für falsch hältst.
    Einreichungen, die mehr Ablehnungen als Zustimmungen haben, werden nicht berücksichtigt.

    <h2 id="umsetzung">Technische Umsetzung</h2>
    Die Sneakprognose für dein Kino berechnet sich aus allen Filmen, welche bereits in anderen, aber noch nicht in
    deinem Kino liefen. Dabei werden solche Filme, die bereits öfter liefen und solche, die bald veröffentlicht
    werden höher gewichtet. Es werden keine Filme berücksichtigt, welche bereits veröffentlicht sind.

    <h2 id="daten">Datenquelle</h2>
    Die Daten zum Filmtitel, Erscheinungsdatum und Genres stammen von <a href="https://www.themoviedb.org">TMDB</a>.
    Eingetragene Sneak-Termine sowie Kinos wurden von Nutzern eingetragen.

    <h2 id="kontact">Fragen / Fehler / Kontakt</h2>
    Wenn du weitere Fragen zur Seite hast, oder dir ein Fehler aufgefallen ist, kannst du mich hier kontaktieren:
    <a href="mailto:kontakt@sneakprognose.de">kontakt@sneakprognose.de</a>
  </div>
</template>

<script>
import DefaultPage from "@/pages/DefaultPage.vue";

export default {
  name: "InfoPage",
  components: {DefaultPage},
  mounted() {
    document.title = "Sneakprognose - Informationen";
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  padding: 10px;
  margin: 0 auto;
  padding: 10px;
}
</style>