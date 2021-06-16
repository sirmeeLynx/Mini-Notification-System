/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      PUBLISHER_PORT: string;
      SUBSCRIBER_PORT: string;
      DB_URI: string;
      REDIS_PORT: string;
      REDIS_HOST: string;
      MONGO_USER: string;
      MONGO_PASSWORD: string;
    }
  }
}

export {};
