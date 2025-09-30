const messagesContainer = document.getElementById('messages') || (() => {
  const div = document.createElement('div');
  div.id = 'messages';
  div.style.position = 'absolute';
  div.style.bottom = '60px';
  div.style.width = '100%';
  div.style.maxHeight = '300px';
  div.style.overflowY = 'auto';
  document.querySelector('.container-ia-chat').appendChild(div);
  return div;
})();

const userInput = document.getElementById('input-text');
const voiceCheckbox = document.getElementById('input-voice');
const fileCheckbox = document.getElementById('input-files');

// Reconhecimento de voz
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    sendMessage(transcript);
  };

  recognition.onerror = function(event) {
    console.error(event.error);
  };
} else {
  document.querySelector('.label-voice').style.opacity = 0.5;
}

// Histórico persistente
let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
chatHistory.forEach(msg => appendMessage(msg.text, msg.sender, false));

function saveHistory(text, sender) {
  chatHistory.push({ text, sender });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Timestamp
function getTimestamp() {
  const now = new Date();
  return now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
}

// Adicionar mensagem
function appendMessage(text, sender, save = true) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ' + sender;
  msgDiv.innerHTML = text;

  const time = document.createElement('div');
  time.className = 'timestamp';
  time.textContent = getTimestamp();
  msgDiv.appendChild(time);

  messagesContainer.appendChild(msgDiv);
  setTimeout(() => msgDiv.classList.add('show'), 10);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  if (save) saveHistory(text, sender);
}

// Bot “digitando”
function botReply(message) {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing';
  typingDiv.textContent = 'Bot está digitando...';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    const botReplies = [
      "Entendi!",
      "Pode me contar mais?",
      "Interessante!",
      "Vamos continuar falando sobre isso.",
      "Certo, anotado."
    ];
    const botMsg = botReplies[Math.floor(Math.random() * botReplies.length)];
    appendMessage(botMsg, 'bot');
  }, 1000 + Math.random() * 1000);
}

// Enviar mensagem
function sendMessage(text) {
  const message = text || userInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  userInput.value = '';
  botReply(message);
}

// Enter envia mensagem
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

// Upload de arquivos
fileCheckbox.addEventListener('change', function() {
  const fileInputElement = document.createElement('input');
  fileInputElement.type = 'file';
  fileInputElement.multiple = true;
  fileInputElement.onchange = () => {
    Array.from(fileInputElement.files).forEach(file => {
      let content;
      if (file.type.startsWith('image/')) {
        content = `<img src="${URL.createObjectURL(file)}" alt="${file.name}">`;
      } else {
        content = `<a href="${URL.createObjectURL(file)}" target="_blank">${file.name}</a>`;
      }
      appendMessage(content, 'user');
    });
  };
  fileInputElement.click();
});

// Botão de voz
document.querySelector('.label-voice').addEventListener('click', () => {
  if (recognition) recognition.start();
});
// Container de mensagens já criado acima
messagesContainer.style.display = 'flex';
messagesContainer.style.flexDirection = 'column';
messagesContainer.style.gap = '8px';
messagesContainer.style.padding = '10px';

// Estilos das mensagens
const style = document.createElement('style');
style.textContent = `
  .message {
    max-width: 70%;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.3;
    position: relative;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    word-wrap: break-word;
  }
  .message.show {
    opacity: 1;
    transform: translateY(0);
  }
  .message.user {
    background-color: #9147ff33;
    color: #2b2b2b;
    align-self: flex-end;
  }
  .message.bot {
    background-color: #e9e9e9;
    color: #4c4c4c;
    align-self: flex-start;
  }
  .message img {
    max-width: 150px;
    border-radius: 8px;
  }
  .message a {
    color: #9147ff;
    text-decoration: underline;
  }
  .timestamp {
    font-size: 10px;
    color: #888;
    position: absolute;
    bottom: -14px;
    right: 8px;
  }
  .typing {
    font-style: italic;
    color: #666;
    font-size: 13px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .typing.show {
    opacity: 1;
  }
`;
document.head.appendChild(style);

// Modificação no botReply para mostrar efeito "digitando"
function botReply(message) {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing show';
  typingDiv.textContent = 'Bot está digitando...';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    const botReplies = [
      "Entendi!",
      "Pode me contar mais?",
      "Interessante!",
      "Vamos continuar falando sobre isso.",
      "Certo, anotado."
    ];
    const botMsg = botReplies[Math.floor(Math.random() * botReplies.length)];
    appendMessage(botMsg, 'bot');
  }, 1000 + Math.random() * 1000);
}

// Upload de arquivos atualizado para manter estilização e scroll
fileCheckbox.addEventListener('change', function() {
  const fileInputElement = document.createElement('input');
  fileInputElement.type = 'file';
  fileInputElement.multiple = true;
  fileInputElement.onchange = () => {
    Array.from(fileInputElement.files).forEach(file => {
      let content;
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        content = img;
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.controls = true;
        video.style.maxWidth = '200px';
        content = video;
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.textContent = file.name;
        link.target = '_blank';
        content = link;
      }
      appendMessage(content, 'user');
    });
  };
  fileInputElement.click();
});

// Garantir scroll automático no envio de mensagem
function appendMessage(textOrElement, sender, save = true) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ' + sender;

  if (typeof textOrElement === 'string') {
    msgDiv.innerHTML = textOrElement;
  } else {
    msgDiv.appendChild(textOrElement);
  }

  const time = document.createElement('div');
  time.className = 'timestamp';
  time.textContent = getTimestamp();
  msgDiv.appendChild(time);

  messagesContainer.appendChild(msgDiv);
  setTimeout(() => msgDiv.classList.add('show'), 10);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  if (save) saveHistory(typeof textOrElement === 'string' ? textOrElement : '[arquivo]', sender);
}
