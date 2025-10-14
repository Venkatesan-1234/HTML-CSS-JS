const todoList=[{name:'make dinner',duedate:'2022-12-22'},
    {name:'wash dishes',duedate:'2022-12-22'}
];

rendertodolist();
function rendertodolist() {
let todoListHTML='';

for (let i=0;i<todoList.length;i++) {
    const todoobject=todoList[i];
    const name=todoobject.name;
    const duedate=todoobject.duedate;


    const html=`<div>${name}</div><div>${duedate}</div>
    <button onclick="
    todoList.splice(${i},1);
    rendertodolist();" class="delete-todo-button">
    Delete
    </button>`
    todoListHTML+=html;
}

document.querySelector('.js-todo-list').innerHTML=todoListHTML;
}
function addTodo()  {
    const inputelement=document.querySelector('.js-name-input');
    const name=inputelement.value;

    const dateinputelement=document.querySelector('.js-due-date-input');
    const duedate=dateinputelement.value;

    todoList.push({name,duedate});

    inputelement.value='';
    rendertodolist(); 
}