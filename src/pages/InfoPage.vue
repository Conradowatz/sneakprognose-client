<template>
  <DefaultPage>
    <div class="container">
      <h2>Was ist eine Sneak-Preview?</h2>
      Eine <strong>Sneak-Preview</strong> ist eine Film-Vorführung im Kino, bei der vor dem Start nicht klar ist,
      welcher Film gezeigt wird. Bei Filme werden dabei vor dem offiziellen Kino-Starttermin gezeigt, meist ersscheinen
      sie erst wenige Tage oder Wochen später.

      <h2>Informationen zur Sneakprognose</h2>
      Sneakprognose.de zeigt vorab Filme, welche in der Sneak-Preview laufen könnten. Die Berechnung basiert dabei auf
      Nutzer-basierten Daten. Gehst du in eine Sneak-Preview-Vorstellung, kannst du im Nachhinein auf dieser Webseite
      eintragen, welchen Film du gesehen hast. Das hilft dabei, die Sneakprognose genauer zu machen. <br/>
      Die Idee dieses Dienstes basiert auf der Sneakprognose von "Score11", welche vormals ähnliche Funktionen aufwies.

      <h2>Mitmachen</h2>
      Du kannst diese Seite verbessern, indem du selbst Daten einreichst. Wenn du in einer Sneak-Preview warst, kannst
      du hinterher den gesehenen Film eintragen. Hat ihn bereits ein anderer Nutzer eingtragen, siehst du ihn unter
      "Vergangene Sneaks". Dort kannst du eine Einreichung bestätigen oder ablehnen, wenn du sie für falsch hältst.
      Einreichungen, die mehr Ablehnungen als Zustimmungen haben, werden nicht berücksichtigt.

      <h2>Technische Umsetzung</h2>
      Die Sneakprognose für dein Kino berechnet sich aus allen Filmen, welche bereits in anderen, aber noch nicht in
      deinem Kino liefen. Dabei werden solche Filme, die bereits öfter liefen und solche, die bald veröffentlicht
      werden höher gewichtet. Es werden keine Filme berücksichtigt, welche bereits veröffentlicht sind.

      <h2>Datenquelle</h2>
      Die Daten zum Filmtitel, Erscheinungdatum und Genres stammen von <a href="https://www.themoviedb.org">TMDB</a>.
      Eingetragene Sneak-Termine sowie Kinos wurden von Nutzern eingetragen.
    </div>
  </DefaultPage>
</template>

<script>
import DefaultPage from "@/pages/DefaultPage.vue";

export default {
  name: "InfoPage",
  components: {DefaultPage}

}
</script>

<style scoped>
.container {
  max-width: 600px;
  padding: 0 20px;
}
</style>