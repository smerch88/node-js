import db from '../db/redisClient.js';

const set = async (id, field, value) => {
  return db.hSet(id, field, value);
};

const get = async (id, field) => {
  return db.hGet(id, field);
};

const deleteRecord = async (id) => {
  return db.del(id);
};

export { set, get, deleteRecord };
