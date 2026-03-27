const input = document.getElementById("input-text");
const lista = document.querySelector(".lista");
const btn = document.querySelector(".button");
const textProgresso = document.querySelector(".progresso");

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

btn.addEventListener("click", generateList);
lista.addEventListener("click", chekedList);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    generateList();
    progress();
  }
});

function saveData() {
  localStorage.setItem("data", lista.innerHTML);
}

function showList() {
  lista.innerHTML = localStorage.getItem("data");
}
showList();

function progress() {
  const total = Array.from(lista.children);
  const completed = document.querySelector(".progresso-cont");
  let checked = 0;
  total.filter((checkado) => {
    if (checkado.classList.contains("checked") === true) checked++;
    textProgresso.innerText = `${checked} / ${total.length}`;
  });
  console.log(checked);
  if (checked === total.length) {
    completed.classList.add("full");
  } else {
    completed.classList.remove("full");
  }
}
progress();
