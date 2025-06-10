import api from "../api.js"

export async function isLoggedIn() {
  try {
    const response = await api.get("/isloggedin")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getUserData() {
  try {
    const response = await api.get("/getuserdata")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", {username, email, password})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function login(email, password) {
  try {
    const response = await api.post("/login", {email, password})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function logout() {
  try {
    const response = await api.post("/logout")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteuser() {
  try {
    const response = await api.delete("/deleteuser")
    return response.data
  } catch (error) {
    console.error(error)
  }
}