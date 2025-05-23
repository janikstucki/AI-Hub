<script setup>
import { ref } from 'vue';

const chats = ref([
  {
    id: 1,
    title: 'Neuer Chat',
    model: 'Deepseek'
  },
  {
    id: 2,
    title: 'Zweiter Chat',
    model: 'ChatGPT'
  },
  {
    id: 3,
    title: 'dsfd Chat',
    model: 'ChatGPT'
  },
]);
</script>

<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Chats 💬</h2>

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

    
  </div>
</template>

<style>
.layout {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
}

.sidebar {
  width: 260px;
  background-color: white;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  margin-bottom: 15px;
  font-size: 1.2em;
}

.chat-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-link {
  color: white;
  text-decoration: none;
  background-color: #343541;
  padding: 10px;
  border-radius: 6px;
  transition: background 0.2s;
}

.chat-link:hover {
  background-color: #444654;
}

.chat-link .model {
  font-size: 0.8em;
  color: #aaa;
}

.menu {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu a {
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu a:hover {
  background-color: #343541;
}

.content {
  flex: 1;
  background-color: #f3f3f3;
  padding: 40px;
}
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
