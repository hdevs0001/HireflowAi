const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  maxRetriesPerRequest: null,
  // the above parameter can be wrong just copied from the id
  // explaination
  //Don't give up on a Redis command after a fixed number of retries.
};
export default redisConnection;
