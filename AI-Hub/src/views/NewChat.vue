<!-- Code formatiert mit Prettier - Code formatter-->

<script setup>
import { ref } from "vue";
import router from "@/router";
import BackButton from "@/components/BackButton.vue";
import { addChat } from "@/api/routes/chatRoutes";

const nwName = ref("");
const nwModel = ref("");

async function handleCreateChat() {
	if (!nwName.value.trim() || !nwModel.value.trim()) {
		alert("Bitte Chat-Name und Model ausfüllen!");
		return;
	}
	await addChat(nwName.value, nwModel.value)

	router.push("/");
}
</script>

<template>
	<BackButton/>
	<div id="nwcontainer">
		<div class="nwview">
			<h1>Neuer Chat</h1>
			<form @submit.prevent="handleCreateChat">
				<div class="form">
					<label for="chatName">Chat-Name</label>
					<input
						type="text"
						v-model="nwName"
						required
						placeholder="Name" />
				</div>
				<div class="form">
					<label for="chatName">Chat-Model</label>
					<input
						type="text"
						v-model="nwModel"
						required
						placeholder="Huggingface Repo" />
				</div>
				<button id="nwButton" type="submit" @click="NewChat">
					Chat erstellen
				</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
input:focus {
	border-color: #4d6bfe;
	box-shadow: 0 0 0 3px #4d6bfe;
}

#nwcontainer {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	margin-top: 15vh;
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

.form {
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
	border: 2px solid #ddd;
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

button:hover {
	filter: brightness(90%)
}
</style>
