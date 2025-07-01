function responderIA() {
  const pergunta = document.getElementById("pergunta").value.toLowerCase();
  const respostaDiv = document.getElementById("resposta");

  let resposta = "Desculpe, não entendi sua pergunta.";

  if (pergunta.includes("objetivo") || pergunta.includes("projeto")) {
    resposta = "Nosso objetivo é criar uma IA que ajude em apresentações.";
  } else if (pergunta.includes("quem fez") || pergunta.includes("participantes")) {
    resposta = "O projeto foi desenvolvido por Nome 1, Nome 2 e Nome 3.";
  } else if (pergunta.includes("professor")) {
    resposta = "O professor orientador é Nome do Professor.";
  }

  respostaDiv.textContent = resposta;

  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(resposta);
  utter.lang = "pt-BR";
  synth.speak(utter);
}

// 🌙 Alternar entre tema claro e escuro
function alternarTema() {
  document.body.classList.toggle("light");
  localStorage.setItem("tema", document.body.classList.contains("light") ? "claro" : "escuro");
}

// Carrega o tema salvo
window.onload = function () {
  if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("light");
  }
};

// 🎙️ Reconhecimento de voz (fala do usuário para texto)
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
      const textoFalado = event.results[0][0].transcript;
      document.getElementById("pergunta").value = textoFalado;
      responderIA();
    };

    recognition.onerror = function (event) {
      alert("Erro no reconhecimento de voz: " + event.error);
    };

    recognition.start();
  };
}
