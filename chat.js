document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('question-input');
  const btnSend = document.getElementById('btn-send');
  const btnVoice = document.getElementById('btn-voice');
  const status = document.getElementById('status');

  let responses = [];

  // Carregar perguntas/respostas do JSON
  fetch('perguntas1.json')
    .then(res => res.json())
    .then(data => {
      responses = data;
    })
    .catch(err => {
      console.error('Erro ao carregar JSON:', err);
      status.textContent = 'Erro ao carregar base de perguntas.';
    });

  // Função Jarvis para falar
  function speakJarvis(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Ajustes para voz Jarvis
      utterance.pitch = 0.8; 
      utterance.rate = 1.05;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      let jarvisVoice = voices.find(v => v.lang === 'pt-BR' && v.name.toLowerCase().includes('male'));
      if (!jarvisVoice) jarvisVoice = voices.find(v => v.lang === 'pt-BR') || voices[0];
      utterance.voice = jarvisVoice;

      window.speechSynthesis.speak(utterance);
    }
  }

  // Adicionar mensagem no chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    if (sender === 'bot') speakJarvis(text);
  }

  // Obter resposta baseada na pergunta
  function getResponse(question) {
    question = question.toLowerCase();
    for (const resp of responses) {
      if (typeof resp.question === 'string') {
        if (question.includes(resp.question.toLowerCase())) {
          if (typeof resp.answer === 'function') return resp.answer();
          else return resp.answer;
        }
      }
    }

    const jokes = [
      "Não entendi muito bem, mas gosto da sua pergunta!",
      "Essa é difícil... Me pergunte outra coisa!",
      "Vou fingir que entendi e responder: JavaScript é incrível!",
      "Você sabe que eu sou só um programa, né? Mas adoro conversar!",
      "Quer ouvir uma piada? Por que o gato mia? Porque não sabe latir!",
    ];

    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Enviar pergunta
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
    }, 1000);
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

