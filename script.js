window.addEventListener('load', function() {
  // Elementos do personalizador
  const canvas = document.getElementById('shoeCanvas');
  const ctx = canvas.getContext('2d');

  let bodyImage = new Image();
  let soleImage = new Image();

  // Caminhos para as imagens base (ajuste conforme a localização dos arquivos)
  bodyImage.src = 'baseBody.png';
  soleImage.src = 'baseSole.png';

  let bodyColor = '#ffffff';
  let soleColor = '#000000';
  let bodyTexture = null;
  let soleTexture = null;

  // Função que desenha o calçado no canvas principal
  function drawShoe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o corpo do calçado
    if (bodyImage.complete) {
      ctx.save();
      ctx.drawImage(bodyImage, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = bodyColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      if (bodyTexture) {
        ctx.drawImage(bodyTexture, 0, 0, canvas.width, canvas.height);
      }
      ctx.restore();
    }

    // Desenha a sola do calçado
    if (soleImage.complete) {
      ctx.save();
      ctx.drawImage(soleImage, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = soleColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      if (soleTexture) {
        ctx.drawImage(soleTexture, 0, 0, canvas.width, canvas.height);
      }
      ctx.restore();
    }
    // Atualiza o preview do concurso com o desenho atual
    updateContestPreview();
  }

  bodyImage.onload = drawShoe;
  soleImage.onload = drawShoe;

  // Eventos para aplicar alterações no corpo e sola
  document.getElementById('applyBody').addEventListener('click', function() {
    bodyColor = document.getElementById('colorBody').value;
    const textureBodyValue = document.getElementById('textureBody').value;
    if (textureBodyValue) {
      bodyTexture = new Image();
      bodyTexture.src = textureBodyValue;
      bodyTexture.onload = drawShoe;
    } else {
      bodyTexture = null;
      drawShoe();
    }
  });

  document.getElementById('applySole').addEventListener('click', function() {
    soleColor = document.getElementById('colorSole').value;
    const textureSoleValue = document.getElementById('textureSole').value;
    if (textureSoleValue) {
      soleTexture = new Image();
      soleTexture.src = textureSoleValue;
      soleTexture.onload = drawShoe;
    } else {
      soleTexture = null;
      drawShoe();
    }
  });

  // Botão para baixar o design final
  document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'design_calçado.png';
    link.href = canvas.toDataURL();
    link.click();
  });

  // --- Sistema de Concurso ---
  const contestForm = document.getElementById('contestForm');
  const contestPreview = document.getElementById('contestPreview');
  const contestResult = document.getElementById('contestResult');
  const contestCtx = contestPreview.getContext('2d');

  // Função para atualizar o preview do concurso (cópia do canvas principal)
  function updateContestPreview() {
    contestCtx.clearRect(0, 0, contestPreview.width, contestPreview.height);
    // Desenha uma versão redimensionada do canvas principal no preview
    contestCtx.drawImage(canvas, 0, 0, contestPreview.width, contestPreview.height);
  }

  // Inicializa o preview logo após o carregamento
  updateContestPreview();

  // Evento para tratar o envio do concurso
  contestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coleta a imagem (do preview) e o texto da ideia
    const imageData = contestPreview.toDataURL();
    const ideaText = document.getElementById('contestText').value.trim();

    if (!ideaText) {
      alert("Por favor, descreva sua ideia.");
      return;
    }

    // Aqui você poderia enviar os dados para um servidor via AJAX ou fetch.
    // Neste exemplo, apenas mostramos uma mensagem de sucesso.
    console.log("Imagem do concurso:", imageData);
    console.log("Ideia do usuário:", ideaText);

    // Exibe a mensagem de resultado e limpa o formulário
    contestForm.classList.add('hidden');
    contestResult.classList.remove('hidden');
  });
});

