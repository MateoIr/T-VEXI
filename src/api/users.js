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

const getUserEmail = async (email) => {
  try {
    const response = await apiClient.get("/users", {
      params: {
        email,
      },
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

const registerUser = async ({ email, password, token }) => {
  try {
    const userEmails = await getUserEmail(email);

    if (userEmails.length === 0) {
      console.log("Usuario nuevo, registrando...");
      const response = await axios.post("http://localhost:8000/users", {
        email,
        password,
        token,
      });
      console.log("Usuario registrado:", response.data);
      return response.data;
    } else {
      console.log("El usuario ya existe.");
      return { error: "El usuario ya existe." };
    }
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
  }
};

export { getUserSelected, registerUser };
export default apiClient;
