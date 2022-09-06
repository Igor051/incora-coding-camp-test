import {Show} from "./shows"

import {genres} from "./genres"
import {nameLengthValidity, showAlreadyBeenAddedValidity, showNameDuplicationValidity} from "./validators";

export class StreamingService {
    readonly name: string
    readonly shows: Show[]
    readonly viewsByShowNames: Map<string, number>


    constructor(name: string, shows: Show[] = []) {

        nameLengthValidity(name)

        this.viewsByShowNames = new Map<string, number>()

        let showsNames: string[] = []
        shows.forEach((show) => {

            showNameDuplicationValidity(showsNames, show.name)
            showsNames.push(show.name)
            this.viewsByShowNames.set(show.name, 0)
        })


        this.name = name;
        this.shows = shows
    }

    addShow(show: Show): void {

        showAlreadyBeenAddedValidity(this.viewsByShowNames, show.name)
        this.shows.push(show)
        this.viewsByShowNames.set(show.name, 0)
    }

    private getTenMostViewedShows(shows: Show[]): Show[] {
        return shows.sort((a, b) => {
            return this.viewsByShowNames.get(b.name) - this.viewsByShowNames.get(a.name)
        }).slice(0, 10)

    }

    getMostViewedShowsOfYear(year): Show[] {

        let ShowsWithTheSameYear: Show[] = this.shows.filter((show) => {
            return show.releaseDate.getFullYear() === year
        })
        //no need to choose 10 shows if there are less or equal than 10
        if (ShowsWithTheSameYear.length <= 10) {
            return ShowsWithTheSameYear
        }

        return this.getTenMostViewedShows(ShowsWithTheSameYear)
    }

    getMostViewedShowsOfGenre(genre: genres): Show[] {
        let ShowsWithTheSameGenre: Show[] = this.shows.filter((show) => {
            return show.genre === genre
        })
        //no need to choose 10 shows if there are less or equal than 10
        if (ShowsWithTheSameGenre.length < 10) {
            return ShowsWithTheSameGenre
        }

        return this.getTenMostViewedShows(ShowsWithTheSameGenre)
    }
}



