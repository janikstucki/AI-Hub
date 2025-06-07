<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const router = useRouter();

const RouteToRegister = () => {
  router.push("/register");
};

const handleLogin = async () => {
  try {
    console.log("Login mit:", email.value, password.value);
  } catch (error) {
    console.log("Fehler beim Login:", error);
  }
};
</script>

<template>
  <div class="page-wrapper">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Deine E-Mail"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Dein Passwort"
            v-model="password"
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" @click="RouteToRegister">Registrieren</button>
        <button type="button" @click="$router.push('/')">Zurück</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}


.login-box {
  max-width: 400px;
  width: 100%;
  background: white;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  background-color: #4d6bfe;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
