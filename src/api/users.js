import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

const getUserSelected = async (email, password) => {
  try {
    const response = await apiClient.get("/users", {
      params: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export { getUserSelected };
export default apiClient;
