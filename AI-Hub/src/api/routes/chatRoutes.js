import api from "../api.js"

export async function getAllChats() {
  try {
    const response = await api.get("/getallchats")
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getChat(chatid) {
  try {
    const response = await api.post("/getchat", {chatid})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function addChat(chatname, selectedai) {
  try {
    const response = await api.post("/addchat", {chatname, selectedai})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function deleteChat(chatid) {
  try {
    const response = await api.delete("/deletechat", {chatid})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function renameChat(chatid, chatname) {
  try {
    const response = await api.post("/renamechat", {chatid, chatname})
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function addChatMessage(content, chatid) {
  try {
    const response = await api.post("/addchatmessage", {content, chatid})
    return response.data
  } catch (error) {
    console.error(error)
  }
}
