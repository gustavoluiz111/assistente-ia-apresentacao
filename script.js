function responderIA() {
  const pergunta = document.getElementById("pergunta").value.toLowerCase();
  const respostaDiv = document.getElementById("resposta");

  let resposta = "Desculpe, não entendi sua pergunta.";

  if (pergunta.includes("objetivo") || pergunta.includes("projeto")) {
    resposta = "Nosso objetivo é criar uma IA que ajude em apresentações, tornando-as mais interativas.";
  } else if (pergunta.includes("quem fez") || pergunta.includes("participantes")) {
    resposta = "O projeto foi desenvolvido por Nome 1, Nome 2 e Nome 3.";
  } else if (pergunta.includes("professor")) {
    resposta = "O professor orientador é Nome do Professor.";
  }

  respostaDiv.textContent = resposta;

  // Resposta por voz (Web Speech API)
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(resposta);
  utter.lang = "pt-BR";
  synth.speak(utter);
}
