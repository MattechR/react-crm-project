import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";
setTokenHeader();

function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export function createCard(card) {
  return httpService.post("/cards", card);
}

export async function logIn(credentials) {
  const { data } = await httpService.post("/auth", credentials);

  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

console.log(getJWT());

const usersService = {
  createUser,
  logIn,
  logout,
  getUser,
  getJWT,
  createCard,
};

export default usersService;
