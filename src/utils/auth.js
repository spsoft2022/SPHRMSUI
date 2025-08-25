import { jwtDecode } from "jwt-decode";

export const getTokenExpiry = (token) => {
  if (!token) return null;
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000; // ms
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() > expiry;
};

export const refreshAccessToken = async () => {
  const oldToken = localStorage.getItem("token");
  if (!oldToken) return null;

  try {
    const response = await fetch("http://localhost:5000/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: oldToken }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("Token refreshed after user action");
      return data.token;
    } else {
      console.log("Refresh failed:", data);
      return null;
    }
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
};

// Main helper
export const getValidToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  if (!isTokenExpired(token)) {
    return token; // still valid
  }

  // expired → refresh
  return await refreshAccessToken();
};
