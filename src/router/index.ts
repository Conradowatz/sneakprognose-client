import { createRouter, createWebHistory } from 'vue-router'
import StartPage from "@/pages/StartPage.vue";
import CinemaPage from "@/pages/CinemaPage.vue";
import AddHintContainer from "@/components/AddHintContainer.vue";
import CinemaView from "@/components/CinemaView.vue";
import InfoPage from "@/pages/InfoPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import PrivacyPage from "@/pages/PrivacyPage.vue";
import AddCinemaPage from "@/pages/AddCinemaPage.vue";
import DefaultPage from "@/pages/DefaultPage.vue";
/*const StartPage = import('@/pages/StartPage.vue')
const CinemaPage = import("@/pages/CinemaPage.vue");
const InfoPage = import("@/pages/InfoPage.vue");
const ContactPage = import( "@/pages/ContactPage.vue");
const PrivacyPage = import( "@/pages/PrivacyPage.vue");
const AddCinemaPage = import( "@/pages/AddCinemaPage.vue");
const AddHintContainer = import( "@/components/AddHintContainer.vue");
const CinemaView = import( "@/components/CinemaView.vue");*/

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/home",
      component: StartPage
    },
    {
      path: '/',
      component: DefaultPage,
      children: [
        {
          path: "",
          redirect: "/home"
        },
        {
          path: 'cinema/:cinemaId',
          component: CinemaPage,
          props: true,
          children: [
            {
              path: "add_sneak",
              component: AddHintContainer,
              props: true
            },
            {
              path: "",
              component: CinemaView,
              props: true
            }
          ]
        },
        {
          path: "info",
          component: InfoPage
        },
        {
          path: "contact",
          component: ContactPage
        },
        {
          path: "data_privacy",
          component: PrivacyPage
        },
        {
          path: "add_cinema",
          component: AddCinemaPage
        }
      ]
    }
  ]
})

export default router
