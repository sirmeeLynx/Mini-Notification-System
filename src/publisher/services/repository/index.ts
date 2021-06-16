import { ISubscription, ISentMessages } from '../../models';
import mongoose, { Document } from 'mongoose';
import { MessageQueue } from './messageQueue';

interface IWrite<T> {
    create(item: T): Promise<T>;
}

interface IRead<T> {
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
}

// that class only can be extended for mongoDB Documents
abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
   //creating a property to use your code in all instances 
   // that extends your base repository and reuse on methods of class
   public readonly model: mongoose.Model<any, any, any>;

  //we created constructor with arguments to manipulate mongodb operations
  constructor(model: mongoose.Model<any, any, any>) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    const record: Document = await new this.model(item);
    await record.save();
    //return document if created
    return this.findOne(record._id);
  }

  async find(item: T): Promise<T[]> {
    return await this.model.find(item);
  }

  async findOne(id: string): Promise<T> {
     return await this.model.findById(id);
  }
}

export class SubscriptionRepository extends BaseRepository<ISubscription> { };
export class SentMessagesRepository extends BaseRepository<ISentMessages> { };
export { MessageQueue };
