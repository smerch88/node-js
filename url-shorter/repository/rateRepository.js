import db from '../db/redisClient.js';

const set = async (id, field, value) => {
  return db.hSet(id, field, value);
};

const get = async (id, field) => {
  return db.hGet(id, field);
};

export { set, get };
