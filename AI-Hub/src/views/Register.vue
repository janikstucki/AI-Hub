<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const handleregister = () => {
  console.log("Username:", username.value);
  console.log("Email:", email.value);
  console.log("Password:", password.value);
};

const RouteToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div id="registercontainer">
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
        <button id="RegisterButton" type="submit">
          Registrieren
        </button>
        <button id="LoginButton" type="button" @click="RouteToLogin">
          Zurück zum Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#registercontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-view {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
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
  color: #282c34;
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
</style>
