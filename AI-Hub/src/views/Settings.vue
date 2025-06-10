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
  { id: 1, title: "Chat-GPT", apiKey: "1231321" },
  { id: 2, title: "Claude", apiKey: "fgfgf" },
]);

function EditChat(chat) {
  chat.isEditing = true;
}

function SaveModelTitle(chat, event) {
  chat.title = event.target.value;
  chat.isEditing = false;
}

function DeleteChat(chat) {
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
    model: "custom",
    isEditing: false,
  });

  newModelName.value = "";
  newApiKey.value = "";
  showModal.value = false;
}
</script>

<template>
  <div id="nwcontainer">
    <div class="nwview">
      <h1>Model-Verwaltung</h1>

      <div class="form-group">
        <label for="email">E-Mail</label>
        <div class="editable-field">
          <div class="field-content">
            <input v-if="isEditingEmail" type="text" id="email" v-model="email" @blur="isEditingEmail = false" @keyup.enter="isEditingEmail = false" />
            <span v-else>{{ email }}</span>
          </div>
          <button class="icon-button" @click="isEditingEmail = true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
        </div>

        <label for="password">Passwort</label>
        <div class="editable-field">
          <div class="field-content">
            <input v-if="isEditingPassword" type="text" id="password" v-model="password" @blur="isEditingPassword = false" @keyup.enter="isEditingPassword = false" />
            <span v-else>{{ password }}</span>
          </div>
          <button class="icon-button" @click="isEditingPassword = true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
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
                </svg>
              </button>
            </div>
          </div>
        </a>
      </div>

      <button id="nwButton" @click="showModal = true">Neues Model hinzufügen</button>
      <button id="Button" type="button" @click="router.push('/')">Zurück</button>

      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal">
          <h3>Neues Model erstellen</h3>
          <form @submit.prevent="handleCreateChat">
            <label for="model-name">Model-Name:</label>
            <input type="text" id="model-name" v-model="newModelName" />
            <label for="api-key">API-Key:</label>
            <input type="text" id="api-key" v-model="newApiKey" />
            <button id="nwButton" type="submit">Erstellen</button>
            <button id="Button" type="button" @click="showModal = false">Abbrechen</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.icon-button svg {
  width: 24px;
  height: 24px;
}

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

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 4px;
  box-sizing: border-box;
}

.editable-field {
  position: relative;
  display: flex;
  align-items: center;
}

.editable-field input,
.editable-field span {
  flex: 1;
  padding-right: 36px; /* Platz für den Button */
}

.editable-field .icon-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
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

.chat-link {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.chat-link:hover {
  background-color: #e0e0e0; 
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
