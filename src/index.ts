import {StreamingService} from "./StreamingService"
import {genres} from "./genres"
import {Episode, Movie, Series} from "./shows";
import User from "./User"

let genre = genres.Horror


//  ----  CREATING OBJECTS   ----

let episode1 = new Episode("first", genre, new Date(2021, 6, 1), 50)
let episode2 = new Episode("second", genre, new Date(2021, 6, 12), 60)

let series1 = new Series("series1", genre, new Date(2021, 3, 12), [episode1, episode2])

let movie1 = new Movie("movie1", genre, new Date(2022, 7, 13), 160)
let movie2 = new Movie("movie2", genre, new Date(2021, 11, 13), 160)
let movie3 = new Movie("movie3", genre, new Date(2021, 11, 13), 160)
let movie4 = new Movie("movie4", genre, new Date(2021, 11, 13), 160)
let movie5 = new Movie("movie5", genre, new Date(2022, 3, 13), 160)
let movie6 = new Movie("movie6", genre, new Date(2022, 3, 13), 160)
let movie7 = new Movie("movie7", genre, new Date(2022, 3, 13), 160)
let movie8 = new Movie("movie8", genre, new Date(2022, 4, 13), 160)
let movie9 = new Movie("movie9", genre, new Date(2022, 4, 13), 160)
let movie10 = new Movie("movie10", genre, new Date(2021, 11, 13), 160)
let movie11 = new Movie("movie11", genre, new Date(2022, 3, 13), 160)
let movie12 = new Movie("movie12", genre, new Date(2022, 3, 13), 160)
let movie13 = new Movie("movie13", genre, new Date(2022, 3, 13), 160)

let streamingService1 = new StreamingService("streamingService1", [series1, movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
    movie11,
    movie12,
    movie13])

let streamingService2 = new StreamingService("streamingService2", [
    movie7,
    movie8,
    movie9,
    movie10,
    movie11,
    movie12,
    movie13
])

let User1 = new User()
let User2 = new User()
//----   CREATING OBJECTS   ----


//----   USAGE   ----

let subscription1 = User1.subscribe(streamingService1)
let subscription2 = User1.subscribe(streamingService2)
let subscription3 = User2.subscribe(streamingService1)

subscription1.watch("movie1")
subscription1.watch("movie5")
subscription1.watch("movie5")

subscription2.watch("movie7")
subscription2.watch("movie7")
subscription2.watch("movie9")

subscription3.watch("movie1")
subscription3.watch("movie1")

streamingService2.addShow(movie6)
subscription2.watch("movie6")

console.log("\n\t\tstreaming service 1 views by show names\t\t\n")
console.table(Object.fromEntries(streamingService1.viewsByShowNames))
console.log("\n\t\tstreaming service 2 views by show names\t\t\n")
console.table(Object.fromEntries(streamingService2.viewsByShowNames))

console.log(`movie recommendation by genre:\n${subscription2.getRecommendationByGenre(genres.Horror)}`)

console.log(`movie recommendation trending:\n${subscription2.getRecommendationTrending()}`)
//----   USAGE   ----



//---    VALIDATIONS   ----

console.log("\n---VALIDATIONS---\n")

//1. trying to watch non-existent show
try {
    subscription2.watch("a non-existent show")
} catch (e) {
    console.error('1. ' + e.message)
}
//2. trying to subscribe twice
try {
    User1.subscribe(streamingService2)
} catch (e) {
    console.error('2. ' +e.message)
}
//3. trying to add show that is already exist
try {
    streamingService1.addShow(movie1)
} catch (e) {
    console.error('3. ' +e.message)
}
//4. trying to add duplicates
try {
    let movie_1 = new Movie("name", genres.Comedy, new Date(2021, 3, 2), 100)
    let movie_2 = new Movie("name", genres.Comedy, new Date(2021, 3, 2), 100)
    new StreamingService("name", [movie_1, movie_2])
} catch (e) {
    console.error('4. ' +e.message)
}
//5. trying to add the same show twice
try {
    let movie_1 = new Movie("name", genres.Comedy, new Date(2021, 3, 2), 100)
    let movie_2 = movie_1
    new StreamingService("name", [movie_1, movie_2])
} catch (e) {
    console.error('5. ' +e.message)
}
//6. Attribute "name" must have at least 1 character
try {
    new StreamingService("")
} catch (e) {
    console.error('6. ' +e.message)
}
//7. Attribute "name" must have at least 1 character
try {
    new Movie("", genres.Romance, new Date(2021, 3, 2), 100)
} catch (e) {
    console.error('7. ' +e.message)
}
//8. bad date (Must be no later than today's date)
try {
    new Movie("name", genres.Comedy, new Date(2024, 3, 2), 100)
} catch (e) {
    console.error('8. ' +e.message)
}
//9. bad duration (must be between 1 and 3000)
try {
    new Movie("name", genres.Comedy, new Date(2021, 3, 2), -2)
} catch (e) {
    console.error('9. ' +e.message)
}
//10. if there are no films with this genre, we will get an error
try {
    subscription1.getRecommendationByGenre(genres.Thriller)
} catch (e) {
    console.error('10. ' +e.message)
}
//11. trying to subscribe twice
try {
    User1.subscribe(streamingService1)
} catch (e) {
    console.error('11. ' +e.message)
}
//----   VALIDATIONS   ----



