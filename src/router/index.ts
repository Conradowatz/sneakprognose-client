import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '@/pages/StartPage.vue'
import CinemaPage from "@/pages/CinemaPage.vue";
import InfoPage from "@/pages/InfoPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import PrivacyPage from "@/pages/PrivacyPage.vue";
import AddCinemaPage from "@/pages/AddCinemaPage.vue";
import AddHintContainer from "@/components/AddHintContainer.vue";
import CinemaView from "@/components/CinemaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: StartPage
    },
    {
      path: '/cinema/:cinemaId',
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
      path: "/info",
      component: InfoPage
    },
    {
      path: "/contact",
      component: ContactPage
    },
    {
      path: "/data_privacy",
      component: PrivacyPage
    },
    {
      path: "/add_cinema",
      component: AddCinemaPage
    }
  ]
})

export default router
