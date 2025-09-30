// Seleção de elementos
const inputText = document.getElementById('input-text');
const chatContainer = document.getElementById('chat');
const uploadFileBtn = document.getElementById('upload-file');
const uploadImageBtn = document.getElementById('upload-image');
const uploadCameraBtn = document.getElementById('upload-camera');
const voiceToggle = document.getElementById('input-voice');

// Função para criar mensagens no chat
function addMessage(content, type = 'user') {
  const msg = document.createElement('div');
  msg.classList.add('message', type);
  msg.textContent = content;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight; // rolar para baixo
}

// Enviar mensagem ao pressionar Enter
inputText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputText.value.trim() !== '') {
    addMessage(inputText.value, 'user');
    inputText.value = '';
    // Aqui você pode chamar sua API de IA e adicionar a resposta:
    // addMessage(respostaIA, 'ai');
  }
});

// Upload de arquivos
uploadFileBtn.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) addMessage(`Arquivo enviado: ${file.name}`, 'user');
  };
  fileInput.click();
});

uploadImageBtn.addEventListener('click', () => {
  const imgInput = document.createElement('input');
  imgInput.type = 'file';
  imgInput.accept = 'image/*';
  imgInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) addMessage(`Imagem enviada: ${file.name}`, 'user');
  };
  imgInput.click();
});

uploadCameraBtn.addEventListener('click', () => {
  const camInput = document.createElement('input');
  camInput.type = 'file';
  camInput.accept = 'image/*';
  camInput.capture = 'environment';
  camInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) addMessage(`Foto tirada: ${file.name}`, 'user');
  };
  camInput.click();
});

// Toggle voz (apenas visual)
voiceToggle.addEventListener('change', () => {
  if (voiceToggle.checked) {
    console.log('Gravação de voz ativada');
    // Aqui você pode iniciar gravação real com Web Speech API
  } else {
    console.log('Gravação de voz desativada');
  }
});
