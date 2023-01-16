import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

const api = {
    baseUrl: "http://localhost:3000/api/",
    getResponse(endpoint: string): Promise<any> {
        return new Promise(((resolve, reject) => {
            fetch(this.baseUrl + endpoint)
                .then((response) => {
                    if (response.status != 200) {
                        reject(response.text());
                    } else {
                        resolve(response.json());
                    }
                })
                .catch((reason => reject(reason)));
        }));
    },
    postUpdate(endpoint: string, data: any): Promise<any> {
        return new Promise(((resolve, reject) => {
            fetch(this.baseUrl + endpoint, {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({"Content-Type": "application/json"})
            }).then((response) => {
                    if (response.status != 200) {
                        reject(response.text());
                    } else {
                        resolve(response.json());
                    }
                })
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
    },
    getHints(cinemaId: number): Promise<
        {id: number, date: string, score: number, movie:
                {imdbId: string, name: string, releaseDate: string, rating: number}
        }[]> {
        return this.getResponse(`hint?cinemaId=${cinemaId}`);
    },
    vote(hintId: number, isUpvote: boolean, count: number): Promise<string> {
        return this.postUpdate("vote", {
            hintId: hintId,
            isUpvote: isUpvote,
            count: count
        });
    },
    getSneaks(cinemaId: number): Promise<any[]> {
        return this.getResponse(`sneak?cinemaId=${cinemaId}`);
    },
    addHint(cinemaId: number, sneakDate: string, imdbLink: string, startDate?: string): Promise<any> {
        if (startDate != null && startDate.trim() != "") {
            return this.postUpdate("hint", {
                cinemaId: cinemaId,
                sneakDate: sneakDate,
                imdbLink: imdbLink,
                startDate: startDate
            });
        } else {
            return this.postUpdate("hint", {
                cinemaId: cinemaId,
                sneakDate: sneakDate,
                imdbLink: imdbLink
            });
        }
    }
}
app.config.globalProperties.$api = api;

app.mount("#app");