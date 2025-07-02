function alternarTema() {
  document.body.classList.toggle("dark-mode");
}

let reconhecimento;

function iniciarVoz() {
  const suporte = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!suporte) {
    alert("Reconhecimento de voz não suportado neste navegador.");
    return;
  }

  reconhecimento = new suporte();
  reconhecimento.lang = "pt-BR";
  reconhecimento.continuous = false;
  reconhecimento.interimResults = false;

  reconhecimento.onstart = () => {
    document.getElementById("resposta").textContent = "Estou ouvindo...";
  };

  reconhecimento.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    document.getElementById("pergunta").value = texto;
    responderIA();
  };

  reconhecimento.onerror = () => {
    document.getElementById("resposta").textContent = "Erro no reconhecimento de voz.";
  };

  reconhecimento.start();
}

function responderIA() {
  const pergunta = document.getElementById("pergunta").value.toLowerCase();
  const respostaDiv = document.getElementById("resposta");

  let resposta = "Desculpe, não entendi sua pergunta. Pode reformular?";

  if (
    pergunta.includes("objetivo") ||
    pergunta.includes("finalidade") ||
    pergunta.includes("meta") ||
    pergunta.includes("propósito") ||
    pergunta.includes("para que serve") ||
    pergunta.includes("qual é a ideia") ||
    pergunta.includes("qual a ideia") ||
    pergunta.includes("o que é")
  ) {
    resposta = "O objetivo do projeto é criar uma inteligência artificial que automatize apresentações escolares, permitindo interação em tempo real com o público.";
  } else if (
    pergunta.includes("quem fez") ||
    pergunta.includes("participantes") ||
    pergunta.includes("quem criou") ||
    pergunta.includes("autores") ||
    pergunta.includes("quem desenvolveu")
  ) {
    resposta = "O projeto foi desenvolvido pelos estudantes Nome 1, Nome 2 e Nome 3.";
  } else if (
    pergunta.includes("professor") ||
    pergunta.includes("orientador") ||
    pergunta.includes("quem orientou")
  ) {
    resposta = "O professor orientador do projeto é o Prof. Nome do Professor.";
  } else if (
    pergunta.includes("como funciona") ||
    pergunta.includes("ia") ||
    pergunta.includes("inteligência artificial") ||
    pergunta.includes("funciona") ||
    pergunta.includes("qual o funcionamento")
  ) {
    resposta = "A IA funciona reconhecendo perguntas feitas por voz ou texto e respondendo de forma automatizada com voz e texto na tela.";
  } else if (
    pergunta.includes("tecnologias") ||
    pergunta.includes("linguagens") ||
    pergunta.includes("linguagem de programação")
  ) {
    resposta = "Foram utilizadas HTML, CSS e JavaScript, além das APIs nativas do navegador para voz.";
  } else if (
    pergunta.includes("hospedagem") ||
    pergunta.includes("onde está") ||
    pergunta.includes("servidor")
  ) {
    resposta = "O site está hospedado no GitHub Pages, com recursos de backend simulados.";
  } else if (
    pergunta.includes("reconhecimento de voz") ||
    pergunta.includes("falar com a ia") ||
    pergunta.includes("voz")
  ) {
    resposta = "Sim, é possível interagir com a IA usando comandos de voz através do botão de microfone.";
  } else if (
    pergunta.includes("futuro") ||
    pergunta.includes("melhorias") ||
    pergunta.includes("próximos passos")
  ) {
    resposta = "Pretendemos integrar com IA real usando APIs como a da OpenAI, e melhorar a personalização e acessibilidade.";
  } else if (
    pergunta.includes("oi") ||
    pergunta.includes("olá") ||
    pergunta.includes("bom dia") ||
    pergunta.includes("boa tarde")
  ) {
    resposta = "Olá! Estou aqui para ajudar com informações sobre o projeto.";
  }

  respostaDiv.textContent = resposta;

  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(resposta);
  utter.lang = "pt-BR";
  synth.speak(utter);
}
