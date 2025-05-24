const inputElement = document.getElementById("inputValue");
const listElement = document.getElementById("list");
let isEditClicked = false;
let localStorageData = JSON.parse(localStorage.getItem("itemList"));
let itemArray = localStorageData ? [...localStorageData] : [];

if (localStorageData) {
  localStorageData.forEach((item) => {
    const newListItem = document.createElement("li");

    const listTextSpan = document.createElement("span");
    listTextSpan.textContent = item;
    newListItem.appendChild(listTextSpan);

    const newEditBtn = document.createElement("button");
    newEditBtn.textContent = "Edit";
    newEditBtn.onclick = (e) => handleEdit(e);

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.textContent = "Delete";
    newDeleteBtn.onclick = (e) => handleDelete(e);

    newListItem.appendChild(newEditBtn);
    newListItem.appendChild(newDeleteBtn);

    listElement.appendChild(newListItem);
  });
}

function handleSubmit() {
  if (inputElement.value.trim().length === 0) return;

  const newListItem = document.createElement("li");
  //   newListItem.textContent = inputElement.value;

  const listTextSpan = document.createElement("span");
  listTextSpan.textContent = inputElement.value;
  newListItem.appendChild(listTextSpan);

  const newEditBtn = document.createElement("button");
  newEditBtn.textContent = "Edit";
  newEditBtn.onclick = (e) => handleEdit(e);

  const newDeleteBtn = document.createElement("button");
  newDeleteBtn.textContent = "Delete";
  newDeleteBtn.onclick = (e) => handleDelete(e);

  newListItem.appendChild(newEditBtn);
  newListItem.appendChild(newDeleteBtn);

  inputElement.value && listElement.appendChild(newListItem);
  itemArray.push(listTextSpan.textContent);
  updateLocalStorage(itemArray);
  inputElement.value = "";
}

function handleDelete(e) {
  const listItem = e.target.parentElement;
  const listItemTextSpan = listItem.querySelector("span");

  itemArray = itemArray.filter((val) => val != listItemTextSpan.textContent);
  updateLocalStorage(itemArray);

  e.target.parentElement.remove();
  if (isEditClicked) {
    isEditClicked = !isEditClicked;
  }
}

function handleEdit(e) {
  if (isEditClicked) return;

  const listItem = e.target.parentElement;
  const listItemTextSpan = listItem.querySelector("span");
  inputElement.value = listItemTextSpan.textContent;

  const editSubmitBtn = document.createElement("button");
  editSubmitBtn.textContent = "Save";
  editSubmitBtn.onclick = (e) => handleEditSubmit(e);

  isEditClicked = true;

  e.target.parentElement.appendChild(editSubmitBtn);
}

function handleEditSubmit(e) {
  const listItem = e.target.parentElement;
  const listItemTextSpan = listItem.querySelector("span");
  oldText = listItemTextSpan.textContent;
  listItemTextSpan.textContent = inputElement.value;
  itemArray = itemArray.map((str) => str.replace(oldText, inputElement.value));
  updateLocalStorage(itemArray);
  e.target.remove();
  inputElement.value = "";
  isEditClicked = false;
}

function updateLocalStorage(itemArray) {
  localStorage.setItem("itemList", JSON.stringify(itemArray));
}
