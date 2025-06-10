<template>
  <div id="registercontainer">
          <button id="BackButton">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>

      </button>
    <div class="register-view">
      <h1>Registrieren</h1>

      <form @submit.prevent="handleregister">
        <div class="form-group">
          <label for="username">Benutzername</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Benutzername eingeben"
          />
        </div>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="E-Mail eingeben"
          />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Passwort eingeben"
          />
        </div>
        <button id="RegisterButton" type="submit">Registrieren</button>
        <button id="LoginButton" type="button" @click="RouteToLogin">Login</button>
      </form>

      <p v-if="errorMessage" style="color: red; margin-top: 1rem;">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green; margin-top: 1rem;">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");

const errorMessage = ref("");
const successMessage = ref("");

const handleregister = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      credentials: "include", // wichtig für Cookies/Session
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Fehler aus Backend anzeigen
      errorMessage.value = data.error || "Fehler bei der Registrierung";
      return;
    }

    successMessage.value = data.message || "Registrierung erfolgreich! Du wirst jetzt weitergeleitet...";
    
    // nach kurzer Pause weiterleiten (zB Login oder Home)
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    errorMessage.value = "Serverfehler, versuch's später nochmal";
    console.error(error);
  }
};

const RouteToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#registercontainer {
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

#RegisterButton {
  width: 100%;
  padding: 10px;
  background-color: #4d6bfe;
  color: #f0f0f0;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

#LoginButton {
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

.BackButton:hover {
  color: #2563eb;
}

</style>
