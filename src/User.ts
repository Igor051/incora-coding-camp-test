import Subscription from "./Subscription";
import {StreamingService} from "./StreamingService";
import {userAlreadySubscribedValidity} from "./validators";

export default class User {
    readonly subscriptions: Subscription[] = []

    subscribe(streamingService: StreamingService): Subscription {
        userAlreadySubscribedValidity(this.subscriptions, streamingService)
        let subscription = new Subscription(streamingService)

        this.subscriptions.push(subscription)
        return subscription
    }
}