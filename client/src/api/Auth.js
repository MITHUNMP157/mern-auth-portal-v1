export const register = async (name, email, password, role) => {
  try {
    const resRegister = await fetch(
      `${process.env.REACT_APP_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      }
    );
    const rawData = await resRegister.text();
    let data;
    try {
      data = rawData ? JSON.parse(rawData) : null;
    } catch (raw) {
      console.log("Invalid JSON Response:", raw);
      throw new Error("Server did not return valid JSON");
    }

    if (!resRegister.ok) {
      throw new Error(data.message || "Register Failed");
    }

    return data;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid Credentials");
    }

    const token = data.token;
    const role = data.role;
    const userId = data.userId;
    const userName = data.userName;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", userName);
    return token;
  } catch (error) {
    console.error(
      `Error during login:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(error.message || "Login Failed");
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/verifyToken`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { valid: false };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Token verification failed:", error);
    localStorage.removeItem("token");
    return { valid: false };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
