//checks if a duration falls within a range
export function durationValidity(str: string, value: number, from: number, to: number): void {
    if (value < 1 || value > 3000) {
        throw new RangeError(`${str} duration must be between 1 and 3000 minutes`)
    }
}
//throw en error if name is an empty string
export function nameLengthValidity(name: string): void {
    if (name.replace(/\s/g, '').length === 0) {
        throw new Error('Attribute "name" must have at least 1 character')
    }
}
//checks if a date falls within a range
export function realiseDateValidity(releaseDate):void {
    const today = new Date();
    const firstMovieEver = new Date(1888, 1, 1)
    if (releaseDate > today || releaseDate < firstMovieEver) {
        throw new RangeError('Release date must be between 1888 and today\'s date')
    }
}
//throw an Error if showsNames includes showName
export function showNameDuplicationValidity(showsNames: string[], showName):void {
    if (showsNames.includes(showName)) {
        throw new Error("Duplication of show names isn't allowed")
    }
}
//throw a Error if show already been added
export function showAlreadyBeenAddedValidity(viewsByShowNames, showName):void {
    if (viewsByShowNames.get(showName)) {
        throw new Error("This show has already been added to streaming service")
    }

}
/*if the show with the given genre does not exist, then
 It throws an error and It will suggests using another genre or the "getRandomShow" method
 */
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
//if show doesn't exist throw Error
export function showExistence(currentShowViews) {
    if (currentShowViews === undefined) {
        throw new Error("This show doesn't exist")
    }
}
