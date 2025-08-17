document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('question-input');
  const btnSend = document.getElementById('btn-send');
  const btnVoice = document.getElementById('btn-voice');
  const status = document.getElementById('status');

  let responses = [];

  // Carregar perguntas do arquivo JSON
  fetch('perguntas1.json')
    .then(response => response.json())
    .then(data => {
      responses = data;
      console.log(`Perguntas carregadas: ${responses.length}`);
    })
    .catch(err => console.error('Erro ao carregar perguntas:', err));

  // Função para achar resposta
  function getResponse(question) {
    question = question.toLowerCase();

    for (const resp of responses) {
      if (question.includes(resp.question.toLowerCase())) {
        if (typeof resp.answer === 'function') {
          return resp.answer();
        } else {
          return resp.answer;
        }
      }
    }

    // Resposta padrão se não encontrou
    const jokes = [
      "Não entendi muito bem, mas gostei da sua pergunta!",
      "Essa é difícil... Me pergunte outra coisa!",
      "Vou fingir que entendi e responder: JavaScript é incrível!",
      "Quer ouvir uma piada? Por que o gato mia? Porque não sabe latir!",
    ];

    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Adicionar mensagem no chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);

    if (sender === 'bot') {
      // Adiciona ícone do Jarvis
      const icon = document.createElement('span');
      icon.classList.add('bot-icon');
      icon.innerHTML = '🤖'; // Aqui você pode colocar a imagem do ícone
      msg.appendChild(icon);
    }

    const content = document.createElement('span');
    content.classList.add('message-text');
    content.textContent = text;
    msg.appendChild(content);

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
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
    }, 800);
  }

  btnSend.addEventListener('click', sendQuestion);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendQuestion(); });

  // Reconhecimento de voz
  let recognition;
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener('start', () => { status.textContent = 'Escutando... Fale agora.'; });
    recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      status.textContent = 'Pergunta captada. Enviando...';
      sendQuestion();
    });
    recognition.addEventListener('error', (event) => { status.textContent = 'Erro no reconhecimento de voz: ' + event.error; });
    recognition.addEventListener('end', () => { status.textContent = ''; });

    btnVoice.addEventListener('click', () => { recognition.start(); });
  } else {
    btnVoice.disabled = true;
    status.textContent = 'Reconhecimento de voz não suportado neste navegador.';
  }
});
