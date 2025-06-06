import express from "express"
import session from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import { createSessionStore } from "./db.js"
import * as userHandlers from "./handlers/userHandlers.js"
import * as accesstokenHandlers from "./handlers/accesstokenHandlers.js"
import * as chatHandlers from "./handlers/chatHandlers.js"
import { setup } from "./migrations.js"  // setup statt createTables importieren
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

const sessionStore = createSessionStore()

app.use(session({
  key: "SessionId",
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60
  }
}))

async function startServer() {
  await setup()  // Datenbank & Tabellen sicher erstellen
  console.log("DB ready, starting server... 🚀")

  // Hier erst Server starten und Routes einrichten
  // Users
  app.get("/getuserdata", userHandlers.getuserdata)
  app.post("/register", userHandlers.register)
  app.post("/login", userHandlers.login)
  app.post("/logout", userHandlers.logout)
  app.delete("/deleteuser", userHandlers.deleteuser)

  // Accesstokens
  app.get("/getaccesstokens", accesstokenHandlers.getAccesstokens)
  app.post("/addaccesstokens", accesstokenHandlers.addAccesstokens)
  app.delete("/deleteaccesstoken", accesstokenHandlers.deleteAccesstoken)

  // Chats
  app.get("/getallchats", chatHandlers.getAllChats)
  app.post("/getchat", chatHandlers.getChat)
  app.post("/addchat", chatHandlers.addChat)
  app.delete("/deletechat", chatHandlers.deleteChat)
  app.patch("/renamechat", chatHandlers.renameChat)
  app.post("/addchatmessage", chatHandlers.addChatMessage)

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Server running on port ${port}`))
}

startServer()
