// ======================
// FILTRO DE INSTITUIÇÕES
// ======================

const campoBusca = document.getElementById("campoBusca");
const filtroPublico = document.getElementById("filtroPublico");
const filtroTipo = document.getElementById("filtroTipo");

const cardsInstituicoes = document.querySelectorAll(".card-instituicao");
const contadorInstituicoes = document.querySelector(".contador-instituicoes");

function filtrarInstituicoes() {
  const busca = campoBusca.value.toLowerCase();
  const publicoSelecionado = filtroPublico.value;
  const tipoSelecionado = filtroTipo.value;

  let quantidadeVisivel = 0;

  cardsInstituicoes.forEach(card => {
    const titulo = card.querySelector("h3").textContent.toLowerCase();
    const texto = card.querySelector("p").textContent.toLowerCase();

    const publicoCard = card.dataset.publico;
    const tipoCard = card.dataset.tipo;

    const combinaBusca =
      titulo.includes(busca) ||
      texto.includes(busca);

    const combinaPublico =
      publicoSelecionado === "todos" ||
      publicoSelecionado === publicoCard;

    const combinaTipo =
      tipoSelecionado === "todos" ||
      tipoSelecionado === tipoCard;

    if (combinaBusca && combinaPublico && combinaTipo) {
      card.style.display = "block";
      quantidadeVisivel++;
    } else {
      card.style.display = "none";
    }
  });

  contadorInstituicoes.textContent =
    `${quantidadeVisivel} instituição${quantidadeVisivel !== 1 ? "ões" : ""}`;
}

campoBusca.addEventListener("input", filtrarInstituicoes);
filtroPublico.addEventListener("change", filtrarInstituicoes);
filtroTipo.addEventListener("change", filtrarInstituicoes);

filtrarInstituicoes();


// ======================
// SCROLL SUAVE
// ======================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const destino = document.querySelector(this.getAttribute("href"));

    if (!destino) return;

    e.preventDefault();

    destino.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


// ======================
// SOMBRA DA NAVBAR
// ======================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.style.boxShadow =
    window.scrollY > 20
      ? "0 10px 30px rgba(0,0,0,.08)"
      : "none";
});


// ======================
// ANIMAÇÃO DOS CARDS
// ======================

const observador = new IntersectionObserver(
  entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

document
  .querySelectorAll(
    ".card-passo, .card-instituicao, .card-conteudo"
  )
  .forEach(card => {
    card.classList.add("hidden");
    observador.observe(card);
  });


// ======================
// MODAL DAS INSTITUIÇÕES
// ======================

const modalInstituicao = document.getElementById("modalInstituicao");
const fecharModalInstituicao = document.getElementById("fecharModalInstituicao");

const nomeInstituicaoModal = document.getElementById("nomeInstituicaoModal");
const descricaoInstituicaoModal = document.getElementById("descricaoInstituicaoModal");
const telefoneInstituicaoModal = document.getElementById("telefoneInstituicaoModal");
const enderecoInstituicaoModal = document.getElementById("enderecoInstituicaoModal");
const horarioInstituicaoModal = document.getElementById("horarioInstituicaoModal");

document.querySelectorAll(".abrir-modal-instituicao").forEach(botao => {
  botao.addEventListener("click", () => {
    nomeInstituicaoModal.textContent = botao.dataset.nome;
    descricaoInstituicaoModal.textContent = botao.dataset.descricao;

    if (botao.dataset.nome.includes("CAPS")) {
      telefoneInstituicaoModal.innerHTML =
        `<a href="https://www.google.com/search?q=CAPS+Salvador"
            target="_blank">
            Consulte a unidade CAPS mais próxima.
        </a>`;
    } else {
      telefoneInstituicaoModal.textContent = botao.dataset.telefone;
    }

    enderecoInstituicaoModal.textContent = botao.dataset.endereco;
    horarioInstituicaoModal.textContent = botao.dataset.horario;

    modalInstituicao.classList.add("active");
  });
});

fecharModalInstituicao.addEventListener("click", () => {
  modalInstituicao.classList.remove("active");
});

modalInstituicao.addEventListener("click", e => {
  if (e.target === modalInstituicao) {
    modalInstituicao.classList.remove("active");
  }
});


// ======================
// MODAL DOS CONTEÚDOS
// ======================

const modalConteudo = document.getElementById("modalConteudo");
const fecharModalConteudo = document.getElementById("fecharModalConteudo");

const tituloConteudoModal = document.getElementById("tituloConteudoModal");
const textoConteudoModal = document.getElementById("textoConteudoModal");
const dicaConteudoModal = document.getElementById("dicaConteudoModal");

document.querySelectorAll(".abrir-modal-conteudo").forEach(botao => {
  botao.addEventListener("click", e => {
    e.preventDefault();

    tituloConteudoModal.textContent = botao.dataset.titulo;
    textoConteudoModal.textContent = botao.dataset.texto;
    dicaConteudoModal.textContent = botao.dataset.dica;

    modalConteudo.classList.add("active");
  });
});

fecharModalConteudo.addEventListener("click", () => {
  modalConteudo.classList.remove("active");
});

modalConteudo.addEventListener("click", e => {
  if (e.target === modalConteudo) {
    modalConteudo.classList.remove("active");
  }
});


// ======================
// FAQ
// ======================

const itensFaq = document.querySelectorAll(".item-faq");

itensFaq.forEach(item => {
  const pergunta = item.querySelector(".pergunta-faq");

  pergunta.addEventListener("click", () => {
    itensFaq.forEach(outroItem => {
      if (outroItem !== item) {
        outroItem.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});


// ======================
// FORMULÁRIO DE CONTATO
// ======================

const formContato = document.getElementById("formContato");

formContato.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  console.log({
    nome,
    email,
    mensagem
  });

  alert("Mensagem enviada com sucesso!");

  formContato.reset();
});

// ======================
// MENU HAMBÚRGUER
// ======================

const botaoMenu = document.getElementById("botaoMenu");
const linksNavbar = document.getElementById("linksNavbar");

botaoMenu.addEventListener("click", () => {
  linksNavbar.classList.toggle("ativo");

  const menuAberto = linksNavbar.classList.contains("ativo");

  botaoMenu.innerHTML = menuAberto
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

linksNavbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    linksNavbar.classList.remove("ativo");
    botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});