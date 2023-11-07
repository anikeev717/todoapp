export const getTimerMark = () => Math.floor(Date.now() / 1000);

export const getTimerTimeValue = (oldTimerTime, oldTimerMark) => {
  const newTimerMark = getTimerMark();
  const timeMarkDifference = newTimerMark - oldTimerMark;
  const newTimerTime = oldTimerTime - timeMarkDifference;
  return newTimerTime < 0 ? 0 : newTimerTime;
};
