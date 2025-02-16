//1
const inp = document.getElementById("taskInput");
const btn = document.getElementById("btn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (task, i) => `
            <li>
                ${task.text}
                <button onclick="markAsDone(${i})">Виконане</button>
                <button onclick="markAsNotDone(${i})">Не виконане</button>
                <span style="${task.done ? "color: green;" : "color: red;"}">${
        task.done ? "Виконано" : "Не виконано"
      }</span>
            </li>
        `
    )
    .join("");
}

btn.addEventListener("click", () => {
  if (inp.value.trim()) {
    tasks.push({ text: inp.value, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inp.value = "";
    renderTasks();
  } else {
    alert("Введіть значення!");
  }
});

clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.clear();
});

function markAsDone(value) {
  tasks[value].done = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function markAsNotDone(value) {
  tasks[value].done = false;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();

// 2 (1 user)
function saveUser() {
  const user = {
    login: document.getElementById("login").value,
    password: document.getElementById("password").value,
  };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("password", JSON.stringify(password));
  console.log("Користувач збережений!");
}

function checkUser() {
  const storedPass = JSON.parse(localStorage.getItem("password"));
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  console.log(password);
  console.log(login);
  if (
    storedUser &&
    storedUser.login === login &&
    storedUser.password === password
  ) {
    document.getElementById("userMessage").innerText = "Вхід успішний!";
  } else {
    document.getElementById("userMessage").innerText =
      "Невірний логін або пароль";
  }
}

//3
function addBookmark() {
  const url = document.getElementById("bookmark").value;
  if (!url) return;
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
}

function renderBookmarks() {
  const list = document.getElementById("bookmarksList");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.forEach((url, index) => {
    list.innerHTML += `<li>${url} <button onclick="deleteBookmark(${index})">Видалити</button></li>`;
  });
}

function deleteBookmark(index) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
}
renderBookmarks();

//4
function addContact() {
  const contact = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
  };
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

function renderContacts() {
  const list = document.getElementById("contactsList");
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.forEach((contact, index) => {
    list.innerHTML += `<li>${contact.name} ${contact.surname}, ${contact.phone}, ${contact.email} 
          <button onclick="deleteContact(${index})">Видалити</button></li>`;
  });
}

function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}
renderContacts();
