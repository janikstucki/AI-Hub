<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'

defineProps({
  msg: String,
})
const message = ref('')

const count = ref(0)



    function submitMessage() {
      console.log('message:', message.value);
      message.value = '';
    };


    function handleEnter(e) {
  if (e.shiftKey) {
    return;
  }

  e.preventDefault(); 
  submitMessage();
}


</script>

<template>
  <Sidebar />


  <div class="chat-container">
    <div class="textarea-container">
      <div class="input-wrapper">
<textarea
  id="chat-input"
  rows="1"
  placeholder="Schreibe eine Nachricht..."
  oninput="autoResize(this)"
  v-model="message"
  @keyup.enter="handleEnter" 
></textarea>


        <button class="_7436101" @click="submitMessage" :disabled="message.length === 0">
          <div class="_6f28693">
            <div
              class="ds-icon"
              style="font-size: 16px; width: 16px; height: 16px;"
            >
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </button>

      </div>
    </div>
  </div>
</template>




    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: white;
            margin: 0;
        }
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
    padding: 15px 20px; 
    font-size: 18px; 
    line-height: 1;
    overflow-y: auto;
    outline: none;
    resize: none;
    transition: color, background-color, border-color, box-shadow 150ms ease-in-out;
    background-color: var(--token-main-surface-primary, white);
    box-shadow: 0 9px 9px rgba(0, 0, 0, 0.01), 0 2px 5px rgba(0, 0, 0, 0.06);
    height: auto;
}

        textarea:focus {
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04), 0 9px 9px rgba(0, 0, 0, 0.01), 0 2px 5px rgba(0, 0, 0, 0.06);
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


.input-wrapper {
  position: relative;
  width: 100%;
}

textarea {
  width: 100%;
  padding-right: 50px; /* Platz für den Button */
}

._7436101 {
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #fff;
  background: #4d6bfe;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
}

._7436101:disabled {
  background-color: #ccc;   
  cursor: not-allowed;
  opacity: 0.6;
}



._7436101 svg {
  width: 16px;
  height: 16px;
}


._7436101:hover {
  background-color: #2563eb;
}


    </style>