// Função para alternar o tema claro/escuro
const botaoTema = document.getElementById('toggle-tema');

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    botaoTema.textContent = '☀️';
  } else {
    botaoTema.textContent = '🌙';
  }
});

// Simulação básica da IA (substituir depois pela real)
function responderIA() {
  const pergunta = document.getElementById('pergunta').value.trim().toLowerCase();
  const respostaDiv = document.getElementById('resposta');
  if (!pergunta) {
    respostaDiv.textContent = 'Por favor, digite uma pergunta.';
    return;
  }

  const respostasSimuladas = {
    'qual seu nome?': 'Eu sou a Assistente IA do projeto IPA.',
    'o que é ipa?': 'IPA é a sigla para Pesquisa Aplicada, o nosso projeto de final de ano.',
    'como você funciona?': 'Eu uso um conjunto de perguntas e respostas simuladas para ajudar na apresentação.',
    'quem criou você?': 'Fui criada pelos estudantes do projeto com ajuda do ChatGPT.',
    'como mudar o tema?': 'Clique no botão no canto superior direito para alternar entre modo claro e escuro.'
  };

  respostaDiv.textContent = respostasSimuladas[pergunta] || 'Desculpe, não entendi sua pergunta. Pode tentar outra?';
}

// Função para iniciar reconhecimento de voz (Chrome/Firefox)
function iniciarVoz() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Reconhecimento de voz não suportado neste navegador.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = event => {
    const texto = event.results[0][0].transcript;
    document.getElementById('pergunta').value = texto;
    responderIA();
  };

  recognition.onerror = event => {
    alert('Erro no reconhecimento de voz: ' + event.error);
  };
}
