document.getElementById('sendButton').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const responseContainer = document.getElementById('responseContainer');

  if (!userInput.trim()) {
    alert('Digite uma pergunta antes de enviar.');
    return;
  }

  responseContainer.innerHTML = 'Carregando resposta...';

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAiiL6_B1KxAsbqfRseqCLyAYxG6mrvwk8', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: userInput }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error('Erro na solicitação à API.');
    }

    const data = await response.json();
    const output = data.contents[0]?.parts.map(part => part.text).join(' ') || 'Sem resposta';
    responseContainer.innerHTML = `<p>${output}</p>`;
  } catch (error) {
    responseContainer.innerHTML = `<p>Erro: ${error.message}</p>`;
  }
});
