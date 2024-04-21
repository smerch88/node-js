import * as rateRepository from '../repository/rateRepository.js';

const RATE_LIMIT_DURATION_MS = 3600000;
const RATE_LIMIT_MAX_REQUESTS = 100;
const USER_RATE_LIMIT_DURATION_MS = 86400000;
const USER_RATE_LIMIT_MAX_REQUESTS = 1000;

async function setUrlRate(id) {
  const currentTime = new Date().getTime();
  await rateRepository.set(id, 'rate', currentTime);
}

async function setUrlRateName(id, username) {
  await rateRepository.set(id, 'username', username);
}

async function checkURLRate(id, username) {
  await increaseUrlRate(id);
  const urlRate = await rateRepository.get(id, 'rate');
  const urlTimestamps = urlRate.split(',').map(Number);
  const currentMoment = new Date().getTime();
  const urlRequestsWithinDuration = urlTimestamps.filter(timestamp => timestamp > currentMoment - RATE_LIMIT_DURATION_MS);

  const userRateKey = `user_${username}`;
  await increaseUserRate(userRateKey);
  const userRate = await rateRepository.get(userRateKey, 'rate');
  const userTimestamps = userRate ? userRate.split(',').map(Number) : [];
  const userRequestsWithinDuration = userTimestamps.filter(timestamp => timestamp > currentMoment - USER_RATE_LIMIT_DURATION_MS);

  if (urlRequestsWithinDuration.length > RATE_LIMIT_MAX_REQUESTS || userRequestsWithinDuration.length > USER_RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  return true;
}

async function increaseUrlRate(id) {
  const currentTime = new Date().getTime();
  const urlRate = await rateRepository.get(id, 'rate');
  const urlTimestamps = urlRate ? urlRate.split(',').map(Number) : [];
  urlTimestamps.push(currentTime);
  const currentMoment = new Date().getTime();
  const urlTimestampsWithinDuration = urlTimestamps.filter(timestamp => timestamp > currentMoment - RATE_LIMIT_DURATION_MS);
  await rateRepository.set(id, 'rate', urlTimestampsWithinDuration.join(','));
}

async function increaseUserRate(key) {
  const currentTime = new Date().getTime();
  const userRate = await rateRepository.get(key, 'rate');
  const userTimestamps = userRate ? userRate.split(',').map(Number) : [];
  userTimestamps.push(currentTime);
  const currentMoment = new Date().getTime();
  const userTimestampsWithinDuration = userTimestamps.filter(timestamp => timestamp > currentMoment - USER_RATE_LIMIT_DURATION_MS);
  await rateRepository.set(key, 'rate', userTimestampsWithinDuration.join(','));
}

async function deleteRate(id) {
  await rateRepository.deleteRecord(id);
}

export default { setUrlRate, checkURLRate, setUrlRateName, deleteRate };
