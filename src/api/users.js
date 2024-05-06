import axios from "axios";

export function getPosts() {
  return axios.get("http://localhost:8000/users").then((res) => res.data);
}
export function getUserSelected() {
  return axios
    .get("http://localhost:8000/users?email=a@a&password=12345")
    .then((res) => res.data);
}

export function getUserSelected2(email, password) {
  const url = `http://localhost:8000/users?email=${email}&password=${password}`;
  return axios.get(url).then((res) => res.data);
}
