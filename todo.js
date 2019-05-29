const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODO_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
  // console.dir(event.target.parentNode); //.target
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // make a clean ToDO
  // filter는  array의 모든 아이템을 통해 함수를 실행하고 그리고 true인 아이템들만 가지고 새로운 array를 만들고
  const cleanToDos = toDos.filter(function(toDo){
    //parseInt는  스트링을 숫자로 바꿀수 있다.
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
} 
  
function saveToDos() {
  // localStorage.setItem(TODO_LS, toDos);
  // 자바스크립트는 로컬스트로지에 있는 모든 데이터를 string으로 저장 하려고 한다. obeject 가 string 되게 만들려면 
  // 그러기 위햐선 트릭 JSON.stringify를 쓴다.
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"); // html in js
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "✖";
  delBtn.title = "Delete a list";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn); // button inside the li
  li.appendChild(span); // span inside the li
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // input을 누르면 클리어
} 

function loadTodos() {
  const loadedToDos = localStorage.getItem(TODO_LS)
  if(loadedToDos !== null) {
    // JSON 는 또한 스트링을 오브젝트로 변환시켜준다.
    const parsedToDos = JSON.parse(loadedToDos);
    //console.log(parsedToDos);
    // forEach는 기본적으로 함수를 실행하는데, array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 준다.
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });   
  } 
}

function init() {
  loadTodos();  
  toDoForm.addEventListener("submit", handleSubmit)
}

init();