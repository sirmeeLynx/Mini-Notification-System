// Models
import { subscriptionModel, ISubscription, ISubscriber } from '../models';
// Repository
import { SubscriptionRepository } from './repository';


interface ISubscriptionRequest {
  url: string;
  topic: ISubscription["topic"];
}

interface ISubscriptionResponse {
  url: string;
  topic: ISubscription["topic"];
  isNew: boolean;
  err?: string;
}

const subscribeToTopicService = async (data: ISubscriptionRequest): Promise<ISubscriptionResponse> => {
  const { url, topic } = data;
  try {
    const obj: ISubscription = { topic } as ISubscription;
    const repository = new SubscriptionRepository(subscriptionModel);

    const subscribersToTopic = await repository.find(obj);
    const subscription = subscribersToTopic.length > 0 ? subscribersToTopic[0] : await repository.create(obj);
    const isSubscribed = subscription.subscribers?.filter((subscriber) => subscriber.name === url);
    let isNew = false;
    
    if (subscription && isSubscribed!.length == 0){
        subscription.subscribers?.push({name: url} as ISubscriber);
        console.log(subscription.subscribers);
        subscription.save();
        isNew = true;
    }

    return {
        url,
        topic,
        isNew
    };
    
  } catch (err) {
    console.error("from Service =>", err);
    return {
      url, topic,
      isNew: false, err
    }
  }
};

export default subscribeToTopicService;
