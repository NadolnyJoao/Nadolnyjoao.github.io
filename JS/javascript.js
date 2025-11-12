// Remove duplicate closeNav
const imagens = [
{
  src:  "Imagem/Archetype.png",
  titulo: "Archetype",
  data: "Fevereiro 2025",
  descricao: "ArcheType é um jogo infantil criado para um público de 10 a 12 anos, com o objetivo educacional de ensinar sobre a história da arte, e mostrar para as crianças de forma divertida, a evolução da arte no planeta terra. O jogo é do estilo plataforma 2D, ambientado em diversas épocas de pinturas famosas, onde o jogador, deve passar por cada fase até completar a visita ao museu de história da arte.",
  largura: "300px",
  altura: "auto"
},
{
  src: "imagem/BoraRoom.png",
  titulo: "Bora Bill Room",
  data: "Março de 2024",
  descricao: "O jogo se passa em uma realidade alternativa com inspirações no movimento surrealista. Sendo um jogo de quebra cabeça e desafios lógicos, o jogador deve enfrentar os objetivos para chegar a conclusão do jogo por meio de dois finais, um sendo óbvio, portanto o final ruim, e o outro, o final bom é difícil de ser encontrado, exigindo muita capacidade de raciocínio por parte do jogador. Por conta desses fatores, o jogo foi pensado para adolescentes a partir de 15 anos.",
  largura: "300px",
  altura: "auto"
},
{
  src:  "imagem/MysteryMannor.png",
  titulo: "Mystery Mannor",
  data: "Março de 2024",
  descricao: "Mystery Manor é um jogo de puzzle onde o protagonista misteriosamente acorda em uma mansão e tem que procurar uma saída. O jogo foi desenvolvido para um público de 12 a 15 anos, interessados em jogos de investigação e quebra cabeças, com o intuito de desenvolver o raciocínio lógico dos adolescentes de forma divertida e cativante.",
  largura: "300px",
  altura: "auto"
},
{
  src: "imagem/SuperCoocking.png",
  titulo: "Super Coocking",
  data: "agosto de 2024",
  descricao: "O jogo foi pensado como um simulador de culinária, onde o jogador pode escolher entre diversas receitas para agradar os clientes de um renomado restaurante.  O jogo requer reflexos rápidos e concentração total do jogador para concluir as receitas de forma mais eficiente possível. Esse jogo é pensado para crianças de 10 a adolescentes de 17 anos, atendendo uma grande variedade de públicos por ser um jogo simples de entender e divertido de jogar",
  largura: "300px",
  altura: "auto",
  link: "Menu.html"
}
]
let indiceAtual = 0;
const imagensPorTela = 3;

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function mudarFonte(fonte) {
  document.body.style.fontFamily = fonte;
}

function exibirImagens() {
  const container = document.getElementById("carrossel-imagens");
  container.innerHTML = "";

  for (let i = 0; i < imagensPorTela; i++) {
    const index = (indiceAtual + i) % imagens.length;
    const imagemInfo = imagens[index];

    const img = document.createElement("img");
    img.src = imagemInfo.src;
    img.alt = imagemInfo.titulo;
    img.title = imagemInfo.descricao;

    img.onclick = function () {
      // Check if this is Super Coocking
      if (imagemInfo.titulo === "Super Coocking" && imagemInfo.link) {
        window.location.href = imagemInfo.link;
        return;
      }

      const popup = window.open("", "popup_index", "width=850,height=700,resizable=yes,scrollbars=yes");

      if (popup) {
        popup.document.write(`
          <html>
          <head>
              <title>${imagemInfo.titulo}</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      padding: 20px;
                  }
                  img {
                      width: ${imagemInfo.largura};
                      height: ${imagemInfo.altura};
                      border-radius: 8px;
                      display: block;
                      margin-bottom: 15px;
                  }
                  h1 {
                      margin-top: 0;
                  }
                  .info {
                      margin-bottom: 10px;
                  }
              </style>
          </head>
          <body>
              <h1>${imagemInfo.titulo}</h1>
              <div class="info"><strong>Data de criação:</strong> ${imagemInfo.data}</div>
              <img src="${imagemInfo.src}" alt="${imagemInfo.titulo}">
              <p><strong>Descrição:</strong> ${imagemInfo.descricao}</p>
          </body>
          </html>
        `);
        popup.document.close();
        popup.focus();
      } else {
        alert("Por favor, permita pop-ups para visualizar as informações.");
      }
    };
    container.appendChild(img);
  }
}

function mudarImagens(direcao) {
  indiceAtual = (indiceAtual + direcao * imagensPorTela + imagens.length) % imagens.length;
  exibirImagens();
}

document.addEventListener("DOMContentLoaded", exibirImagens);