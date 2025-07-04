<!-- Code formatiert mit Prettier - Code formatter-->

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllChats, deleteChat, renameChat } from "@/api/routes/chatRoutes";
import { isLoggedIn, logout } from "@/api/routes/userRoutes";

const router = useRouter();
const chats = ref({
  chats: []});

  const loggedIn = ref(false);
const selectedChat = ref(0)

const emit = defineEmits(["SelectedChatChanged"])

function NewChat() {
  if (loggedIn.value) {
    router.push("/newchat");
  } else {
    router.push("/login");
  }
}

function EditChat(chat) {
  chat.isEditing = true;
}

async function SaveChatTitle(chat, event) {
  chat.ChatName = event.target.value;
  chat.isEditing = false;
  await renameChat(chat.ChatId, chat.ChatName)
}

async function DeleteChat(chatid) {
  await deleteChat(chatid);
  chats.value.chats = chats.value.chats.filter(chat => chatid !== chat.ChatId)
}

const HandleLogout = async () => {
  await logout();
  window.location.reload()
};

const Settings = () => {
  if (loggedIn.value) {
    router.push("/settings")
  } else {
    router.push("/login")
  }
}

const Changeselectedchat = (chatId) => {
  selectedChat.value = chatId
  emit("SelectedChatChanged", {chatId})
}

onMounted(async () => {
  const response = await isLoggedIn();
  if (response) {
    loggedIn.value = response.loggedin;

    if (response.loggedin) {
      chats.value = await getAllChats();
    }
  }
});
</script>

<template>
  <div class="main-container">
    <div class="sidebar">
			<div class="header">
				<h2>Chats</h2>
         <!-- chat-bubble-left-ellipsis icon von https://heroicons.com/-->

				<button class="icon-button" @click="NewChat()">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
						/>
					</svg>
				</button>
			</div>

			<nav class="chat-list">
				<div v-if="chats.chats.length === 0">
					<button
						href="#"
						class="chatlink-btn"
						key="no-chats"
						@click="NewChat()"
					>
						Keine Chats, starte eine neue Konversation.
					</button>
				</div>

				<div v-else>
          <div
            v-for="chat in chats.chats"
            :key="chat.ChatId">
            <div
              class="chatlink aktiver-chat"
              v-if="chat.ChatId === selectedChat"
              @click="Changeselectedchat(chat.ChatId)"
            >
              <div class="chat-row">
                <span v-if="!chat.isEditing" class="chat-title">
                {{ chat.ChatName }}
                </span>
                <input
                  v-else
                  v-model="chat.ChatName"
                  @keyup.enter="SaveChatTitle(chat, $event)"
                  class="chat-title-input"
                />
                <div class="chat-actions">
                  <!-- pencil-square Icon von https://heroicons.com/-->

                  <button class="icon-button" @click="EditChat(chat)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <!-- trash Icon von https://heroicons.com/-->
                  <button class="icon-button" @click="DeleteChat(chat.ChatId)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <span class="model">({{ chat.SelectedAI }})</span>
            </div>
            <div
              class="chatlink"
              @click="Changeselectedchat(chat.ChatId)"
              v-else
            >
              <div class="chat-row">
                <span v-if="!chat.isEditing" class="chat-title">
                {{ chat.ChatName }}
                </span>
                <input
                  v-else
                  v-model="chat.ChatName"
                  @keyup.enter="SaveChatTitle(chat, $event)"
                  class="chat-title-input"
                />
                <div class="chat-actions">
                  <!-- pencil-square Icon von https://heroicons.com/-->
                   <button class="icon-button" @click="EditChat(chat)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <!-- trash Icon von https://heroicons.com/-->
                  <button class="icon-button" @click="DeleteChat(chat.ChatId)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <span class="model">({{ chat.SelectedAI }})</span>
            </div>
          </div>
				</div>
			</nav>
			<nav class="menu">
				<a @click="Settings">Accesstokens</a>

				<button v-if="loggedIn" @click="HandleLogout" class="logout-btn">
					Logout
				</button>
				<router-link v-else to="/login" id="login-btn">Login</router-link>
			</nav>
		</div>

		<router-view />
  </div>
</template>

<style scoped>
.logout-btn {
  color: #4d6bfe;
  border-color: #4d6bfe;
  padding: 8px 12px;
  margin-top: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #ddd;
}

.sidebar {
  width: 100%;
  background-color: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
}

.menu a,
.menu .router-link-active,
.menu .router-link-exact-active {
  outline: none;
  border: none;
}

.content {
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

.chatlink {
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
}

.chatlink:hover {
  background-color: #ddd;
}

.chatlink .model {
  font-size: 0.8em;
  color: #666;
}

.chatlink-btn {
  color: #000;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.chatlink-btn:hover {
  background-color: #ddd;
}

.chatlink-btn .model {
  color: #666;
  font-size: 0.8em;
}
.menu {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu a {
  color: black;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  user-select: none;
  cursor: pointer;
}

.menu a:hover {
  background-color: #ddd;
}

nav {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  font-size: 12px;
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
  display: flex;
  padding: 0;
  color: #333;
  align-items: center;
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

.main-container {
  height: 100vh;
  width: 260px;
}

#login-btn {
  background-color: #4d6bfe;
  color: white;
}

#login-btn:hover {
  filter: brightness(90%)
}

.aktiver-chat {
  background-color: #4d6bfe;
}

.aktiver-chat * {
  color: white !important;
}

.aktiver-chat:hover {
  background-color: #3f58d1;
}

.aktiver-chat input {
  color: black  !important;
}
</style>
