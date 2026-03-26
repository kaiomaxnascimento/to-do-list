const input = document.getElementById("input-text");
const lista = document.querySelector(".lista");
const btn = document.querySelector(".button");

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
    saveData();
    input.focus();
  }
}

function chekedList(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    saveData();
  } else if (event.target.classList.contains("remove")) {
    event.target.parentElement.remove("remove");
    saveData();
  }
}

btn.addEventListener("click", generateList);
lista.addEventListener("click", chekedList);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") generateList();
});

function saveData() {
  localStorage.setItem("data", lista.innerHTML);
}

function showList() {
  lista.innerHTML = localStorage.getItem("data");
}
showList();
