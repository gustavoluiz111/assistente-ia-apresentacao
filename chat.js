document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('question-input');
  const btnSend = document.getElementById('btn-send');
  const btnVoice = document.getElementById('btn-voice');
  const status = document.getElementById('status');

  let responses = [];

  // Carregar perguntas do JSON
  fetch('perguntas1.json')
    .then(res => res.json())
    .then(data => {
      responses = data;
    })
    .catch(err => {
      console.error('Erro ao carregar perguntas:', err);
      responses = [];
    });

  // Função para falar em voz alta
  function speak(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Configurações da voz (você pode ajustar pitch e rate)
      utterance.pitch = 1; // tom
      utterance.rate = 1;  // velocidade
      // Selecionar voz próxima de Jarvis (navegador define vozes disponíveis)
      const voices = window.speechSynthesis.getVoices();
      const jarvisVoice = voices.find(v => v.lang === 'pt-BR') || voices[0];
      utterance.voice = jarvisVoice;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Função para achar resposta baseada na pergunta do usuário
  function getResponse(question) {
    question = question.toLowerCase();

    for (const resp of responses) {
      if (typeof resp.question === 'string' && question.includes(resp.question.toLowerCase())) {
        if (typeof resp.answer === 'function') {
          return resp.answer();
        } else {
          return resp.answer;
        }
      }
    }

    const jokes = [
      "Não entendi muito bem, mas gosto da sua pergunta!",
      "Essa é difícil... Me pergunte outra coisa!",
      "Vou fingir que entendi e responder: JavaScript é incrível!",
      "Você sabe que eu sou só um programa, né? Mas adoro conversar!",
      "Quer ouvir uma piada? Por que o gato mia? Porque não sabe latir!"
    ];

    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Adicionar mensagem ao chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    // Se for mensagem do bot, falar
    if (sender === 'bot') speak(text);
  }

  // Enviar pergunta e resposta
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
    }, 800);
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
