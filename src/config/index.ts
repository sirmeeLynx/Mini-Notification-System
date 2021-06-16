import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  PUBLISHER_PORT: process.env.PUBLISHER_PORT,
  SUBSCRIBER_PORT: process.env.SUBSCRIBER_PORT,
  DB_URI: process.env.DB_URI,
  REDIS_PORT: parseInt(process.env.REDIS_PORT!, 10),
  REDIS_HOST: process.env.REDIS_HOST,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
};
