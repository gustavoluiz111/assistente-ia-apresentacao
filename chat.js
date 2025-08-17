// chat.js

// Banco de perguntas/respostas inicial (exemplo)
const respostas = {
  "oi": "Olá! Eu sou o Jarvis. Como posso ajudar?",
  "quem é você": "Sou o Jarvis, seu assistente de inteligência artificial.",
  "qual seu objetivo": "Meu objetivo é auxiliar você nas apresentações e projetos.",
  "obrigado": "Sempre à disposição!",
  "tchau": "Até logo! 👋"
};

// Elementos da página
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");

// Adicionar mensagem no chat
function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Responder usuário
function responder(pergunta) {
  pergunta = pergunta.toLowerCase();
  let resposta = respostas[pergunta] || "Desculpe, não entendi. Pode reformular?";
  
  addMessage(resposta, "bot");
  falar(resposta);
}

// Enviar texto digitado
sendBtn.addEventListener("click", () => {
  const texto = userInput.value.trim();
  if (texto) {
    addMessage(texto, "user");
    responder(texto);
    userInput.value = "";
  }
});

// Enter para enviar
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// Reconhecimento de voz
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (recognition) {
  const rec = new recognition();
  rec.lang = "pt-BR";

  voiceBtn.addEventListener("click", () => {
    rec.start();
  });

  rec.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    addMessage(texto, "user");
    responder(texto);
  };
} else {
  voiceBtn.style.display = "none";
}

// Síntese de voz (voz do Jarvis)
function falar(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR";
  utterance.rate = 1.1; 
  utterance.pitch = 1; 
  speechSynthesis.speak(utterance);
}
