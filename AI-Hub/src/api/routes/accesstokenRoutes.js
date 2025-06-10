import api from "../api.js"

export async function getAccesstokens() {
  try {
    const response = await api.get("/getaccesstokens")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function addAccesstokens(accesstokens) {
  try {
    const response = await api.post("/addaccesstokens", {accesstokens})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteAccesstoken(accesstokenid) {
  try {
    const response = await api.delete("/deleteaccesstokens", {accesstokenid})
    return response.data
  } catch (error) {
    console.error(error)
  }
}
