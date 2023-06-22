import axios from "axios";

export async function login(email, password) {
  const { data: user } = await axios.post("/api/users/login", {
    email: email,
    password: password,
  });

  return user;
}

export async function register(email, password) {
  const { data: user } = await axios.post("/api/users/register", {
    email: email,
    password: password,
  });

  return user;
}

export async function getUser(token) {
  // Headers are added as a second parameter to axios.get()
  const { data: user } = await axios.get("/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return user;
}

export async function getAllUsers() {
  try {
    const { data: users } = await axios.get("/api/users/getAll");

    return users;
  } catch (error) {
    console.log("Error fetching all users");
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getProducts() {
  try {
    const { data: products } = await axios.get("/api/products");

    return products;
  } catch (error) {
    console.error("Error getting products", error);
    throw error;
  }
}
