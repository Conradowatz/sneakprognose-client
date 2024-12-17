export module SneakApi {
    const baseUrl = "https://api.sneakprognose.de/";
    // change base url to localhost for development server
    //const baseUrl = "http://localhost:3000/";

    function getResponse(endpoint: string): Promise<any> {
        return new Promise(((resolve, reject) => {
            fetch(baseUrl + endpoint)
                .then((response) => {
                    if (response.status != 200) {
                        reject(response.text());
                    } else {
                        resolve(response.json());
                    }
                })
                .catch((reason => reject(reason)));
        }));
    }

    function postUpdate(endpoint: string, data: any): Promise<any> {
        return new Promise(((resolve, reject) => {
            fetch(baseUrl + endpoint, {
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
                .catch(reason => reject(reason));
        }));
    }

    export function getAllCities() {
        return getResponse("city");
    }

    let allCinemas: {[id: number] : {id: number, name: string, city: string}} = {};
    function refreshAllCinemas(): Promise<boolean> {
        return new Promise(((resolve, reject) => {
            getResponse("cinema")
                .then((cinemas) => {
                    for (let cinema of cinemas) {
                        allCinemas[cinema.id] = cinema;
                    }
                    resolve(true);
                })
                .catch((reason => reject(reason)));
        }))

    }

    export function getAllCinemas(): Promise<Array<any>> {
        return new Promise<any>(((resolve, reject) => {
            if (Object.keys(allCinemas).length > 0) {
                resolve((<any>Object).values(allCinemas));
            } else {
                refreshAllCinemas()
                    .then(() => {
                        resolve((<any>Object).values(allCinemas))
                    })
                    .catch(reason => reject(reason));
            }
        }))
    }

    export function getCinema(id: number): Promise<any> {
        if (Object.keys(allCinemas).length > 0) {
            return new Promise((resolve, reject) => resolve(allCinemas[id]));
        } else {
            return getResponse("cinema?cinemaId=" + id);
        }
    }

    export function getHints(cinemaId: number): Promise<
        {id: number, date: string, score: number, movie:
                {imdbId: string, name: string, releaseDate: string, rating: number}
        }[]> {
        return getResponse(`hint?cinemaId=${cinemaId}`);
    }

    export function vote(hintId: number, isUpvote: boolean, count: number): Promise<string> {
        return postUpdate("vote", {
            hintId: hintId,
            isUpvote: isUpvote,
            count: count
        });
    }

    export function getSneaks(cinemaId: number): Promise<any[]> {
        return getResponse(`sneak?cinemaId=${cinemaId}`);
    }

    export function addHint(cinemaId: number, sneakDate: string, tmdbId: number): Promise<any> {
        return postUpdate("hint", {
            cinemaId: cinemaId,
            sneakDate: sneakDate,
            tmdbId: tmdbId,
        });
    }

    export function getLastCinemas() {
        let lastCinemas = localStorage.getItem("lastCinemas");
        if (lastCinemas == null) {
            return []
        } else {
            return JSON.parse(lastCinemas);
        }
    }

    export function addLastCinema(cinema: any) {
        let arr = getLastCinemas();
        // remove if already in it
        let index = arr.map((c: any) => c.id).indexOf(cinema.id);
        if (index >= 0) {
            arr.splice(index, 1);
        }
        // remove one if full
        if (arr.length >= 10) {
            arr = arr.slice(0, 9);
        }
        // add to the beginning
        arr.unshift(cinema);
        localStorage.setItem("lastCinemas", JSON.stringify(arr));
    }

    export function suggestCinema(cinemaName: string, cinemaCity: string, name?: string, mail?: string): Promise<any> {
        return postUpdate("suggest_cinema", {
            cinemaName: cinemaName,
            cinemaCity: cinemaCity,
            name: name,
            mail: mail
        });
    }
}