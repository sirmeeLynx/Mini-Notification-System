import { Schema, model, Document } from 'mongoose';

interface ISubscriber extends Document {
    name: string
}

interface ISubscription extends Document {
    topic: string,
    subscribers?: [ISubscriber]
}

interface ISentMessages extends Document {
    recipient: ISubscriber["name"],
    message: Record<string, any>
}

const subscriberSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{ timestamps: true });

const SubscriptionSchema = new Schema({
    topic: {
        type: String,
        required: true,
        unique: true,
      },
    subscribers: [subscriberSchema]
});

const SentMessages = new Schema({
    recipient: subscriberSchema,
    message: Schema.Types.Mixed
}, { timestamps: true }); 

const subscriptionModel = model<ISubscription>('Subscriptions', SubscriptionSchema);
const sentMessagesModel = model<ISentMessages>('SentMessages', SentMessages);

export {
    subscriptionModel, 
    sentMessagesModel,
    ISubscriber,
    ISubscription,
    ISentMessages
}
