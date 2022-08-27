export const setStorageValues = (...params: string[][]): void => {
  Array.from(params).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const removeStorageValues = (...values: string[]) => {
  Array.from(values).forEach((value) => {
    localStorage.removeItem(value);
  });
};
