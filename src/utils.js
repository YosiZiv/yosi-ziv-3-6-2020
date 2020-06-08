export const saveCache = (name, data) => {
  // const getCache = JSON.parse(localStorage.getItem(name));
  // getCache[key] = data;
  const setCache = localStorage.setItem(name, JSON.stringify(data));
  return setCache;
};
export const checkValidation = (id, value, validation) => {
  console.log(id, value, validation);

  if (!validation) {
    return null;
  }
  if (validation.isRequired && value.trim() === "") {
    return `${id} field is require`;
  }
  if (validation.minLength && value.length < validation.minLength) {
    return `${id} require min ${validation.minLength}`;
  }
  if (validation.maxLength && value.length > validation.maxLength) {
    return `${id} require max length ${validation.maxLength}`;
  }
  if (validation.english && !/^[a-zA-Z]+$/.test(value)) {
    return `${id} field must contain only english letters`;
  }
};
