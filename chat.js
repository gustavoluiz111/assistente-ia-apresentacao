// chat.js

document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input-text");
  const inputVoice = document.getElementById("input-voice");
  const inputFiles = document.getElementById("input-files");

  const btnSend = document.querySelector(".label-text");
  const btnVoice = document.querySelector(".label-voice");
  const btnFiles = document.querySelector(".label-files");

  const containerChat = document.querySelector(".container-ia-chat");

  // ===== Criar janela de chat se não existir =====
  let chatWindow = document.querySelector(".chat-window");
  if (!chatWindow) {
    chatWindow = document.createElement("div");
    chatWindow.classList.add("chat-window");
    containerChat.parentNode.insertBefore(chatWindow, containerChat);
  }

  // ===== Função para adicionar mensagens =====
  function addMessage(content, sender = "user") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = content;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // ===== Função do bot (simulação) =====
  function botResponse(userMessage) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("🤖 Resposta da IA: " + userMessage);
      }, 1000);
    });
  }

  // ===== Enviar mensagem =====
  async function sendMessage() {
    const text = inputText.value.trim();
    if (!text) return;
    addMessage(text, "user");
    inputText.value = "";
    const response = await botResponse(text);
    addMessage(response, "bot");
  }

  // ===== Eventos =====
  // Enviar pelo botão
  btnSend.addEventListener("click", sendMessage);

  // Enviar pelo Enter
  inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // ===== Upload de arquivos =====
  inputFiles.addEventListener("change", () => {
    if (inputFiles.files.length > 0) {
      [...inputFiles.files].forEach((file) => {
        addMessage("📎 Arquivo anexado: " + file.name, "user");
      });
    }
  });

  btnFiles.addEventListener("click", () => {
    inputFiles.click(); // abre seletor de arquivos
  });

  // ===== Reconhecimento de voz =====
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    btnVoice.addEventListener("click", () => {
      if (!inputVoice.checked) {
        inputVoice.checked = true;
        recognition.start();
      } else {
        inputVoice.checked = false;
        recognition.stop();
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputText.value = transcript;
      sendMessage(); // envia automaticamente
      inputVoice.checked = false;
    };

    recognition.onend = () => {
      inputVoice.checked = false;
    };
  } else {
    console.warn("Navegador não suporta Web Speech API");
  }
});
