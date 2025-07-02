async function responderIA() {
  const pergunta = document.getElementById("pergunta").value;
  const respostaDiv = document.getElementById("resposta");

  respostaDiv.textContent = "Pensando...";

  try {
    const response = await fetch("https://69b9db4a-b0c4-43da-8df2-81ad60fe8156-00-cxogwc5x7dgc.kirk.replit.dev/perguntar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: pergunta }),
    });

    const data = await response.json();
    const resposta = data.resposta;

    respostaDiv.textContent = resposta;

    // Fala a resposta
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(resposta);
    utter.lang = "pt-BR";
    synth.speak(utter);
  } catch (err) {
    respostaDiv.textContent = "Erro ao conectar com a IA.";
  }
}
