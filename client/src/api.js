import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_API_URL,
});

console.log(API);
