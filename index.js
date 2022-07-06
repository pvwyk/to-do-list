let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span class="span2">${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
  taskAmount();
  let spanList = Array.from(document.getElementsByClassName("span2"));

  spanList.forEach((box, i) => {
    box.addEventListener("dblclick", function handleClick(event) {
      const modal2 = document.getElementById("myModal2");
      console.log(modal2);
      console.log(i);

      let getEventId = i;
      modal2.style.display = "block";

      itemClicked = event;
      console.log("item clicked", event);
      let e = event.target.childNodes[0].data;
      console.log(e);
      updateUi(event, getEventId);
      //event.target.childNodes[0].data = "testing";

      //console.log(event.target.childNodes[0].data);

      // form.value = e.parentElement.previousElementSibling.innerHTML;
      // e.parentElement.parentElement.remove();
      //open modal
      //edit data
    });
  });
}

//function updateLi()
function updateToDo(index, newValue) {
  // todoItems = localStorage.getItem("todoItems");

  // todoItems[index].text = newValue;
  // todoItems[index].id = Date.now();
  const todo = {
    text: newValue,
    checked: false,
    id: Date.now(),
  };
  console.log("todoItems updates", todoItems[index]);
  todoItems[index] = todo;
  renderTodo(todoItems[index]);
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  // updateToDo(1, "tester1234");
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  renderTodo(todoItems[index]);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todo.deleted = true;
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  modal.style.display = "none";
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItems");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});

//Double click to update

// let uPtodo = document.getElementById("update-to-do");
// uPtodo.addEventListener("click", updateToDo);

//get dblclick id

let modal2 = document.getElementById("myModal2");

function updateUi(event, getEventId) {
  //get modal 2
  // let modal2 = document.getElementById("myModal2");

  let event_id = getEventId;

  // Get the button that opens the modal
  let btn2 = document.getElementById("myBtn2");

  // Get the <span> element that closes the modal
  let span2 = document.getElementsByClassName("close")[0];
  let modalInput = document.getElementsByClassName("js-todo-input2");
  console.log(modalInput);
  modalInput[0].value = event.target.childNodes[0].data;
  // modalInput[0].text = event.target.childNodes[0].data;

  // updateToDo(2, modalInput[0].text);

  // When the user clicks on the element, open the modal

  // modal2.style.display = "block";

  // When the user clicks on <span> (x), close the modal

  const form2 = document.querySelector(".update-form");
  form2.addEventListener("submit", (event) => {
    modal2.style.display = "none";
    // event.preventDefault();
    const input = document.querySelector(".js-todo-input2");
    modal.style.display = "none";
    const text = input.value.trim();
    console.log(text);
    if (text !== "") {
      updateToDo(event_id, text);
      console.log("Done with updateToDo");
      input.value = "";
      input.focus();
    }
  });
}

//get the day
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let day = weekday[d.getDay()];
//document.getElementById("date").innerHTML = day;

//th, nd and so on
const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// test code

// const fortnightAway = new Date(+new Date() + 12096e5);
// const date = fortnightAway.getDate();
const fortnightAway = new Date();
const date = fortnightAway.getDate();

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][fortnightAway.getMonth()];

document.getElementById("date1").innerHTML = `${day},`;
document.getElementById("date2").innerHTML = `${date}<sup>${nth(date)}</sup> `;
document.getElementById("date3").innerHTML = `${month}`;

// test
const dates = [...Array(32).keys()].slice(1).map((i) => `${i}${nth(i)}`);
//console.log(dates.join(", "));

//number of tasks
function taskAmount() {
  let totalTasks = todoItems.length;
  document.getElementById("item-list").innerHTML = `${totalTasks} Tasks`;
  //let checkedTasks = document.getElementById("item-list") = `${totalTasks}`

  console.log(totalTasks);
  //   console.log(checkedTasks);
}

// Get the modal 1
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};
