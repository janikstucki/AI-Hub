<script setup>
import { ref } from "vue";
import router from "@/router";

const email = ref("email@test");
const password = ref("starkespasswort");

const isEditingEmail = ref(false);
const isEditingPassword = ref(false);

const showModal = ref(false);
const newModelName = ref("");
const newApiKey = ref("");

const models = ref([
  { id: 1, title: "Chat-GPT", apiKey: "1231321", isEditing: false },
  { id: 2, title: "Claude", apiKey: "fgfgf}", isEditing: false },
]);

function SaveModelTitle(chat, event) {
  chat.title = event.target.value;
  chat.isEditing = false;
}

function DeleteModel(chat) {
  const index = models.value.indexOf(chat);
  if (index > -1) {
    models.value.splice(index, 1);
  }
}

function handleCreateChat() {
  if (!newModelName.value || !newApiKey.value) return;

  const newId = models.value.length + 1;
  models.value.push({
    id: newId,
    title: newModelName.value,
    apiKey: newApiKey.value,
    isEditing: false,
  });

  newModelName.value = "";
  newApiKey.value = "";
  showModal.value = false;
}

function saveEmail() {
  isEditingEmail.value = false;
}

function savePassword() {
  isEditingPassword.value = false;
}

function editEmail() {
  isEditingEmail.value = true;
}

function editPassword() {
  isEditingPassword.value = true;
}
</script>

<template>
  <div id="nwcontainer">
    <div class="nwview">
      <h1>Model-Verwaltung</h1>

      <div class="form-group">
        <label for="email">E-Mail</label>
        <div class="input-edit-wrapper">
          <button class="icon-button" @click="editEmail" aria-label="Email bearbeiten">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
            </svg>
          </button>
          <input
            v-if="isEditingEmail"
            type="text"
            id="email"
            v-model="email"
            @keyup.enter="saveEmail"
            @blur="saveEmail"
          />
          <input
            v-else
            type="text"
            id="email"
            v-model="email"
            readonly
          />
        </div>

        <label for="password">Passwort</label>
        <div class="input-edit-wrapper">
          <button class="icon-button" @click="editPassword" aria-label="Passwort bearbeiten">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
            </svg>
          </button>
          <input
            v-if="isEditingPassword"
            type="text"
            id="password"
            v-model="password"
            @keyup.enter="savePassword"
            @blur="savePassword"
          />
          <input
            v-else
            type="password"
            id="password"
            v-model="password"
            readonly
          />
        </div>
      </div>

      <div v-if="models.length === 0">
        <p>Noch kein Model vorhanden.</p>
      </div>

      <div v-else>
        <a
          v-for="chat in models.sort((a, b) => a.id - b.id)"
          :key="chat.id"
          href="#"
          class="chat-link"
        >
          <div class="chat-row">
            <span v-if="!chat.isEditing">{{ chat.title }}</span>
            <input
              v-else
              v-model="chat.title"
              @keyup.enter="SaveModelTitle(chat, $event)"
              class="chat-title-input"
              @blur="SaveModelTitle(chat, $event)"
            />
            <div class="chat-actions">
              <button class="icon-button" @click="chat.isEditing = true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                </svg>
              </button>
              <button class="icon-button" @click="DeleteModel(chat)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
              </button>
            </div>
          </div>
        </a>
      </div>

      <button id="nwButton" @click="showModal = true">Neues Model hinzufügen</button>
      <button id="Button" type="button" @click="router.push('/')">Zurück</button>
    </div>

    <!-- POPUP FÜR NEUES MODEL -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button class="icon-button close-button" @click="showModal = false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2>Neues Model hinzufügen</h2>

        <label for="modelname">Model-Name</label>
        <input type="text" id="modelname" v-model="newModelName" placeholder="Model-Name" />

        <label for="apikey">API-Key</label>
        <input type="text" id="apikey" v-model="newApiKey" placeholder="API-Schlüssel" />

        <button id="nwButton" @click="handleCreateChat">Speichern</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  color: inherit;
  transition: color 0.2s ease;
}

.icon-button:hover svg {
  stroke: #4d6bfe;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

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

.input-edit-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 6px;
  background-color: #eaeaea;
  font-weight: 600;
  outline: none;
}

input[readonly] {
  background-color: #d3d3d3;
  cursor: default;
}

.chat-link {
  display: block;
  text-decoration: none;
  color: #333;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px 12px;
  transition: background-color 0.2s ease;
}

.chat-link:hover {
  background-color: #f0f0f0;
}

.chat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title-input {
  font-weight: 600;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  width: 70%;
  font-size: 1rem;
  background-color: #eaeaea;
  outline: none;
}

.chat-actions button {
  margin-left: 8px;
}

#nwButton {
  margin-top: 20px;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background-color: #4d6bfe;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#nwButton:hover {
  background-color: #3b55d4;
}

#Button {
  margin-top: 12px;
  padding: 8px 12px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background-color: #888;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#Button:hover {
  background-color: #666;
}

.size-6 {
  width: 24px;
  height: 24px;
}
</style>
