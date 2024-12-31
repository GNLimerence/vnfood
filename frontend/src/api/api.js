import axios from "./axios";

export const loginAction = ({ email, password }) => {
  const URL = "/auth/login";
  const data = {
    email,
    password,
  };
  return axios.post(URL, data);
};

export const register = ({ email, password, username }) => {
  const URL = "/auth/register";
  const data = {
    email,
    password,
    username,
  };
  return axios.post(URL, data);
};
