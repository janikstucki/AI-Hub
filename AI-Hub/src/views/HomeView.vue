<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
 <div class="chat-container">
        <div class="textarea-container">
            <textarea id="chat-input" rows="1" placeholder="Schreibe eine Nachricht..." oninput="autoResize(this)"></textarea>
            <button>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span></span>
</button>        </div>
    </div>
</template>



    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f3f4f6;
            margin: 0;
        }
         /* .chat-container {
            width: 100%;
            max-width: 1000px;
            background: white;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            height: 100px;
            
            position: fixed;
            bottom: 20px; 
            left: 50%;
            transform: translateX(-50%); 
        }  */
        .textarea-container {
            display: flex;
            align-items: center;
            width: 55%;position: fixed;
            bottom: 20px; 
            left: 50%;
            transform: translateX(-50%); 
        }
        textarea {
    width: 100%;
    min-width: 400px;
    max-height: 140px;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 24px;
    padding: 15px 20px; /* Größeres Padding für besseren Look */
    font-size: 18px; /* Größere Schrift */
    line-height: 1.8; /* Mehr Abstand für bessere Lesbarkeit */
    overflow-y: auto;
    outline: none;
    resize: none;
    transition: color, background-color, border-color, box-shadow 150ms ease-in-out;
    background-color: var(--token-main-surface-primary, white);
    box-shadow: 0 9px 9px rgba(0, 0, 0, 0.01), 0 2px 5px rgba(0, 0, 0, 0.06);
    height: 10000px;
}

        textarea:focus {
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04), 0 9px 9px rgba(0, 0, 0, 0.01), 0 2px 5px rgba(0, 0, 0, 0.06);
        }
        button {
            background: #10a37f;
            color: white;
            border: none;
            padding: 10px 15px;
            margin-left: 10px;
            border-radius: 6px;
            cursor: pointer;
        }

        button {
  font-family: inherit;
  font-size: 20px;
  background: #4f46e5;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

button:hover span {
  transform: translateX(5em);
}

button:active {
  transform: scale(0.95);
}
textarea {
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE/Edge */
}
textarea::-webkit-scrollbar {
  display: none;  /* Chrome/Safari */
}

#chat-input{
  font-family: Arial, Helvetica, sans-serif;
}
@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

    </style>