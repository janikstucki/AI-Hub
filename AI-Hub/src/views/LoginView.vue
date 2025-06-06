<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

// Reactive Variablen fürs Formular
const email = ref("");
const password = ref("");

const router = useRouter();

const RouteToRegister = () => {
  router.push("/register");
};

const handleLogin = async () => {
  try {
    // hier kommt dein echter Login-Code rein
    console.log("Login mit:", email.value, password.value);
    // await login(email.value, password.value)
  } catch (error) {
    console.log("Error while logging in:", error);
  }
};
</script>

<template>
  <div id="logincontainer">
    <div class="login-view">
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
        <button id="LoginButton" type="submit">Login</button>
        <button id="RegisterButton" @click="RouteToRegister">
          Registrieren
        </button>
        <button id="backbutton" @click="$router.push('/')">Zurück</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  width: 400px;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
  padding: 20px;
  border-radius: 8px;
  margin-top: 50px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
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
  border-radius: 4px;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
}

#LoginButton {
  width: 100%;
  padding: 10px;
  color: #4d6bfe;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#RegisterButton {
  width: 100%;
  padding: 10px;
  background-color: #4d6bfe;
  color: #282c34;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

#backbutton {

    width: 50%;
  padding: 10px;
  background-color: #4d6bfe;
  color: #282c34;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
y