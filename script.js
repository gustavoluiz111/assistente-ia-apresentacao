function responderIA() {
  const pergunta = document.getElementById("pergunta").value.toLowerCase();
  const respostaDiv = document.getElementById("resposta");

  let resposta = "Desculpe, não entendi sua pergunta. Pode reformular?";

  // Objetivo do projeto
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
    resposta =
      "O objetivo do projeto é criar uma inteligência artificial que automatize apresentações escolares, permitindo interação em tempo real com o público para tornar a experiência mais dinâmica e eficiente.";
  }

  // Participantes do projeto
  else if (
    pergunta.includes("quem fez") ||
    pergunta.includes("participantes") ||
    pergunta.includes("quem criou") ||
    pergunta.includes("autores") ||
    pergunta.includes("quem desenvolveu") ||
    pergunta.includes("quem participou") ||
    pergunta.includes("quem trabalhou")
  ) {
    resposta =
      "Este projeto foi desenvolvido pelos estudantes Nome 1, Nome 2 e Nome 3, que se dedicaram a inovação e tecnologia.";
  }

  // Professor orientador
  else if (
    pergunta.includes("professor") ||
    pergunta.includes("orientador") ||
    pergunta.includes("quem orientou") ||
    pergunta.includes("quem supervisionou") ||
    pergunta.includes("quem acompanhou")
  ) {
    resposta =
      "O professor orientador do projeto é o Prof. Nome do Professor, que nos auxiliou e orientou durante todo o processo.";
  }

  // Como funciona a IA
  else if (
    pergunta.includes("como funciona") ||
    pergunta.includes("ia") ||
    pergunta.includes("inteligência artificial") ||
    pergunta.includes("funciona") ||
    pergunta.includes("qual o funcionamento")
  ) {
    resposta =
      "A inteligência artificial do projeto funciona reconhecendo perguntas feitas pelo público e respondendo de forma automatizada, usando comandos programados e síntese vocal para criar uma interação natural e dinâmica.";
  }

  // Tecnologias usadas
  else if (
    pergunta.includes("tecnologias") ||
    pergunta.includes("ferramentas") ||
    pergunta.includes("linguagens") ||
    pergunta.includes("tecnologia usada") ||
    pergunta.includes("tecnologia utilizada") ||
    pergunta.includes("linguagem de programação")
  ) {
    resposta =
      "Utilizamos HTML, CSS e JavaScript para o desenvolvimento do site, além de bibliotecas nativas do navegador para reconhecimento de voz e síntese vocal.";
  }

  // Hospedagem do projeto
  else if (
    pergunta.includes("hospedagem") ||
    pergunta.includes("onde está") ||
    pergunta.includes("servidor") ||
    pergunta.includes("onde está hospedado") ||
    pergunta.includes("local do site")
  ) {
    resposta =
      "O site do projeto está hospedado no GitHub Pages, enquanto o backend da inteligência artificial roda no Replit, garantindo acesso rápido e estável.";
  }

  // Recursos especiais
  else if (
    pergunta.includes("recursos") ||
    pergunta.includes("destaques") ||
    pergunta.includes("funcionalidades") ||
    pergunta.includes("características") ||
    pergunta.includes("diferenciais")
  ) {
    resposta =
      "Os principais recursos incluem reconhecimento de fala para perguntas orais, modo claro e escuro para melhor usabilidade, transições suaves entre páginas, e interação em tempo real com a IA.";
  }

  // Limitações do projeto
  else if (
    pergunta.includes("limitações") ||
    pergunta.includes("problemas") ||
    pergunta.includes("desvantagens") ||
    pergunta.includes("pontos fracos")
  ) {
    resposta =
      "O projeto utiliza uma IA simulada, que responde apenas às perguntas programadas, sem capacidade de aprendizado ou respostas improvisadas.";
  }

  // Futuro e melhorias
  else if (
    pergunta.includes("futuro") ||
    pergunta.includes("melhorias") ||
    pergunta.includes("próximos passos") ||
    pergunta.includes("planejamento") ||
    pergunta.includes("o que vem depois")
  ) {
    resposta =
      "Pretendemos integrar a IA com a API da OpenAI para respostas mais inteligentes, além de aprimorar a interface e incluir funcionalidades adicionais, como reconhecimento facial e personalização do assistente.";
  }

  // Perguntas sobre interação
  else if (
    pergunta.includes("como falar") ||
    pergunta.includes("como usar") ||
    pergunta.includes("como interagir") ||
    pergunta.includes("como funciona a interação")
  ) {
    resposta =
      "Você pode digitar ou falar sua pergunta no campo indicado. A IA responderá na tela e também falará a resposta em voz alta para facilitar a compreensão.";
  }

  // Perguntas sobre reconhecimento de voz
  else if (
    pergunta.includes("reconhecimento de voz") ||
    pergunta.includes("falar com a ia") ||
    pergunta.includes("voz") ||
    pergunta.includes("comando de voz")
  ) {
    resposta =
      "Utilizamos as APIs nativas do navegador para reconhecer comandos de voz, permitindo que o usuário fale a pergunta em vez de digitar.";
  }

  // Perguntas sobre segurança
  else if (
    pergunta.includes("segurança") ||
    pergunta.includes("privacidade") ||
    pergunta.includes("dados pessoais") ||
    pergunta.includes("proteção")
  ) {
    resposta =
      "O projeto respeita a privacidade do usuário, não armazenando dados pessoais e utilizando conexões seguras para comunicação com o backend.";
  }

  // Perguntas sobre acessibilidade
  else if (
    pergunta.includes("acessibilidade") ||
    pergunta.includes("para deficientes") ||
    pergunta.includes("facilidade de uso") ||
    pergunta.includes("inclusão")
  ) {
    resposta =
      "Pensamos na acessibilidade, incluindo opções de leitura de texto em voz alta e interface clara, para que todos possam interagir facilmente com o sistema.";
  }

  // Perguntas sobre autores
  else if (
    pergunta.includes("nomes") ||
    pergunta.includes("autores do projeto") ||
    pergunta.includes("quem são")
  ) {
    resposta =
      "Os autores do projeto são Nome 1, Nome 2 e Nome 3, que trabalharam juntos para criar esta solução inovadora.";
  }

  // Perguntas variadas sobre o projeto
  else if (
    pergunta.includes("como surgiu") ||
    pergunta.includes("inspiracao") ||
    pergunta.includes("motivaçao") ||
    pergunta.includes("por que fazer")
  ) {
    resposta =
      "O projeto surgiu da necessidade de tornar apresentações escolares mais interativas e acessíveis, utilizando inteligência artificial para facilitar o diálogo com o público.";
  }

  // Perguntas sobre o que diferencia o projeto
  else if (
    pergunta.includes("diferencial") ||
    pergunta.includes("o que tem de novo") ||
    pergunta.includes("inovação")
  ) {
    resposta =
      "O diferencial do projeto é a combinação de automação, reconhecimento de voz e síntese vocal integrada em uma plataforma acessível e fácil de usar.";
  }

  // Perguntas sobre o projeto ser feito por estudantes
  else if (
    pergunta.includes("fez por estudantes") ||
    pergunta.includes("feito por alunos") ||
    pergunta.includes("projeto escolar")
  ) {
    resposta =
      "Sim, este é um projeto desenvolvido por estudantes do ensino médio como parte de uma pesquisa aplicada, focado em inovação tecnológica.";
  }

  // Perguntas sobre o tempo do projeto
  else if (
    pergunta.includes("quanto tempo") ||
    pergunta.includes("duração") ||
    pergunta.includes("tempo para fazer")
  ) {
    resposta =
      "O projeto foi desenvolvido ao longo de vários meses, envolvendo planejamento, codificação, testes e refinamentos até a versão atual.";
  }

  // Perguntas sobre possíveis usos
  else if (
    pergunta.includes("onde usar") ||
    pergunta.includes("aplicações") ||
    pergunta.includes("para que serve")
  ) {
    resposta =
      "Além de apresentações escolares, a tecnologia pode ser aplicada em palestras, eventos, feiras e outros contextos onde a interação automatizada seja útil.";
  }

  // Perguntas sobre customização
  else if (
    pergunta.includes("personalizar") ||
    pergunta.includes("customizar") ||
    pergunta.includes("alterar a ia") ||
    pergunta.includes("mudar respostas")
  ) {
    resposta =
      "No futuro, planejamos permitir personalização da IA, para que cada usuário possa adaptar o assistente ao seu estilo e necessidades.";
  }

  // Perguntas sobre aprendizado da IA
  else if (
    pergunta.includes("aprende") ||
    pergunta.includes("aprendizado") ||
    pergunta.includes("evolui") ||
    pergunta.includes("melhora sozinha")
  ) {
    resposta =
      "Atualmente, a IA simulada não aprende ou evolui sozinha, respondendo apenas com o que foi programado. Mas a integração com APIs reais permitirá aprendizado futuro.";
  }

  // Perguntas sobre voz e idiomas
  else if (
    pergunta.includes("idioma") ||
    pergunta.includes("língua") ||
    pergunta.includes("fala outros idiomas") ||
    pergunta.includes("línguas")
  ) {
    resposta =
      "Neste momento, a IA suporta o idioma português brasileiro, incluindo fala e reconhecimento de voz. Planos futuros incluem suporte a outros idiomas.";
  }

  // Perguntas sobre ajuda ou suporte
  else if (
    pergunta.includes("ajuda") ||
    pergunta.includes("suporte") ||
    pergunta.includes("como usar") ||
    pergunta.includes("dúvidas")
  ) {
    resposta =
      "Se tiver dúvidas, basta perguntar diretamente aqui. Estou programado para ajudar com todas as informações sobre o projeto e seu funcionamento.";
  }

  // Perguntas sobre contato ou redes sociais
  else if (
    pergunta.includes("contato") ||
    pergunta.includes("redes sociais") ||
    pergunta.includes("onde encontrar") ||
    pergunta.includes("falar com")
  ) {
    resposta =
      "Por enquanto, o projeto está disponível online pelo site e backend. Em breve teremos canais oficiais para contato e redes sociais.";
  }

  // Perguntas genéricas ou fora do escopo
  else if (
    pergunta.includes("oi") ||
    pergunta.includes("olá") ||
    pergunta.includes("bom dia") ||
    pergunta.includes("boa tarde") ||
    pergunta.includes("tchau") ||
    pergunta.includes("adeus") ||
    pergunta.includes("valeu")
  ) {
    resposta =
      "Olá! Estou aqui para ajudar com informações sobre o projeto de IA. Pode perguntar o que quiser!";
  }

  // Caso nenhuma condição seja atendida
  else {
    resposta = "Desculpe, não entendi sua pergunta. Pode reformular ou perguntar sobre outro assunto do projeto?";
  }

  respostaDiv.textContent = resposta;

  // Falar a resposta
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(resposta);
  utter.lang = "pt-BR";
  synth.speak(utter);
}
