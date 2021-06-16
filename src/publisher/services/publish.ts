import axios from 'axios';
// Models
import { subscriptionModel, ISubscription, ISentMessages, sentMessagesModel } from '../models';
// Repository
import { SubscriptionRepository, SentMessagesRepository, MessageQueue } from './repository';
import { createQueue } from '../../loaders/bullQueueLoader';

//import redisClient from '../../loaders/redisClientLoader';
interface IPublishRequest {
  topic: ISubscription["topic"];
  data: Record<string, any>;
}

interface IPublishResponse {
  message?: string;
  err?: string;
}

const sendMessageToUrl = async (url: string, message: Record<string, any>): Promise<{status: number}> => {
    const payload = JSON.stringify(message);
    return axios.post(url, payload,{
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
    .then(response => ({status: response.status}),
          error => ({status: error.status}));
};

const publishMessage = async (payload: IPublishRequest): Promise<IPublishResponse> => {
  const { data, topic } = payload;
  const CHANNEL_NAME = "notification";
  try {
    const obj: ISubscription = { topic } as ISubscription;
    const subscriptionRepository = new SubscriptionRepository(subscriptionModel);
    const sentMessageRepository = new SentMessagesRepository(sentMessagesModel);
    const queue = createQueue(CHANNEL_NAME);
    const messageQueue = new MessageQueue(queue, sendMessageToUrl);

    const subscribersToTopic = await subscriptionRepository.find(obj);
    const subscribers = subscribersToTopic[0].subscribers || [];
    for(const subscriber of subscribers){
        const recipientUrl = subscriber.name;
        //prepared for serialization to pass into queue for callback
        const onMessageSent = function(){          
          (global as any).fnCreateMessage = sentMessageRepository.create;
          return async function(recipientUrl:string, data:any){
            const message = {
              recipient: recipientUrl,
              message: data
            } as ISentMessages;

            await (global as any).fnCreateMessage(message);
        }
      };
      messageQueue.publish(recipientUrl, payload, onMessageSent());
    }    

    return {
        message: "message sent successfully!"
    };
    
  } catch (err) {
    console.error("from Service =>", err);
    return {
      err
    }
  }
};

export default publishMessage;
