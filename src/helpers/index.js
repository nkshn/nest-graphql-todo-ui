import { LOCAL_STORAGE_KEY } from "../constants";

// get setting from localStorage
export function getLocalStorage() {
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
}

// save date to localStorage
export function saveLocalStorage(data) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}