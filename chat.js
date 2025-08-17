const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");

let baseConhecimento = {};
let sinonimos = {
  "oi": ["olá", "opa", "e aí", "salve"],
  "tchau": ["falou", "até mais", "até logo"],
  "qual é o seu nome": ["seu nome", "quem é você", "quem é vc"],
  "eco": ["ecorobos", "eco robôs", "eco-robôs"]
};

// --- Carregar JSON ---
fetch("perguntas.json")
  .then(res => res.json())
  .then(data => { baseConhecimento = data; });

// --- Adiciona mensagem na tela ---
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- Função de resposta ---
function responder(pergunta) {
  const chave = pergunta.toLowerCase().trim();

  // 1. Busca exata
  if (baseConhecimento[chave]) {
    return baseConhecimento[chave];
  }

  // 2. Busca por sinônimos
  for (let original in sinonimos) {
    if (sinonimos[original].some(p => chave.includes(p))) {
      return baseConhecimento[original] || "Certo, mas não encontrei resposta.";
    }
  }

  // 3. Busca por palavra dentro da frase
  for (let key in baseConhecimento) {
    if (chave.includes(key)) {
      return baseConhecimento[key];
    }
  }

  return "Desculpe, não entendi. Pode reformular?";
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

// --- Enter também envia ---
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
