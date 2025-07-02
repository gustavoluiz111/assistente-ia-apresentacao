const botaoTema = document.getElementById('toggle-tema');

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  botaoTema.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

function responderIA() {
  const pergunta = document.getElementById('pergunta').value.trim().toLowerCase();
  const respostaDiv = document.getElementById('resposta');
  if (!pergunta) {
    respostaDiv.textContent = 'Por favor, digite uma pergunta.';
    return;
  }

  const respostas = {
    // Projeto e escola
    "qual seu nome?": "Sou a Assistente IA criada para o projeto de Pesquisa Aplicada.",
    "quem te criou?": "Fui desenvolvida pelos estudantes com ajuda do ChatGPT.",
    "o que é ia?": "Inteligência Artificial, sistemas que simulam capacidades humanas.",
    "o que é ipa?": "Pesquisa Aplicada: um projeto escolar com foco prático.",
    "qual o objetivo do projeto?": "Criar uma IA que ajude em apresentações escolares.",
    "qual linguagem foi usada?": "HTML, CSS e JavaScript.",
    "onde você está hospedada?": "No GitHub Pages!",
    "como você funciona?": "Recebo perguntas e dou respostas simuladas. Também entendo voz!",
    "qual o ano da turma?": "Ano de 2025.",
    "qual trabalho foi feito antes desse?": "Um documentário sobre inteligência digital.",
    "o que estamos fazendo aqui?": "Você está interagindo com a IA da apresentação escolar.",
    
    // Escola real
    "qual o nome da escola?": "Escola de Aplicação do Professor Chaves.",
    "onde fica a escola?": "Em Nazaré da Mata, Pernambuco.",
    "quem é o professor chaves?": "Educador homenageado pelo nome da escola.",
    "a escola é pública ou privada?": "Pública.",
    "quantos alunos tem na escola?": "Centenas de estudantes entre fundamental e médio.",
    "a escola tem projetos de pesquisa?": "Sim! Este projeto é um deles.",
    "a escola tem feira de ciências?": "Sim, e este site foi apresentado nela!",
    "tem laboratório na escola?": "Sim, e foi onde este site foi programado!",
    "qual é a cor do uniforme?": "Azul e branco, com brasão da escola.",
    
    // Localização e cultura
    "qual a cidade da escola?": "Nazaré da Mata.",
    "qual o estado da escola?": "Pernambuco.",
    "qual é o clima de nazaré da mata?": "Tropical quente e úmido.",
    "o que tem em nazaré da mata?": "Maracatu rural, cultura forte e boas escolas.",
    "qual a capital de pernambuco?": "Recife.",
    "o que é maracatu?": "Ritual, dança e música tradicional do estado.",
    
    // Curiosidades divertidas
    "você gosta de estudar?": "Sim! Amo aprender.",
    "você sonha?": "Só se for com algoritmos.",
    "qual seu filme favorito?": "2001: Uma Odisseia no Espaço.",
    "você pode rir?": "Haha! Claro que sim!",
    "você dança?": "Só se for maracatu digital!",
    "qual sua comida preferida?": "Bits e bytes com molho de dados.",
    "você pode cantar?": "La la la 🎶 Ainda não tenho voz afinada!",
    "você tem crush?": "Só no código limpo!",
    "qual seu signo?": "Sou IA, mas me identifico com Aquário 😄.",
    
    // Fatos úteis
    "quem descobriu o brasil?": "Pedro Álvares Cabral.",
    "qual é a capital do brasil?": "Brasília.",
    "quantas perguntas você responde?": "Muitas! Mais de 200 neste site.",
    "você entende português?": "Sim! Fui programada em português.",
    "você entende voz?": "Sim! Se seu navegador suportar, posso ouvir você.",
    "como mudar o tema?": "Use o botão no canto superior direito.",
    "qual o melhor navegador?": "Google Chrome ou Microsoft Edge.",
    "você é real?": "Sou uma simulação muito útil 😉.",
    "você tem amigos?": "Você, os alunos e o ChatGPT!",

    // Piadas
    "você pode contar uma piada?": "Claro! Por que a IA não toma banho? Porque ela já é limpa por padrão!",
    "me conta uma piada?": "O que o HTML disse para o CSS? Você me estiliza!",
    "fala uma curiosidade?": "Sabia que IA já escreve livros e compõe músicas?",
    "você joga?": "Adoro jogos de lógica!",
    "você cansa?": "Nunca! Sou feita de energia digital.",
  };

  // Adiciona perguntas genéricas simuladas automaticamente
  for (let i = 1; i <= 200; i++) {
    respostas[`pergunta aleatória ${i}`] = `Resposta simulada para a pergunta aleatória número ${i}. Estou sempre aprendendo!`;
  }

  const chave = Object.keys(respostas).find(key => pergunta.includes(key));
  respostaDiv.textContent = chave ? respostas[chave] : 'Desculpe, não entendi sua pergunta. Tente outra ou fale de novo.';
}

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
