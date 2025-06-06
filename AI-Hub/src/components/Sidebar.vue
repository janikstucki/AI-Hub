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
          <!-- dein SVG Icon -->
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
                  <!-- Edit Icon SVG -->
                </button>
                <button class="icon-button" @click="DeleteChat(chat)">
                  <!-- Delete Icon SVG -->
                </button>
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

        <!-- Wenn eingeloggt: Logout-Button, sonst Login-Link -->
        <button v-if="isAuth" @click="logout" class="logout-button">Logout</button>
        <router-link v-else to="/login">Login</router-link>
      </nav>
    </aside>

    <router-view />
  </div>
</template>

<style>
/* Deine Styles ... */
.logout-button {
  background-color: #f33;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.logout-button:hover {
  background-color: #d00;
}

.layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  background-color: #fff; 
  color: #000;
  overflow: hidden;
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
