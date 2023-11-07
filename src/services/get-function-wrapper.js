export const getFunctionWrapper = (conditionStatus, conditionFunc, func = () => {}) => {
  if (conditionStatus) {
    conditionFunc();
  }
  func();
};
