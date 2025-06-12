<!-- Code formatiert mit Prettier - Code formatter-->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/routes/userRoutes";
import BackButton from "@/components/BackButton.vue";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
	const response = await login(email.value, password.value);

	if (!response.success) {
		console.log("Login fehlgeschlagen:", response.error);
		return;
	}

	router.push("/");
};

const RouteToRegister = () => {
	router.push("/register");
};
</script>

<template>
  <BackButton/>
	<div id="logincontainer">
		<div class="login-view">
			<h1>Login</h1>
			<form @submit.prevent="handleLogin">
				<div class="form">
					<label for="email">E-Mail</label>
					<input
						type="email"
						id="email"
						v-model="email"
						required
						placeholder="Deine E-Mail"
					/>
				</div>
				<div class="form">
					<label for="password">Passwort</label>
					<input
						type="password"
						id="password"
						v-model="password"
						required
						placeholder="Dein Passwort"
					/>
				</div>
				<button id="login-btn" type="submit">Login</button>
				<button id="registrierenbtn" type="button" @click="RouteToRegister">
					Registrieren
				</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
#logincontainer {
	display: flex;
  margin-top: 15vh;
	justify-content: center;
}

.login-view {
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

#login-btn {
	width: 100%;
	padding: 10px;
	background-color: #4d6bfe;
	color: white;
	font-size: 1rem;
	border-radius: 4px;
	cursor: pointer;
	border: none;
}

#registrierenbtn {
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

#BackButton {
	position: absolute;
	top: 20px;
	left: 20px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
}

button:hover {
	filter: brightness(90%);
}

input:focus {
	border-color: #4d6bfe;
	box-shadow: 0 0 0 3px #4d6bfe;
}
</style>
