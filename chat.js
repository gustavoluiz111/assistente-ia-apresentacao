// chat.js

document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input-text");
  const labelText = document.querySelector(".label-text");
  const containerChat = document.querySelector(".container-ia-chat");

  // Criar área de mensagens (se não existir)
  let chatWindow = document.querySelector(".chat-window");
  if (!chatWindow) {
    chatWindow = document.createElement("div");
    chatWindow.classList.add("chat-window");
    containerChat.parentNode.insertBefore(chatWindow, containerChat);
  }

  // Função para adicionar mensagens no chat
  function addMessage(content, sender = "user") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = content;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight; // sempre rola pro fim
  }

  // Simulação de resposta da IA
  function botResponse(userMessage) {
    // Aqui você poderia chamar sua API (ex.: OpenAI)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("🤖 Resposta da IA para: " + userMessage);
      }, 1000);
    });
  }

  // Enviar mensagem ao apertar botão ou Enter
  async function sendMessage() {
    const text = inputText.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    inputText.value = "";

    const response = await botResponse(text);
    addMessage(response, "bot");
  }

  // Clique no botão de enviar
  labelText.addEventListener("click", sendMessage);

  // Pressionar Enter também envia
  inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // ====== Função de voz (simples usando Web Speech API) ======
  const inputVoice = document.getElementById("input-voice");
  const labelVoice = document.querySelector(".label-voice");

  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    labelVoice.addEventListener("click", () => {
      if (inputVoice.checked) {
        recognition.start();
      } else {
        recognition.stop();
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputText.value = transcript;
    };
  }

  // ====== Upload de arquivos (só exibe nome por enquanto) ======
  const inputFiles = document.getElementById("input-files");

  inputFiles.addEventListener("change", () => {
    if (inputFiles.files.length > 0) {
      [...inputFiles.files].forEach((file) => {
        addMessage("📎 Arquivo anexado: " + file.name, "user");
      });
    }
  });
});
