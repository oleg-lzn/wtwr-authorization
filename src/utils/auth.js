export const BASE_URL = "https://api.nomoreparties.co";

export const register = async (username, password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });
    if (!response.ok) {
      throw new Error("new error with fetching");
    } else {
      return await response.json();
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const authorize = async (identifier, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
    if (!response.ok) {
      throw new Error(`Error with Login ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};
