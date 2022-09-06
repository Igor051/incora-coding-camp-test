import {genres} from "./genres"
import {durationValidity, nameLengthValidity, realiseDateValidity} from "./validators";

export abstract class Show {
    readonly name: string
    readonly genre: genres
    readonly releaseDate: Date

    protected constructor(name: string, genre: genres, releaseDate: Date) {

        nameLengthValidity(name)
        realiseDateValidity(releaseDate)

        this.name = name
        this.genre = genre
        this.releaseDate = new Date(releaseDate.getTime());
    }


    abstract getDuration(): number

    toString():string{
        return `name: ${this.name} year: ${this.releaseDate.getFullYear()}  genre: ${this.genre}`
    }

}


export class Movie extends Show {
    readonly durationInMinutes

    constructor(name: string, genre: genres, releaseDate: Date, durationInMinutes: number) {
        super(name, genre, releaseDate);

        durationValidity("movie", durationInMinutes, 1, 3000)

        this.durationInMinutes = durationInMinutes
    }

    getDuration(): number {
        return this.durationInMinutes
    }
}

export class Episode extends Show {
    readonly durationInMinutes

    constructor(name: string, genre: genres, releaseDate: Date, durationInMinutes: number) {
        super(name, genre, releaseDate);

        durationValidity("episode", durationInMinutes, 1, 3000)

        this.durationInMinutes = durationInMinutes
    }

    getDuration(): number {
        return this.durationInMinutes
    }
}

export class Series extends Show {
    readonly episodes: Episode[]

    constructor(name: string, genre: genres, releaseDate: Date, episodes: Episode[]) {
        super(name, genre, releaseDate);
        this.episodes = episodes
    }

    getDuration(): number {
        let duration: number = 0
        this.episodes.forEach((episode) => {
            duration += episode.durationInMinutes
        })
        return duration
    }
}






