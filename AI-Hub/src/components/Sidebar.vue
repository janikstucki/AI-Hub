<script setup>
import { ref } from 'vue';

const chats = ref([
  { id: 1, title: 'New Chat', model: 'Deepseek' },
  { id: 2, title: 'Second Chat', model: 'ChatGPT' },
]);
</script>

<template>
  <div class="layout">
   <aside class="sidebar">
  <div class="header">
    <h2>Chats</h2>
    <button class="icon-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    </button>
  </div>



      <nav class="chat-list">
        <div v-if="chats.length === 0">
          <a
            href="#"
            class="chat-link"
            key="no-chats"
          >
            No chats yet, start a new conversation.
          </a>
        </div> 

        <div v-else>
          <a
            v-for="chat in chats.sort((a, b) => a.id - b.id)"
            :key="chat.id"
            href="#"
            class="chat-link"
          >
            {{ chat.title }} <span class="model">({{ chat.model }})</span>
          </a>
        </div>
      </nav>

      <hr />

      <nav class="menu">
        <a href="#">Home</a>
        <a href="#">Settings</a>
        <a href="#">Logout</a>
      </nav>
    </aside>

    <RouterLink />
  </div>
</template>

<style>
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

</style>
