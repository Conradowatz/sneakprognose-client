import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

const api = {
    baseUrl: "http://localhost:3000/api/",
    getResponse(endpoint: string): Promise<any> {
        return new Promise(((resolve, reject) => {
            fetch(this.baseUrl + endpoint)
                .then((response) => resolve(response.json()))
                .catch((reason => reject(reason)));
        }));
    },
    getAllCities() {
        return this.getResponse("city");
    },
    allCinemas: new Array<any>(),
    refreshAllCinemas(): Promise<boolean> {
        return new Promise(((resolve, reject) => {
            this.getAllCities()
                .then((cities) => {
                    this.allCinemas = [];
                    for (let city of cities) {
                        for (let cinema of city.cinemas) {
                            cinema["city"] = city.name;
                            console.log(cinema);
                            this.allCinemas.push(cinema);
                        }
                    }
                    resolve(true);
                })
                .catch((reason => reject(reason)));
        }))

    },
    getAllCinemas(): Promise<Array<any>> {
        console.log("Getting all cinemas")
        return new Promise<any[]>(((resolve, reject) => {
            if (this.allCinemas.length > 0) {
                resolve(this.allCinemas);
            } else {
                this.refreshAllCinemas()
                    .then((didRefresh) => {
                        resolve(this.allCinemas)
                    })
                    .catch(reason => reject(reason));
            }
        }))
    }
}
app.config.globalProperties.$api = api;

app.mount("#app");