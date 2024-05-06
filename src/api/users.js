import axios from "axios";

export function getPosts() {
  return axios
    .get("http://localhost:8000/posts", { params: { _sort: "title" } })
    .then((res) => res.data);
}
