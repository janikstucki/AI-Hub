<script setup>
import { ref } from 'vue';

const chats = ref([
  { id: 1, title: 'Neuer Chat', model: 'Deepseek' },
  { id: 2, title: 'Zweiter Chat', model: 'ChatGPT' },
]);

</script>

<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Chats</h2>

      <nav class="chat-list">
        <a
          v-for="chat in chats.sort((a, b) => a.id - b.id)"
          :key="chat.id"
          href="#"
          class="chat-link"
        >
          {{ chat.title }} <span class="model">({{ chat.model }})</span>
        </a>
      </nav>

      <hr />

      <nav class="menu">
        <a href="#">Home</a>
        <a href="#">Einstellungen</a>
        <a href="#">Logout</a>
      </nav>
    </aside>

    <Routerlink/>

  </div>
</template>

<style>
/* Global Layout */
.layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
  background-color: #fff; 
  color: #000;
  overflow: hidden;
}

/* Sidebar links */
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
  background-color: #eaeaea;
  padding: 10px;
  border-radius: 6px;
  transition: background 0.2s;
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
</style>
