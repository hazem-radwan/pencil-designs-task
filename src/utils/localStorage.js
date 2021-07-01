export function saveObjectToLocalStorage(name, obj) {
  let isObject = obj && Object.keys(obj).length > 0;
  if (isObject) {
    localStorage.setItem(name, JSON.stringify(obj));
  }
}

export function getObjectFromLocalStorage(name) {
  let isExist = localStorage.getItem(name);
  return isExist ? JSON.parse(localStorage.getItem(name)) : null;
}
