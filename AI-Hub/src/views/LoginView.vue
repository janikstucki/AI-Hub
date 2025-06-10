<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/routes/userRoutes";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  const response = await login(email.value, password.value)

  if (!response.success) {
    console.log("Login fehlgeschlagen:", response.error);
    return;
  }

  router.push("/");
};


const RouteToRegister = () => {
  router.push("/register");
};

const RouteToHome = () => {
  router.push("/");
};
</script>

<template>
  <div id="logincontainer">
    <button class="back-button" @click="router.push('/')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>

    </button>
    <div class="login-view">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Deine E-Mail"
          />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Dein Passwort"
          />
        </div>
        <button id="LoginButton" type="submit">Login</button>
        <button id="Button" type="button" @click="RouteToRegister">Registrieren</button>
        <!-- <button id="Button" type="button" @click="RouteToHome">Zurück</button> -->
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

.back-button{

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

#logincontainer {
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

#LoginButton {
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

#BackButton {
  position: absolute;
  top: 20px; 
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

#BackButton:hover {
  color: #2563eb;
}
</style>
