<script setup>
import { ref, nextTick } from "vue";
import Sidebar from "../components/Sidebar.vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

const message = ref("");
const messages = ref([
	{ role: "assistant", content: "Hey! Wie kann ich dir helfen? 😄" },
	{ role: "user", content: "Kannst du mir was über Vue sagen?" },
	{
		role: "assistant",
		content: "Na klar! **Vue** ist ein _progressives_ JS-Framework ✨",
	},

	{
		role: "user",
		content: "# Titel\nDas ist ein Test mit Markdown.\n- Punkt 1\n- Punkt 2",
	},
	{
		role: "assistant",
		content: "# Titel\nDas ist ein Test mit Markdown.\n- Punkt 1\n- Punkt 2",
	},
	{
		role: "assistant",
		content: "> Dies ist ein Zitat.\n\nUnd ein [Link](https://vuejs.org)",
	},
	{ role: "user", content: "Ich bin *nicht sicher*, ob das funktioniert 🤔" },
	{ role: "assistant", content: "Kein Markdown hier, einfach nur Text." },
	{
		role: "user",
		content: '`console.log("Hello World")` zeigt etwas im Terminal an.',
	},
]);

const submitMessage = () => {
	if (message.value.trim() === "") return;
	messages.value.push({ role: "user", content: message.value });
	message.value = "";
	setTimeout(() => {
		messages.value.push({
			role: "assistant",
			content: "Das ist eine automatisch generierte Antwort 🤖",
		});
		scrollToBottom();
	}, 800);
	scrollToBottom();
};

const handleEnter = (e) => {
	if (e.shiftKey) return;
	e.preventDefault();
	submitMessage();
};

const scrollToBottom = () => {
	nextTick(() => {
		const container = document.querySelector(".chat-messages");
		if (container) container.scrollTop = container.scrollHeight;
	});
};

const renderAssistantMarkdown = (text) => {
	const dirty = marked.parse(text);
	return DOMPurify.sanitize(dirty);
};
</script>

<template>
	<div class="main-container">
		<Sidebar />
		<div class="chat-container">
      <div class="message-container">
        <div class="chat-messages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="[
              'chat-bubble',
              msg.role === 'user' ? 'bubble-user' : 'bubble-bot',
            ]"
          >
            <template v-if="msg.role === 'assistant'">
              <!-- Assistant mit Markdown gerendert -->
              <div v-html="renderAssistantMarkdown(msg.content)"></div>
            </template>
            <template v-else>
              <!-- User: reiner Text, kein Rendering -->
              <div>{{ msg.content }}</div>
            </template>
          </div>
        </div>
      </div>

			<div class="textarea-container">
        <div id="message-fade-gradient"></div>
				<div class="input-wrapper">
					<textarea
						id="chat-input"
						rows="3"
						placeholder="Schreibe eine Nachricht..."
						v-model="message"
						@keydown.enter="handleEnter"
					></textarea>

					<button
						class="_7436101"
						@click="submitMessage"
						:disabled="message.length === 0"
					>
						<div class="_6f28693">
							<div
								class="ds-icon"
								style="font-size: 16px; width: 16px; height: 16px"
							>
								<!-- Arrow Icon -->
								<svg width="14" height="16" viewBox="0 0 14 16" fill="none">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z"
										fill="currentColor"
									></path>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z"
										fill="currentColor"
									></path>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z"
										fill="currentColor"
									></path>
								</svg>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.chat-bubble h1,
.chat-bubble h2,
.chat-bubble h3,
.chat-bubble h4,
.chat-bubble h5,
.chat-bubble h6 {
	margin: 8px 0;
	font-weight: bold;
	color: #2c3e50;
}

.chat-bubble ul {
	margin-left: 20px;
	padding-left: 0;
	list-style-type: disc;
}

.chat-bubble li {
	margin-bottom: 6px;
}

.chat-bubble strong,
.chat-bubble b {
	font-weight: 700;
}

.chat-bubble em,
.chat-bubble i {
	font-style: italic;
}

.chat-bubble a {
	color: #4d6bfe;
	text-decoration: underline;
	cursor: pointer;
}

.chat-bubble code {
	font-family: "Courier New", Courier, monospace;
	background-color: #f5f5f5;
	padding: 2px 6px;
	border-radius: 4px;
}

.chat-bubble pre {
	background-color: #272822;
	color: #f8f8f2;
	padding: 10px;
	border-radius: 6px;
	overflow-x: auto;
	font-family: "Courier New", Courier, monospace;
	font-size: 14px;
	line-height: 1.5;
}

.chat-messages {
	overflow-y: auto;
	display: flex;
	flex-direction: column;
  height: 100%;
	gap: 20px;
  padding: 20px;
  padding-bottom: 25px;
}

.message-container {
  height: 80vh;
}

.chat-bubble {
	max-width: 75%;
	padding: 12px 18px;
	border-radius: 18px;
	font-size: 16px;
	line-height: 1.4;
	word-wrap: break-word;
	white-space: pre-wrap;
}

.bubble-user {
	align-self: flex-end;
	background-color: #4d6bfe;
	color: white;
	border-bottom-right-radius: 4px;
}

.bubble-bot {
	align-self: flex-start;
	background-color: #f1f1f1;
	color: #333;
	border-bottom-left-radius: 4px;
}

body {
  background-color: white;
}

.textarea-container {
	display: flex;
  justify-content: center;
  height: 20vh;
  flex-direction: column;
  align-items: center;
}

textarea {
	width: 100%;
	min-width: 400px;
	max-height: 140px;
	height: 100%;
	border: none;
	font-size: 18px;
	line-height: 1;
	overflow-y: auto;
	outline: none;
	resize: none;
  background-color: white;
	height: auto;
  scrollbar-width: none;
	-ms-overflow-style: none;
}

.input-wrapper {
  width: 80%;
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0 9px 9px rgba(0, 0, 0, 0.01), 0 2px 5px rgba(0, 0, 0, 0.06);
  transition: color, background-color, border-color,
	  box-shadow 150ms ease-in-out;
  align-items: end;
}

.input-wrapper:focus {
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04), 0 9px 9px rgba(0, 0, 0, 0.01),
		0 2px 5px rgba(0, 0, 0, 0.06);
}

button span {
	display: block;
	margin-left: 0.3em;
	transition: all 0.3s ease-in-out;
}

button svg {
	display: block;
	transform-origin: center center;
	transition: transform 0.3s ease-in-out;
}

textarea::-webkit-scrollbar {
	display: none;
}

#chat-input {
	font-family: Arial, Helvetica, sans-serif;
}

@keyframes fly-1 {
	from {
		transform: translateY(0.1em);
	}

	to {
		transform: translateY(-0.1em);
	}
}


textarea {
	width: 100%;
}

._7436101 {
	color: #fff;
	background: #4d6bfe;
	border: none;
	border-radius: 50%;
	width: 32px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

._7436101:disabled {
	background-color: #ccc;
	cursor: not-allowed;
	opacity: 0.6;
}

._7436101 svg {
	width: 16px;
	height: 16px;
}

._7436101:hover {
	background-color: #2563eb;
}

.main-container {
  display: flex;
  justify-content: start;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
}

.chat-container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

#message-fade-gradient {
  height: 40px; /* adjust height as needed */
  width: 100%;  /* or whatever width you need */
  background: linear-gradient(to bottom, transparent, white 80%);
}
</style>
