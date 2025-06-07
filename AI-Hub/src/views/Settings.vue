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
          <input v-if="isEditingEmail" type="text" id="email" v-model="email" @blur="isEditingEmail = false" />
          <span v-else>{{ email }}</span>
          <button class="icon-button" @click="isEditingEmail = true">
            ✏️
          </button>
        </div>

        <label for="password">Passwort</label>
        <div class="editable-field">
          <input v-if="isEditingPassword" type="text" id="password" v-model="password" @blur="isEditingPassword = false" />
          <span v-else>{{ password }}</span>
          <button class="icon-button" @click="isEditingPassword = true">
            ✏️
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
              <button class="icon-button" @click="chat.isEditing = true">
                ✏️
              </button>
              <button class="icon-button" @click="DeleteModel(chat)">
                🗑️
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