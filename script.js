"use strict";

const form = document.querySelector("form");
const list = document.querySelector(".list");
const btn = document.querySelector(".submit");

let data = [];
let counter = 1;
let isEditing = false;

function render(newdata) {
  list.innerHTML = "";
  newdata.forEach((element) => {
    list.innerHTML += ` 
    <li id=${element.id}>
    <p>${element.value}</p>
    <button class="libutton" onclick="doDelete(this)">del</button>
    <button class="libutton" onclick="edit(this)">edit</button>
    <button class="libutton" onclick="sort(this)">sort</button>
    </li>
    `;
  });
  data = newdata;
  console.log(data);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isEditing) {
    const value = form.children[0].value;
    const obj = {
      id: counter,
      value: value,
    };
    data.push(obj);
    render(data);
    // console.log(data);
  }
  if (isEditing) {
    data.forEach((element) => {
      if (element.id === +editId) element.value = form.children[0].value;
    });
    render(data);
    btn.innerHTML = "add";
    isEditing = false;
    // console.log(data);
  }
  form.reset();
  counter++;
  // console.log(data);
});

function doDelete(e) {
  const deleteId = e.parentElement.id;
  const newArr = data.filter((element) => {
    return element.id !== +deleteId;
  });
  render(newArr);
}

let editId;
function edit(e) {
  btn.innerHTML = "edit";
  form.children[0].value = e.parentElement.children[0].innerHTML;
  editId = e.parentElement.id;
  isEditing = true;
}
function sort(){
  data.sort((a, b) => {
    return b.id - a.id;
  })
  render(data)
}