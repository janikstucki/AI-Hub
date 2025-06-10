<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const chats = ref([
  { id: 1, title: 'New Chat', model: 'Deepseek' },
  { id: 2, title: 'Second Chat', model: 'ChatGPT' },
  { id: 3, title: 'Third Chat', model: 'Claude' },
])

const isEditing = ref(false)
const isAuth = ref(false)

// Check, ob User eingeloggt ist (Token im localStorage)
onMounted(() => {
  isAuth.value = !!localStorage.getItem('token')
  localStorage.setItem('token', 'dein-token')

})

// Funktionen für Chat (wie bei dir)
function NewChat() {
  console.log('new')
  // newchatWindow (du musst hier evtl. noch was machen)
}

function EditChat(chat) {
  chat.isEditing = true
}

function SaveChatTitle(chat, event) {
  chat.title = event.target.value
  chat.isEditing = false
}

function DeleteChat(chat) {
  console.log('delete', chat.id)
  chats.value = chats.value.filter(c => c.id !== chat.id)
}

// Login-Router (geht zur Login-Seite)
const login = () => {
  router.push('/login')
}

// Home-Router
const home = () => {
  router.push('/')
}

// Logout-Funktion
const logout = () => {
  localStorage.removeItem('token') // Token löschen = ausgeloggt
  isAuth.value = false
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="header">
        <h2>Chats</h2>
        <button class="icon-button" @click="router.push('/newChat')">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
       
    </button>
      </div>

      <nav class="chat-list">
        <div v-if="chats.length === 0">
          <a href="#" class="chat-link" key="no-chats">
            Keine Chats, starte eine neue Konversation.
          </a>
        </div>

        <div v-else>
          <a
            v-for="chat in chats.sort((a, b) => a.id - b.id)"
            :key="chat.id"
            href="#"
            class="chat-link"
          >
            <div class="chat-row">
              <span v-if="!chat.isEditing" class="chat-title">{{ chat.title }}</span>
              <input
                v-else
                v-model="chat.title"
                @keyup.enter="SaveChatTitle(chat, $event)"
                class="chat-title-input"
              />
              <div class="chat-actions">
                <button class="icon-button" @click="EditChat(chat)">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
                </button>
                <button class="icon-button" @click="DeleteChat(chat)">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>                </button>
              </div>
            </div>
            <span class="model">({{ chat.model }})</span>
          </a>
        </div>
      </nav>

      <hr />

      <nav class="menu">
        <router-link to="/">Home</router-link>
        <router-link to="/settings">Einstellungen</router-link>

        <button v-if="isAuth" @click="logout" class="logout-button">Logout</button>
        <router-link id="loginButton" v-else to="/login">Login</router-link>
      </nav>
    </aside>

    <router-view />
  </div>
</template>

<style>
.logout-button {
  color: #000;
  border-color: #000;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  background-color: #f9f9f9;
}

.layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  background-color: #fff; 
  color: #000;
  overflow: hidden;
}

#loginButton{
  background-color: #4d6bfe;
  color: #f9f9f9;
}

.sidebar {
  width: 260px;
  background-color: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  border-right: 1px solid #ddd;
}

.menu a,
.menu .router-link-active,
.menu .router-link-exact-active {
  border: none; 
  outline: none;
}


.content {
  margin-left: 260px;
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.sidebar h2 {
  margin-bottom: 15px;
  font-size: 1.2em;
  color: #333;
}

.chat-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-link {
  color: #000;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  transition: background 0.2s;
  width: 100%;
  margin-bottom: 10px;
}

.chat-link:hover {
  background-color: #ddd;
}

.chat-link .model {
  font-size: 0.8em;
  color: #666;
}

.menu {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu a {
  color: #555;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu a:hover {
  background-color: #ececec;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header h2 {
  margin: 0;
  line-height: 1;
  font-size: 1.2em;
}

.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #333;
  transition: color 0.3s;
}

.icon-button:hover {
  color: #2563eb;
}

.size-6 {
  width: 24px;
  height: 24px;
}

.chat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  max-width: 140px; 
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chat-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.chat-title-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


</style>
