import config from '../config';

const Queue = require('bull');

const createQueue = (queueName: string)=>{
     return new Queue(queueName, {
         redis: {
            port: config.REDIS_PORT,
            host: config.REDIS_HOST,
          }
     });
};

export {
    createQueue
};