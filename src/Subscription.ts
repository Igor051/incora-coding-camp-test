import {StreamingService} from "./StreamingService";
import {Show} from "./shows";
import {genres} from "./genres";
import {showExistence, showWithSelectedGenreExistence} from "./validators";

export default class Subscription {
    readonly streamingService: StreamingService


    constructor(StreamingService: StreamingService) {
        this.streamingService = StreamingService
    }

    watch(showName: string): void {
        let currentShowViews = this.streamingService.viewsByShowNames.get(showName)

        showExistence(currentShowViews)

        this.streamingService.viewsByShowNames.set(showName, currentShowViews + 1)
    }

    getRecommendationTrending(): Show {
        let shows = this.streamingService.getMostViewedShowsOfYear(new Date().getFullYear())
        if (shows.length === 0) {
            // if there was no show in the current year, then I take a random one from any year
            return this.getRandomShow()
        }
        return shows[Math.floor(Math.random() * shows.length)]
    }

    getRecommendationByGenre(genre: genres): Show {
        let shows = this.streamingService.getMostViewedShowsOfGenre(genre)

        showWithSelectedGenreExistence(shows)

        return shows[Math.floor(Math.random() * shows.length)]
    }

    getRandomShow(): Show {
        let shows = this.streamingService.shows
        return shows[Math.floor(Math.random() * shows.length)]
    }
}