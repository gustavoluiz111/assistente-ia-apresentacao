const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");

let baseConhecimento = {};

// --- Carregar JSON do repositório ---
fetch("perguntas.json")
  .then(res => res.json())
  .then(data => { baseConhecimento = data; });

// --- Função para adicionar mensagens ---
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- Função para processar resposta da IA ---
function responder(pergunta) {
  const chave = pergunta.toLowerCase().trim();
  if (baseConhecimento[chave]) {
    return baseConhecimento[chave];
  } else {
    return "Desculpe, não entendi. Pode reformular?";
  }
}

// --- Envio de texto ---
sendBtn.addEventListener("click", () => {
  const texto = userInput.value.trim();
  if (texto) {
    addMessage(texto, "user");
    const resposta = responder(texto);
    setTimeout(() => addMessage(resposta, "bot"), 500);
    userInput.value = "";
  }
});

// --- Envio com Enter ---
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendBtn.click();
});

// --- Reconhecimento de voz ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";

  voiceBtn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    addMessage(texto, "user");
    const resposta = responder(texto);
    setTimeout(() => addMessage(resposta, "bot"), 500);
  };
}
