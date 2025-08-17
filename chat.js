document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('question-input');
  const btnSend = document.getElementById('btn-send');
  const btnVoice = document.getElementById('btn-voice');
  const status = document.getElementById('status');

  let responses = [];

  // Carregar o arquivo JSON com fetch
  fetch('perguntas1.json')
    .then(response => response.json())
    .then(data => {
      responses = data;
    })
    .catch(err => {
      console.error("Erro ao carregar perguntas:", err);
      status.textContent = "Erro ao carregar base de perguntas.";
    });

  // Função para encontrar resposta baseada na pergunta
  function getResponse(question) {
    question = question.toLowerCase();
    for (const resp of responses) {
      if (question.includes(resp.question.toLowerCase())) {
        return typeof resp.answer === 'function' ? resp.answer() : resp.answer;
      }
    }

    // Resposta padrão se não encontrar
    const jokes = [
      "Não entendi muito bem, mas gostei da sua pergunta!",
      "Essa é difícil... Me pergunte outra coisa!",
      "Vou fingir que entendi: JavaScript é incrível!",
      "Você sabe que eu sou só um programa, né? Mas adoro conversar!",
      "Quer ouvir uma piada? Por que o gato mia? Porque não sabe latir!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Adiciona mensagem ao chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  // Envia pergunta e recebe resposta
  function sendQuestion() {
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    status.textContent = 'Processando resposta...';

    setTimeout(() => {
      const answer = getResponse(question);
      addMessage(answer, 'bot');
      status.textContent = '';
      // Síntese de voz
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(answer);
        utter.lang = 'pt-BR';
        window.speechSynthesis.speak(utter);
      }
    }, 500);
  }

  btnSend.addEventListener('click', sendQuestion);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendQuestion();
  });

  // Reconhecimento de voz
  let recognition;
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('start', () => {
      status.textContent = 'Escutando... Fale agora.';
    });

    recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      status.textContent = 'Pergunta captada. Enviando...';
      sendQuestion();
    });

    recognition.addEventListener('error', (event) => {
      status.textContent = 'Erro no reconhecimento de voz: ' + event.error;
    });

    recognition.addEventListener('end', () => {
      status.textContent = '';
    });

    btnVoice.addEventListener('click', () => {
      recognition.start();
    });
  } else {
    btnVoice.disabled = true;
    status.textContent = 'Reconhecimento de voz não suportado neste navegador.';
  }
});
