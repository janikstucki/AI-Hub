<!-- Code formatiert mit Prettier - Code formatter-->

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
    <!--arrow-uturn-left Icon von https://heroicons.com/-->
  <button class="back-btn" @click="router.push('/')">
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
</template>
<style scoped>
button {
  border-radius: 5px;
	color: inherit;
	transition: color 0.2s ease;
  margin: 10px;
	background: #4d6bfe;
	cursor: pointer;
	padding: 10px;
	border: none;
}

button:hover {
	filter: brightness(90%)
}

svg {
  stroke: white;
	width: 24px;
	height: 24px;
}
</style>