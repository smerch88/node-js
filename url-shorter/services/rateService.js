import * as rateRepository from '../repository/rateRepository.js';

const RATE_LIMIT_DURATION_MS = 3600000;
const RATE_LIMIT_MAX_REQUESTS = 70;
const USER_RATE_LIMIT_DURATION_MS = 86400000;
const USER_RATE_LIMIT_MAX_REQUESTS = 1000;

async function setUrlRate(id) {
  const currentTime = new Date().getTime();
  await rateRepository.set(id, 'rate', currentTime);
  await rateRepository.set(id, 'count', 0);
}

async function setUrlRateName(id, username) {
  await rateRepository.set(id, 'username', username);
}

async function checkURLRate(id, username) {
  const currentTime = new Date().getTime();
  const urlRate = await rateRepository.get(id, 'rate');
  const urlTimestamp = parseInt(urlRate);

  if (!urlTimestamp || currentTime - urlTimestamp > RATE_LIMIT_DURATION_MS) {
    await setUrlRate(id);
  }

  const userRateKey = `user_${username}`;
  const userRate = await rateRepository.get(userRateKey, 'rate');
  const userTimestamp = parseInt(userRate);

  if (!userTimestamp || currentTime - userTimestamp > USER_RATE_LIMIT_DURATION_MS) {
    await rateRepository.set(userRateKey, 'rate', currentTime);
    await rateRepository.set(userRateKey, 'count', 0);
  }

  const urlCount = await rateRepository.get(id, 'count');
  const userCount = await rateRepository.get(userRateKey, 'count');

  if (parseInt(urlCount) > RATE_LIMIT_MAX_REQUESTS || parseInt(userCount) > USER_RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  await increaseUrlRate(id);
  await increaseUserRate(userRateKey);
  return true;
}

async function increaseUrlRate(id) {
  const urlCount = await rateRepository.get(id, 'count');
  const newCount = parseInt(urlCount) + 1;
  await rateRepository.set(id, 'count', newCount);
}

async function increaseUserRate(key) {
  const userCount = await rateRepository.get(key, 'count');
  const newCount = parseInt(userCount) + 1;
  await rateRepository.set(key, 'count', newCount);
}

async function deleteRate(id) {
  await rateRepository.deleteRecord(id);
}

export default { setUrlRate, checkURLRate, setUrlRateName, deleteRate };
