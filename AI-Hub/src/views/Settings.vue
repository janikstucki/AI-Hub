<!-- Code formatiert mit Prettier - Code formatter-->

<script setup>
import { onMounted, ref } from "vue";
import BackButton from "@/components/BackButton.vue";
import { getAccesstokens, addAccesstokens, deleteAccesstoken } from "@/api/routes/accesstokenRoutes";

const Showmodal = ref(false);
const newAccesstoken = ref("");

const tokens = ref({accesstokens: []});

async function SaveToken() {
	await addAccesstokens([newAccesstoken.value])
	window.location.reload()
}

async function DeleteToken(tokenid) {
	await deleteAccesstoken(tokenid)
	tokens.value.accesstokens = tokens.value.accesstokens.filter(token => token.AccessTokenId !== tokenid)
}

onMounted(async () => {
	tokens.value = await getAccesstokens()
})
</script>
<template>
	<BackButton/>
	<div id="nwcontainer">
		<div class="nwview">
			<h1>Accesstoken-Verwaltung</h1>

			<div v-if="tokens.accesstokens.length === 0">
				<p>Noch kein Accesstoken vorhanden.</p>
			</div>

			<div class="token-list" v-else>
				<div
					v-for="token in tokens.accesstokens"
					:key="token.AccessTokenId"
					class="chat-link"
				>
					<div class="chat-row">
						<span>{{ token.TokenValue }}</span>
						<div class="chat-actions">
							<!-- trash Button von https://heroicons.com/-->
							<button class="icon-button" @click="DeleteToken(token.AccessTokenId)">
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
				</div>
			</div>

			<button id="nwButton" @click="Showmodal = true">
				Accesstoken hinzufügen
			</button>

			<div
				v-if="Showmodal"
				class="modal-overlay"
				@click.self="Showmodal = false"
			>
				<div class="modal">
					<form @submit.prevent="SaveToken">
						<input type="text" id="Accesstoken" v-model="newAccesstoken" />
						<button id="nwButton" type="submit">Hinzufügen</button>
						<button id="CancelButton" type="button" @click="Showmodal = false">
							Abbrechen
						</button>
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

#nwcontainer {
	display: flex;
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

.edit-field {
	position: relative;
	display: flex;
	align-items: center;
}

.edit-field input,
.edit-field span {
	flex: 1;
	padding-right: 36px;
}

.edit-field .icon-button {
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

#CancelButton {
	width: 100%;
	padding: 10px;
	color: #4d6bfe;
	font-size: 1rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 10px;
	background-color: white;
}

button:hover {
	filter: brightness(90%);
}

input:focus {
	border-color: #4d6bfe;
	box-shadow: 0 0 0 3px #4d6bfe;
}

.token-list {
	overflow-y: auto;
	max-height: 200px;
}
</style>
