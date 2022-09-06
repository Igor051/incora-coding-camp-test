export function durationValidity(str: string, value: number, from: number, to: number): void {
    if (value < 1 || value > 3000) {
        throw new RangeError(`${str} duration must be between 1 and 3000 minutes`)
    }
}

export function nameLengthValidity(name: string): void {
    if (name.length === 0) {
        throw new Error('Attribute "name" must have at least 1 character')
    }
}

export function realiseDateValidity(releaseDate):void {
    const today = new Date();
    const firstMovieEver = new Date(1888, 1, 1)
    if (releaseDate > today || releaseDate < firstMovieEver) {
        throw new RangeError('release date must be between 1888 and today\'s date')
    }
}

export function showNameDuplicationValidity(showsNames: string[], showName):void {
    if (showsNames.includes(showName)) {
        throw new Error("duplication of show names isn't allowed")
    }
}

export function showAlreadyBeenAddedValidity(viewsByShowNames, showName):void {
    if (viewsByShowNames.get(showName)) {
        throw new Error("this show has already been added to streaming service")
    }

}

export function showWithSelectedGenreExistence(shows):void{
    if (shows.length === 0) {
        throw new Error("There is no show for this genre." +
            "\nPlease try another genre or use \"getRandomShow() method\"")
    }
}
export function userAlreadySubscribedValidity(subscriptions, streamingService):void{
    if (subscriptions.some((subscription) => {
        return subscription.streamingService.name === streamingService.name
    })) {
        throw new Error("The user is already subscribed to this streaming service")
    }
}
