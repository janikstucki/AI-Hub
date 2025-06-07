<script setup>
import { ref } from "vue";
import router from "@/router";

// Form-Felder
const email = ref("email@test");
const password = ref("starkespasswort");

// Modell-Auswahl (wenn du die später brauchst)
const models = ["gpt-3", "gpt-4", "claude"];

// Beispielhafte Chat-Daten
const chats = ref([
  { id: 1, title: "Erster Chat", model: "gpt-4", isEditing: false },
  { id: 2, title: "Zweiter Chat", model: "claude", isEditing: false },
]);

// Chat bearbeiten aktivieren
function EditChat(chat) {
  chat.isEditing = true;
}

// Chat-Titel speichern
function SaveChatTitle(chat, event) {
  chat.title = event.target.value;
  chat.isEditing = false;
}

// Chat löschen
function DeleteChat(chat) {
  const index = chats.value.indexOf(chat);
  if (index > -1) {
    chats.value.splice(index, 1);
  }
}

// Chat erstellen (Dummy-Logik)
function handleCreateChat() {
  const newId = chats.value.length + 1;
  chats.value.push({
    id: newId,
    title: `Neuer Chat ${newId}`,
    model: models[0],
    isEditing: false,
  });
}
</script>

<template>
  <div id="nwcontainer">
    <div class="nwview">
      <h1>Neuer Chat</h1>
      <form @submit.prevent="handleCreateChat">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input
            type="text"
            id="email"
            v-model="email"
            required
            :placeholder="email"
          />

          <label for="password">Passwort</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            :placeholder="password"
          />
        </div>

        <!-- Keine Chats -->
        <div v-if="chats.length === 0">
          <a href="#" class="chat-link" key="no-chats">
            Noch keine Chats vorhanden, starte eine neue Unterhaltung.
          </a>
        </div>

        <!-- Chat-Liste -->
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
                 <button class="icon-button" @click="DeleteChat(chat)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </button>
              </div>
            </div>
            <span class="model">({{ chat.model }})</span>
          </a>
        </div>
        <button id="nwButton" type="submit">Neues Model hinzufügen</button>

        <!-- Zurück Button -->
        <button id="Button" type="button" @click="router.push('/')">Zurück</button>
        <!-- Chat erstellen Button -->
      </form>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#nwcontainer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nwview {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 1rem;
  color: black;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 4px;
  box-sizing: border-box;
}

.chat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.chat-title {
  font-weight: 600;
}

.chat-title-input {
  width: 70%;
  padding: 5px;
}

.chat-actions {
  display: flex;
  gap: 5px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
}

#nwButton {
  width: 100%;
  padding: 10px;
  background-color: #4d6bfe;
  color: white;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
}

#Button {
  width: 100%;
  padding: 10px;
  color: #4d6bfe;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
