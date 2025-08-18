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
  .then(data => {
    // Converte array [{question, answer}] em objeto {question: answer}
    baseConhecimento = {};
    data.forEach(item => {
      if (item.question && item.answer) {
        baseConhecimento[item.question.toLowerCase()] = item.answer;
      }
    });
  });

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

// --- Função de resposta com "digitando..." ---
function respostaIAComDigitando(pergunta) {
  const digitando = document.createElement("div");
  digitando.classList.add("message", "bot");
  digitando.textContent = "digitando...";
  chatWindow.appendChild(digitando);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    const resposta = responder(pergunta);
    digitando.textContent = resposta;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 800 + Math.random() * 1200);
}

// --- Envio de texto ---
function enviarTexto() {
  const texto = userInput.value.trim();
  if (!texto) return;
  addMessage(texto, "user");
  userInput.value = "";
  respostaIAComDigitando(texto);
}

sendBtn.addEventListener("click", enviarTexto);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") enviarTexto();
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
    respostaIAComDigitando(texto);
  };
}
