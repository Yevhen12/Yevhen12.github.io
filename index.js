const input = document.querySelector("#input")
const list = document.querySelector("#list__wrapper")
const btn = document.querySelector("#btn")
const total = document.querySelector("#total")
const body = document.querySelector("body")


let counter = 0;
let arrayList = []
let localArray = null

btn.addEventListener("click", (e) => {
    if (input.value === '') return
    CreateDeleteElems(input.value);
    input.value = '';
})

input.addEventListener("keydown", (e) => {
    if (input.value === '') return
    if (e.keyCode === 13 ) {
        CreateDeleteElems(input.value);
        input.value = '';
    }   
})


function CreateArray (arr, val){
    arr.push(val);
    console.log(arrayList)
    return arr;
}


function CreateDeleteElems(val) {
//<i class="fas fa-times"></i>
    const li = document.createElement('li');
    const deleteElem = document.createElement('button');
    const img = document.createElement('img');
    const span = document.createElement('p');
    const button = document.createElement('button');
    const circle = document.createElement('i');
    const helpDiv = document.createElement('div');

    circle.className = "far fa-circle"
    li.className = "list__item";
    span.className = "list__text";
    button.className = "list__button"
    helpDiv.className = "inner__block"


    list.appendChild(li);
    li.appendChild(helpDiv);
    helpDiv.appendChild(button);
    button.appendChild(circle);
    helpDiv.appendChild(span);
    span.textContent = val;
    counter = counter + 1;

    deleteElem.className = "delete__elem";
    li.appendChild(deleteElem);
    img.className = "delete__img";
    deleteElem.appendChild(img);
    img.src = "img/delete.png";
    total.textContent = ` ${counter}`;



    let condition = 0;
    const check = document.createElement("i");
    button.appendChild(check);

    button.addEventListener("click", (e) => {
        if(!condition){
            check.className = "fas fa-check";
            condition = 1;
            counter = counter - 1;
            total.textContent = ` ${counter}`
            span.classList.remove("list__text");
            span.classList.add("list__text1");
        }
        else {
            check.classList.remove("fas", "fa-check");
            condition = 0;
            counter = counter + 1;
            total.textContent = ` ${counter}`
            span.classList.remove("list__text1");
            span.classList.add("list__text");
        }
    })

    li.onmouseover = function() {
        deleteElem.style.display = "inline-block";
        img.style.display = "inline-block";
    }
    li.onmouseout = function () {
        deleteElem.style.display = "none";
        img.style.display = "none";
    }


    deleteElem.addEventListener('click', (e) => {
        list.removeChild(li);
        if(check.classList.contains("fas", "fa-check")){
        total.textContent = ` ${counter}`;
        } else {
            counter = counter - 1;
            total.textContent = ` ${counter}`;
        }
    })

    CreateArray(arrayList, span);
    storageListItem();
}
function storageListItem() {
    localStorage.setItem('arr', JSON.stringify(arrayList));
}





const complitedBtn = document.querySelector("#complited");


complitedBtn.addEventListener("click", (e) => {
    complitedTasks();
})

hoverConditionBtn(complitedBtn);

function complitedTasks (){
    AllTasks();
    arrayList.forEach((elem) =>{
        if(!(elem.classList.contains("list__text1"))){
           let parent =  elem.parentElement;
           let li = parent.parentElement;
            li.classList.remove("list__item")
            li.classList.add("list__item__hide");
        }
    })
}


const AllBtn = document.querySelector("#all");

hoverConditionBtn(AllBtn);


AllBtn.addEventListener("click", (e)=> {
    AllTasks();
})


function AllTasks (){
    arrayList.forEach((elem) =>{
        let parent =  elem.parentElement;
        let li = parent.parentElement;
        if((li.classList.contains("list__item__hide"))){
            li.classList.remove("list__item__hide")
            li.classList.add("list__item");
        }
    })
}

const ActiveBtn = document.querySelector("#active");

hoverConditionBtn(ActiveBtn);

ActiveBtn.addEventListener("click", (e)=> {
    ActiveTasks();
})


function ActiveTasks (){
    AllTasks();
    arrayList.forEach((elem) =>{
        let parent =  elem.parentElement;
        let li = parent.parentElement;
        if((elem.classList.contains("list__text1"))){
            li.classList.remove("list__text1")
            li.classList.add("list__item__hide");
        }
    })
}

function hoverConditionBtn(btn){
    btn.onmouseover = () => {
        btn.classList.add("borderBtn");
    }
    btn.onmouseout = () => {
        btn.classList.remove("borderBtn");
    }
}

const clearComplited = document.querySelector("#clear__complited");

clearComplited.addEventListener("click", (e)=> {
    clearComplitedTasks();
})

hoverConditionBtn(clearComplited);

function filterArray (el) {
    let parent =  el.parentElement;
    let li = parent.parentElement;
    if(!(el.classList.contains("list__text1"))){
        return el;
    }
    else{
        list.removeChild(li);
    }
}

function arrTasks (){
    AllTasks();
    let arr = arrayList.filter(filterArray)
    return arr;
}

function clearComplitedTasks () {
    arrayList = arrTasks();
}

clearComplitedTasks();

const theme = document.querySelector("#theme")

if(!localStorage.theme){
    localStorage.theme = "ligth";
 }
 
 document.body.className =  localStorage.theme;

let countAnimate = 5;
let counterBackgroundOpacity = 0;
theme.addEventListener("click", (e) => {
    body.classList.toggle("dark")
    let bool = body.classList.contains("dark") ? true : false
    if(bool){
        localStorage.theme = "dark";
        counterBackgroundOpacity = 0;
        changeThemeDark();
        transTheme();
    } else {
        localStorage.theme = "ligth";
        counterBackgroundOpacity = 0;
        changeThemeLigth();
        transTheme();
    }
})


function changeThemeDark (){
    const circleChangeTheme = document.querySelector("#circleChangeTheme");
    circleChangeTheme.style.left = countAnimate + "px"
    if(countAnimate < 50 && countAnimate > 0){
        countAnimate = countAnimate + 5;
        requestAnimationFrame(changeThemeDark);
    }
}


function changeThemeLigth (){
    const circleChangeTheme = document.querySelector("#circleChangeTheme");
    circleChangeTheme.style.left = countAnimate + "px"
    if(countAnimate > 5){
        countAnimate = countAnimate - 5;
        requestAnimationFrame(changeThemeLigth);
    }
}

function transTheme() {
    body.style.opacity = counterBackgroundOpacity;
    if(counterBackgroundOpacity < 1){
        counterBackgroundOpacity = counterBackgroundOpacity + 0.05
        requestAnimationFrame(transTheme);
    }
}

