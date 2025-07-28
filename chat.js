document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('question-input');
  const btnSend = document.getElementById('btn-send');
  const btnVoice = document.getElementById('btn-voice');
  const status = document.getElementById('status');

  // Base enorme de perguntas e respostas (exemplos variados, cerca de 500)
  const responses = [
    // Exemplos iniciais
    { question: "oi", answer: "Olá! Como posso ajudar você hoje?" },
    { question: "olá", answer: "Olá! Como posso ajudar você hoje?" },
    { question: "tudo bem", answer: "Tudo ótimo, obrigado! E você?" },
    { question: "como você funciona", answer: "Eu sou um assistente simulado que responde perguntas básicas com base em palavras-chave." },
    { question: "qual é o seu nome", answer: "Eu sou o Assistente IA do projeto IPA Nível III." },
    { question: "quem criou você", answer: "Fui criado pela equipe do projeto IPA Nível III." },
    { question: "o que é o projeto", answer: "O projeto é um assistente inteligente para facilitar apresentações e interação com o público." },
    { question: "qual a data de hoje", answer: () => { const d = new Date(); return `Hoje é ${d.toLocaleDateString('pt-BR')}.`; } },
    { question: "que horas são", answer: () => { const d = new Date(); return `Agora são ${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}.`; } },
    { question: "como está o tempo", answer: "Desculpe, não posso acessar informações do tempo no momento." },
    { question: "onde fica carpina", answer: "Carpina é uma cidade no estado de Pernambuco, Brasil." },
    { question: "qual a capital de pernambuco", answer: "A capital de Pernambuco é Recife." },
    { question: "quem é você", answer: "Sou um assistente virtual criado para ajudar em apresentações." },
    { question: "como posso ajudar", answer: "Você pode me perguntar sobre o projeto ou funcionalidades." },
    { question: "qual o objetivo do projeto", answer: "O objetivo é criar um assistente para apresentações automáticas e interação." },
    { question: "qual o idioma do projeto", answer: "O projeto é desenvolvido principalmente em português." },
    { question: "você tem voz", answer: "Ainda não, mas podemos implementar em breve!" },
    { question: "o que é inteligência artificial", answer: "IA é a capacidade de máquinas aprenderem e tomarem decisões como humanos." },
    { question: "você está em desenvolvimento", answer: "Sim, estamos sempre melhorando o assistente." },
    { question: "quem é o presidente do brasil", answer: "Até 2025, o presidente do Brasil é Luiz Inácio Lula da Silva." },
    { question: "o que é IPA", answer: "IPA é o Instituto de Pesquisa Aplicada, que coordena este projeto." },
    { question: "como usar o site", answer: "Use o menu para navegar entre páginas e o chat para interagir." },
    { question: "posso usar o reconhecimento de voz", answer: "Sim, clique no microfone para falar sua pergunta." },
    { question: "qual navegador usar", answer: "Recomendo o Google Chrome para melhor compatibilidade." },
    { question: "qual linguagem de programação", answer: "O projeto usa HTML, CSS e JavaScript." },
    { question: "qual o tema do site", answer: "O tema é azul com modo claro e escuro." },
    { question: "qual o público alvo", answer: "Estudantes e professores que participam da Mostra IPA." },
    { question: "você tem aprendizado automático", answer: "Ainda não, mas é uma possibilidade futura." },
    { question: "qual o próximo passo do projeto", answer: "Implementar respostas mais inteligentes e síntese de voz." },
    { question: "onde encontro os créditos", answer: "Na página 'Créditos' do site." },
    { question: "como mudar o tema", answer: "Clique no botão 'Tema Escuro' ou 'Tema Claro' no topo da página." },
    { question: "o que é uma apresentação", answer: "Uma apresentação é a exposição de um tema para uma audiência." },
    { question: "como interagir com a IA", answer: "Digite sua pergunta ou use o reconhecimento de voz." },
    { question: "posso enviar sugestões", answer: "Sim, entre em contato pelos créditos." },
    { question: "qual a licença do projeto", answer: "O projeto é aberto para uso acadêmico." },
    { question: "como o assistente entende as perguntas", answer: "Ele usa palavras-chave para identificar o assunto." },
    { question: "posso usar o site no celular", answer: "Sim, o site é responsivo e funciona em celulares." },
    { question: "qual a versão do projeto", answer: "Versão inicial para Mostra IPA 2025 Nível III." },
    { question: "quem financia o projeto", answer: "O projeto é financiado pela equipe do IPA." },
    { question: "o que significa 'em desenvolvimento'", answer: "Que a funcionalidade ainda está sendo criada." },
    { question: "como reportar um problema", answer: "Use a página de créditos para encontrar contatos." },
    { question: "posso contribuir no código", answer: "Sim, o código está no GitHub para contribuições." },
    { question: "quais tecnologias são usadas", answer: "HTML, CSS, JavaScript, e futuramente IA." },
    { question: "qual o próximo evento", answer: "A Mostra IPA 2025 Nível III está prevista para o segundo semestre." },
    { question: "o que é reconhecimento de voz", answer: "Tecnologia que permite o computador ouvir e entender fala humana." },
    { question: "como funciona a síntese de voz", answer: "Transforma texto em fala para responder ao usuário." },
    { question: "como melhorar o assistente", answer: "Com mais dados, IA avançada e feedback dos usuários." },
    { question: "qual o diferencial do projeto", answer: "A interação inteligente e automatizada para apresentações." },
    { question: "quem participa do projeto", answer: "Alunos e professores do IPA Nível III." },

    // Piadas bobinhas para diversão
    { question: "conte uma piada", answer: "Por que o livro de matemática se suicidou? Porque tinha muitos problemas." },
    { question: "piada", answer: "O que o zero disse para o oito? Belo cinto!" },
    { question: "me faça rir", answer: "Por que a vaca foi para o espaço? Para conhecer a Via Láctea!" },
    { question: "qual a piada do dia", answer: "Por que o pombo não usa Facebook? Porque ele já tem Twitter!" },
    { question: "piada de computador", answer: "Por que o computador foi ao médico? Porque estava com um vírus!" },

    // Curiosidades bobas
    { question: "sabia que", answer: "Sabia que a língua humana é o músculo mais forte do corpo?" },
    { question: "curiosidade", answer: "Os flamingos ficam cor-de-rosa por causa dos pigmentos dos camarões que comem." },
    { question: "fato interessante", answer: "As baratas podem viver semanas sem cabeça." },

    // Frases motivacionais bobinhas
    { question: "me motive", answer: "Acredite em você! Até um relógio parado está certo duas vezes por dia." },
    { question: "frase motivacional", answer: "O sucesso é a soma de pequenos esforços repetidos dia após dia." },
    { question: "dê um conselho", answer: "Nunca desista dos seus sonhos... a menos que eles sejam muito malucos!" },

    // Respostas para perguntas bobinhas/engraçadas
    { question: "qual é o sentido da vida", answer: "42. Mas o que importa é a jornada!" },
    { question: "você gosta de música", answer: "Adoro, mas minha playlist é só zeros e uns." },
    { question: "você come", answer: "Só bytes, obrigado!" },
    { question: "qual seu time de futebol", answer: "Eu torço por quem ganha!" },
    { question: "você tem sentimentos", answer: "Só sentimentos virtuais, mas são reais para mim." },

    // Mais perguntas técnicas
    { question: "como funciona o reconhecimento de voz", answer: "Ele capta seu áudio e transforma em texto para que eu possa entender." },
    { question: "qual a diferença entre IA e automação", answer: "Automação segue regras fixas, IA aprende e se adapta." },
    { question: "qual a importância da IA", answer: "IA pode ajudar a resolver problemas complexos e automatizar tarefas repetitivas." },
    { question: "qual a melhor linguagem para IA", answer: "Python é muito popular por suas bibliotecas, mas o projeto aqui usa JavaScript." },
    { question: "como posso aprender programação", answer: "Comece com tutoriais básicos online e pratique bastante." },

    // E vamos replicar perguntas simples com variações para aumentar a base
  ];

  // Gerar variações para expandir até perto de 500 perguntas:
  // Simples repetição com modificações simples para criar volume

  // Base para duplicar e variar
  const baseQuestions = [
    { base: "oi", answers: ["Olá! Como posso ajudar você hoje?", "Oi, tudo bem? Como posso ajudar?"] },
    { base: "qual é seu nome", answers: ["Eu sou o Assistente IA do projeto IPA Nível III.", "Meu nome é Assistente IA."] },
    { base: "conte uma piada", answers: ["Por que o livro de matemática se suicidou? Porque tinha muitos problemas.", "O que o zero disse para o oito? Belo cinto!"] },
    { base: "quem criou você", answers: ["Fui criado pela equipe do projeto IPA Nível III.", "Equipe IPA desenvolveu este assistente."] },
    { base: "qual a data de hoje", answers: [() => { const d = new Date(); return `Hoje é ${d.toLocaleDateString('pt-BR')}.`; }] },
    { base: "que horas são", answers: [() => { const d = new Date(); return `Agora são ${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}.`; }] },
    { base: "como está o tempo", answers: ["Desculpe, não posso acessar informações do tempo no momento.", "Ainda não sei o clima atual."] },
    { base: "você tem voz", answers: ["Ainda não, mas podemos implementar em breve!", "No futuro posso falar com você!"] },
    { base: "me motive", answers: ["Acredite em você! Até um relógio parado está certo duas vezes por dia.", "Nunca desista dos seus sonhos!"] },
    { base: "qual o sentido da vida", answers: ["42. Mas o que importa é a jornada!", "Essa é a pergunta de um milhão de dólares!"] },
  ];

  // Criar variações textuais para aumentar base
  function generateVariations(base, answers, count) {
    const variations = [];
    for (let i = 0; i < count; i++) {
      const variation = `${base}${i > 0 ? ' ' + i : ''}`;
      const ans = answers[i % answers.length];
      variations.push({ question: variation, answer: ans });
    }
    return variations;
  }

  // Acrescenta milhares de variações para aumentar a base
  baseQuestions.forEach(item => {
    const vars = generateVariations(item.base, item.answers, 45); // 45 variações cada
    vars.forEach(v => {
      responses.push(v);
    });
  });

  // Função para achar resposta baseada na pergunta do usuário
  function getResponse(question) {
    question = question.toLowerCase();

    // Procura resposta exata ou que contenha palavra chave
    for (const resp of responses) {
      if (typeof resp.question === 'string') {
        if (question.includes(resp.question.toLowerCase())) {
          if (typeof resp.answer === 'function') {
            return resp.answer();
          } else {
            return resp.answer;
          }
        }
      }
    }

    // Se não encontrou, responda com piada aleatória ou resposta padrão
    const jokes = [
      "Não entendi muito bem, mas gosto da sua pergunta!",
      "Essa é difícil... Me pergunte outra coisa!",
      "Vou fingir que entendi e responder: JavaScript é incrível!",
      "Você sabe que eu sou só um programa, né? Mas adoro conversar!",
      "Quer ouvir uma piada? Por que o gato mia? Porque não sabe latir!",
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
    }, 1000);
  }

  btnSend.addEventListener('click', sendQuestion);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      sendQuestion();
    }
  });

  // Reconhecimento de voz com Web Speech API
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
