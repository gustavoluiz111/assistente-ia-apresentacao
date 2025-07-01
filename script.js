function responderIA() {
  const pergunta = document.getElementById("pergunta").value.toLowerCase();
  const respostaDiv = document.getElementById("resposta");

  let resposta = "Desculpe, não entendi sua pergunta.";

  // Respostas personalizadas
  if (pergunta.includes("objetivo")) {
    resposta = "O objetivo do projeto é automatizar apresentações com uma I.A. que interage com o público.";
  } else if (pergunta.includes("quem fez") || pergunta.includes("participantes")) {
    resposta = "O projeto foi desenvolvido por Luiz Gustavo.";
  } else if (pergunta.includes("professor")) {
    resposta = "O professor orientador é Nome do Professor.";
  } else if (pergunta.includes("como funciona") || pergunta.includes("ia")) {
    resposta = "A I.A. escuta perguntas e responde com base em comandos programados. Em breve, será conectada com servidores reais.";
  }

  respostaDiv.textContent = resposta;

  // Fala a resposta
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(resposta);
  utter.lang = "pt-BR";
  synth.speak(utter);
}

// Alternar tema claro/escuro
function alternarTema() {
  document.body.classList.toggle("light");
  localStorage.setItem("tema", document.body.classList.contains("light") ? "claro" : "escuro");
}

// Carrega tema salvo
window.onload = function () {
  if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("light");
  }
};

// Reconhecimento de voz
if ("webkitSpeechRecognition" in window) {
  const micBtn = document.createElement("button");
  micBtn.textContent = "🎤 Falar";
  micBtn.style.marginLeft = "10px";
  document.querySelector("button").after(micBtn);

  micBtn.onclick = () => {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      const texto = event.results[0][0].transcript;
      document.getElementById("pergunta").value = texto;
      responderIA();
    };

    recognition.onerror = function (event) {
      alert("Erro no reconhecimento de voz: " + event.error);
    };

    recognition.start();
  };
}
