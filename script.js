const input = document.getElementById("input-text");
const lista = document.querySelector(".lista");
const btn = document.querySelector(".button");
const textProgresso = document.querySelector(".progresso");

//cria o elemento na lista conforme o valor do input
//e cria o elemento q armazena o span com o X para remover
function generateList() {
  if (input.value === "") {
    alert("Digite Algo para adicionar a lista");
  } else {
    const element = document.createElement("li");
    const span = document.createElement("span");
    element.innerText = input.value;
    span.classList.add("remove");
    lista.appendChild(element);
    element.appendChild(span);
    input.value = "";
    progress();
    saveData();
    input.focus();
  }
}

//verifica se cliquei em li ou em um elemento com class .remove
//assim removendo ou marcando o elemento da lista
function chekedList(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    progress();
    saveData();
  } else if (event.target.classList.contains("remove")) {
    event.target.parentElement.remove("remove");
    progress();
    saveData();
  }
}

//eventos de click e de Pressionar Enter
btn.addEventListener("click", generateList);
lista.addEventListener("click", chekedList);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    generateList();
    progress();
  }
});

//salva no localstorage
function saveData() {
  localStorage.setItem("data", lista.innerHTML);
}
//mostra / ativa o que foi salvo no HTML
function showList() {
  lista.innerHTML = localStorage.getItem("data");
}
showList();

//nivel de progresso
function progress() {
  const total = Array.from(lista.children);
  const completed = document.querySelector(".progresso-cont");
  let checked = 0;
  total.filter((checkado) => {
    if (checkado.classList.contains("checked") === true) checked++;
    textProgresso.innerText = `${checked} / ${total.length}`;
  });
  if (checked === total.length && total.length !== 0) {
    completed.classList.add("full");
  } else if (total.length === 0) {
    textProgresso.innerText = "";
  } else {
    completed.classList.remove("full");
  }
  console.log(total.length);
}
progress();
