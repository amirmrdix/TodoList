const addItemButton = document.querySelector('.addItemButton');
const categoryContainer = document.querySelector('.categoryContainer');
const categoryIcons = document.querySelectorAll('.categoryContainer i');
const input = document.querySelector('input');
const todoContainer = document.querySelector('.todoContainer ul');
const todoItemIcon = document.querySelector('.todoItem i');




addItemButton.addEventListener('click', ev => {
    categoryContainer.classList.toggle('add');
})




categoryIcons.forEach(icon => {

    icon.addEventListener('click', ev => {

        if(input.value == ''){
            categoryContainer.classList.toggle('add');
            addItem()
        }

        else{
            categoryContainer.classList.toggle('add');
            const iconClass = [`${icon.classList[1]}`,`${icon.classList[2]}`]
            addItem(input.value,iconClass)
            input.value = '';
        }

    })

});



document.addEventListener('DOMContentLoaded',getTodo);






function addItem(text,icon,isSave = true) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');
    
    todoItem.innerHTML = `
    <li>${text}</li>
    <i class="fas fa-check-circle"></i>
    <i class="fas fa-edit"></i>
    <i class="fas fa-trash"></i>
    `;

    const catIcon = document.createElement('i')
    catIcon.classList.add('fas')
    catIcon.classList.add(icon[0])
    catIcon.classList.add(icon[1])

    
    todoContainer.appendChild(todoItem);
    todoItem.insertBefore(catIcon,todoItem.childNodes[1])
    const bgColor = getComputedStyle(catIcon).getPropertyValue('background-color');
    todoItem.style.backgroundColor = bgColor;
    

    if(isSave){
        const todoStatus = { completed: false}
        saveTodo(text,icon,todoStatus)
    }
}







todoContainer.addEventListener('click',optionTodo)






function optionTodo(ev) {
    const iconTargeted = ev.target.classList[1];
    const parentTargeted = ev.target.parentNode;


    if(iconTargeted === 'fa-trash') {
        parentTargeted.remove();
        updateTodoStatus(parentTargeted,'delete');
    }


    else if(iconTargeted === 'fa-edit'){
        parentTargeted.childNodes[2].toggleAttribute('contenteditable');
        parentTargeted.classList.toggle('editing');
        updateLI(parentTargeted)
    }


    else if(iconTargeted === 'fa-check-circle') {
        parentTargeted.classList.toggle('completed');
        updateTodoStatus(parentTargeted,'toggle');
    }
}







function saveTodo(text,icon,status) {
    const todoList = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem("todo")) : [];
    const todoItemLocal = {
        text,
        icon,
        status
    }
    todoList.push(todoItemLocal)
    localStorage.setItem('todo',JSON.stringify(todoList))
}





function getTodo() {
    const todoList = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem("todo")) : [];

    todoList.forEach(todo => {
        addItem(todo.text,todo.icon,false)

        if( todo.status && todo.status.completed ){
            const todoItems = todoContainer.getElementsByClassName('todoItem');
            const lastTodoItem = todoItems[todoItems.length -1];

            lastTodoItem.classList.add('completed');
        }

    });
}





function updateTodoStatus(todoItem , action) {
    const todoList = JSON.parse(localStorage.getItem('todo'))


    todoList.forEach(todo => {
        if(todo.text === todoItem.querySelector('li').textContent){


            if(action === 'toggle'){
                todo.status.completed = !todo.status.completed;
            }

            else if(action === 'delete'){
                const index = todoList.indexOf(todo);
                todoList.splice(index,1);
            }


            localStorage.setItem('todo',JSON.stringify(todoList))

            return;
        }
    });
}



function updateLI(parentTargeted){
    const todoList = JSON.parse(localStorage.getItem("todo"));
    const todoItems = document.querySelectorAll('.todoItem');
    const index = Array.from(todoItems).indexOf(parentTargeted)

    if(index !== -1){
        const updatedText = parentTargeted.querySelector('li').innerHTML;
        todoList[index].text = updatedText


        localStorage.setItem("todo",JSON.stringify(todoList))
    }

}