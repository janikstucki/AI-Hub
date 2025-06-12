<!-- Code formatiert mit Prettier - Code formatter-->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/routes/userRoutes.js";
import BackButton from "@/components/BackButton.vue";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const handleregister = async () => {
	errorMessage.value = "";
	successMessage.value = "";

	const response = await register(username.value, email.value, password.value);

	if (!response.success) {
		errorMessage.value = response.error || "Fehler bei der Registrierung";
		return;
	}

	successMessage.value =
		response.message ||
		"Registrierung erfolgreich! Du wirst jetzt weitergeleitet...";

	router.push("/");
};

const RouteToLogin = () => {
	router.push("/login");
};
</script>
<template>
	<BackButton/>
	<div id="registercontainer">
		<div class="register-view">
			<h1>Registrieren</h1>

			<form @submit.prevent="handleregister">
				<div class="form">
					<label for="username">Benutzername</label>
					<input
						type="text"
						id="username"
						v-model="username"
						required
						placeholder="Benutzername eingeben"
					/>
				</div>
				<div class="form">
					<label for="email">E-Mail</label>
					<input
						type="email"
						id="email"
						v-model="email"
						required
						placeholder="E-Mail eingeben"
					/>
				</div>
				<div class="form">
					<label for="password">Passwort</label>
					<input
						type="password"
						id="password"
						v-model="password"
						required
						placeholder="Passwort eingeben"
					/>
				</div>
				<button id="register-btn" type="submit">Registrieren</button>
				<button id="login-btn" type="button" @click="RouteToLogin"> <!--router.push('/login') direkt funktioniert irgendwie nicht-->
					Login
				</button>
			</form>

			<p v-if="errorMessage" style="color: red; margin-top: 1rem">
				{{ errorMessage }}
			</p>
			<p v-if="successMessage" style="color: green; margin-top: 1rem">
				{{ successMessage }}
			</p>
		</div>
	</div>
</template>

<style scoped>
#registercontainer {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	margin-top: 15vh;
}

.register-view {
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

#register-btn {
	width: 100%;
	padding: 10px;
	background-color: #4d6bfe;
	color: white;
	font-size: 1rem;
	border-radius: 4px;
	cursor: pointer;
	border: none;
}

#login-btn {
	width: 100%;
	padding: 10px;
	color: #4d6bfe;
	font-size: 1rem;
	border: 2px solid #4d6bfe;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 10px;
	background-color: white;
}

button:hover {
	filter: brightness(90%)
}

input:focus {
	border-color: #4d6bfe;
	box-shadow: 0 0 0 3px #4d6bfe;
}
</style>
