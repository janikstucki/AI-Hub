<script setup>
import { ref } from 'vue';
import router from '@/router';

const nwName = ref('');
const nwModel = ref('');

const models = ['gpt-3', 'gpt-4', 'claude'];

function handleCreateChat() {
  if (!nwName.value.trim() || !nwModel.value.trim()) {
    alert('Bitte Chat-Name und Model ausfüllen!');
    return;
  }
  // Hier machst du was mit den Daten, z.B. API call oder State update
  console.log('Neuer Chat erstellt:', nwName.value, nwModel.value);

  // Nach Erfolg z.B. zurück zur Startseite oder Popup schließen
  router.push('/'); 
}
</script>

<template>
  <div id="nwcontainer">
    <div class="nwview">
      <h1>Neuer Chat</h1>
      <form @submit.prevent="handleCreateChat">
        <div class="form-group">
          <label for="chatName">Chat-Name</label>
          <input
            type="text"
            id="chatName"
            v-model="nwName"
            required
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label for="model">Model</label>
            <select v-model="nwModel" required>
            <option value="" disabled>Wähle ein Model</option>
            <option v-for="model in models" :key="model" :value="model">
                {{ model }}
            </option>
            </select>

        </div>
        <button id="nwButton" type="submit">Chat erstellen</button>
        <button id="Button" type="button" @click="router.push('/')">Zurück</button>
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

#nwButton {
  width: 100%;
  padding: 10px;
  background-color: #4d6bfe;
  color: #282c34;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
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