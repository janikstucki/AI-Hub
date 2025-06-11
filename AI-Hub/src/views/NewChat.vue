<script setup>
import { ref } from "vue";
import router from "@/router";

const nwName = ref("");
const nwModel = ref("");

function handleCreateChat() {
	if (!nwName.value.trim() || !nwModel.value.trim()) {
		alert("Bitte Chat-Name und Model ausfüllen!");
		return;
	}
	console.log("Neuer Chat erstellt:", nwName.value, nwModel.value);

	router.push("/");
}

function NewChat() {}
</script>

<template>
	<div id="nwcontainer">
		<button class="back-button" @click="router.push('/')">
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
					d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
				/>
			</svg>
		</button>
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
					<label for="chatName">Chat-Model</label>
					<input
						type="text"
						id="chatModel"
						v-model="nwModel"
						required
						placeholder="URL"
					/>
				</div>
				<button id="nwButton" type="submit" @click="NewChat">
					Chat erstellen
				</button>
				<button id="Button" type="button" @click="router.push('/')">
					Zurück
				</button>
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

.back-button {
	background: none;
	border: none;
	cursor: pointer;
	padding: 6px;
	border-radius: 6px;
	color: inherit;
	transition: color 0.2s ease;
	position: fixed;
	top: 35%;
	left: 40%;
}

.back-button:hover svg {
	stroke: #4d6bfe;
}

.back-button svg {
	width: 24px;
	height: 24px;
}

input {
	width: 100%;
	padding: 10px;
	font-size: 1rem;
	border: 1px solid #ccc;
	color: rgb(0, 0, 0);
	border-radius: 4px;
	box-sizing: border-box;
	transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
	border-color: #4d6bfe;
	box-shadow: 0 0 0 3px #4d6bfe;
	outline: none;
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
	color: #f0f0f0;
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
