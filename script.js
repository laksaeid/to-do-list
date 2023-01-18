"use strict";

const form = document.querySelector("form");
const list = document.querySelector(".list");
const btn = document.querySelector(".submit");
const sortBtn = document.getElementById('sort');

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
    <button class="libutton" onclick="moveUp(this)">move up</button>
    <button class="libutton" onclick="moveDown(this)">move down</button>
    </li>
    `;
  });
  // <button class="libutton" onclick="sort(this)">sort</button>
  data = newdata;
  // console.log(data);
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
sortBtn.addEventListener('click', sort);
function sort(e) {
  e.preventDefault();
console.log(e);
  data.sort((a, b) => {
    return b.id - a.id;
  })
  render(data)
}
function moveUp(btn) {
  const moveUpId = btn.parentElement.id;
  // console.log(moveUp);
  data.map((value, index) => {
  //  console.log(value.id,moveUpId);
    if (value.id === +moveUpId) {
      let temp = data[index];
      data[index] = data[index - 1];
      data[index - 1] = temp;
    }
 })
  render(data);
}
function moveDown(btn) {
  const moveDownId = btn.parentElement.id;
  // data.map((value, index) => {
    
  // })
  // console.log(moveDownId);
  // data.map((value, index) => {
    // console.log(index + 1);
    // if (value.id === +moveDownId && index + 1 < data.length ) {
      // let newIndex = index + 1;
      // // console.log(data[index],data[newIndex]);
      // let temp = data[index + 1];
      // data[index + 1] = data[index];
      // data[index] = temp
      // let temp = data[index]
      // data[index] = data[index + 1];
      // data[index + 1] = temp;
      // console.log(data[index],temp);
      // data.splice()
      
      // }
      // })
  if (+moveDownId < data.length) {
    data[+moveDownId - 1] = data.splice(+moveDownId, 1, data[+moveDownId - 1])[0]
  }
  console.log(data);
  render(data);
}

// let nnn = [1, 2, 3, [4, 5, 6], 4];