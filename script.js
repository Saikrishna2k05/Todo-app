let todos = [];

window.onload = function() {
    render();
}

let addBtn = document.querySelector("#add-todo");
let input=document.getElementById('inp');
input.addEventListener('keydown', (event)=>{
    if(event.key==='Enter')
    {
        add();
    }
})
addBtn.addEventListener('click', () => {
    add();
});
function add()
{
    let taskText = document.querySelector("input").value;
    if (taskText == "" || taskText.trim() == "") {
        alert("Please enter a valid task");
    } else {
        todos.push({
            title: taskText
        });
        render();
        document.querySelector("input").value = ""; 
    }
}
function addTodo(todo, index) {
    let divEl = document.createElement('div');
    divEl.className = "a-todo";
    let task = document.createElement("span");
    const content= todo.title;
    task.className = "task";
    task.innerHTML = content;
    let iconsDiv=document.createElement("div");
    iconsDiv.className='iconsDiv';
    let button = document.createElement("button");
    let editBtn=document.createElement("button");
    button.addEventListener('click', () => {
        deleteTodo(index);
    });

    let input = document.createElement("input");
    input.className='editInput';
    input.type = "text";
    divEl.appendChild(input);
    input.style.display = "none";
      const saveIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" style="color: black"
      fill="currentColor" class="bi bi-save2" viewBox="0 0 16 16">
      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5
      a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5
      0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2
      a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
    </svg>`;

    const editIcon=`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" style="color: black;" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
`;
    editBtn.addEventListener('click',()=>{
            if (input.style.display === "none") {
      input.value = task.textContent;
      task.style.display = "none";
      input.style.display = "inline";
      input.focus();
      editBtn.innerHTML = saveIcon;
    } else {
      if(input.value=="")
      {
        deleteTodo(index);
        return;
      }
      task.textContent = input.value;
      todos[index].title = input.value;
      task.style.display = "inline";
      input.style.display = "none";
      editBtn.innerHTML = editIcon;
    }

    })



     
    button.className = "delBtn";
    button.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" style="color: black;" 
  class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
`;
    button.setAttribute("taskNo", index);
    editBtn.className = "editBtn";
    editBtn.innerHTML=editIcon;
    iconsDiv.appendChild(editBtn);
    iconsDiv.appendChild(button);

    divEl.appendChild(task);
    divEl.appendChild(iconsDiv);
    return divEl;
}

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}

function render() {
    let parentDiv = document.querySelector("#parentTodos");
    parentDiv.innerHTML = ""; 
    if (todos.length === 0) {
        let message = document.createElement("div");
        message.className = "no-tasks-message";
        message.innerHTML = "No tasks yet. Add your first task!";
        parentDiv.appendChild(message);
    } else {
        todos.forEach((todo, index) => {
            let divEl = addTodo(todo, index);
            parentDiv.appendChild(divEl);
        });
    }
}
