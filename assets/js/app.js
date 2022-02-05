cl = console.log;

const fillData = document.getElementById('fillData');
const fname = document.getElementById('fname');
const person = document.getElementById('person');
const mobile = document.getElementById('mobile'); 
const email = document.getElementById('email'); 
const submitBtn = document.getElementById('submit'); 
const uiData = document.getElementById('uiData')
const update = document.getElementById('update'); 

update.style.display = "none";

let inputDataArr = [];

if(localStorage.getItem('storedData')){
    inputDataArr = getUserData()
    templating(inputDataArr);
}
function getUserData(){
    if(localStorage.getItem('storedData')){
        return JSON.parse(localStorage.getItem('storedData'));
        templating(inputDataArr);
    }
}
function uuid() {
    var dt = new Date().getTime(); 
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/* 1)--form call back function--*/
function fillDataHandler(eve){
    eve.preventDefault();
    let inputObj = {
        fname : fname.value,
        person : person.value,
        mobile : mobile.value,
        email : email.value,
        id : uuid(),
    }
    inputDataArr.push(inputObj); 
    
    localStorage.setItem('storedData',JSON.stringify(inputDataArr));
    inputDataArr = getUserData();
    cl(inputDataArr);
    this.reset();
    templating(inputDataArr);   
}
/*--Update data --*/
function onUpdateHandler(){
let getId = localStorage.getItem('setId')
cl(getId)
let getLocalData = getUserData();
getLocalData.forEach(obj =>{
    if(obj.id ===getId){
        obj.fname = fname.value;
        obj.person = person.value;
        obj.mobile = mobile.value;
        obj.email = email.value;
    }
})
localStorage.setItem('storedData',JSON.stringify(getLocalData));
fillData.reset();
update.style.display="none";
submit.style.display="inline-block"
templating(getLocalData);
}

/* ---Edit Data---*/
function onEditHandler(oeh){
    let getId = oeh.getAttribute('data-id');
    localStorage.setItem('setId', getId)
    cl(getId);
    update.style.display = "inline-block";
    submitBtn.style.display = "none"
   let getLocalData = getUserData(); 
    cl(getLocalData);

    let getObj = getLocalData.filter(ldf=>{
        return ldf.id === getId;
    })
    cl(getObj);
    fname.value = getObj[0].fname;
    person.value = getObj[0].person;
    mobile.value = getObj[0].mobile;
    email.value = getObj[0].email;
}
/* ---Delete Data---*/
function onDeleteHandler(odh){
    let deleteId = odh.dataset.id;
    let inputDataArr = getUserData();
    inputDataArr = inputDataArr.filter(tdf =>{
        return tdf.id != deleteId
    })
    localStorage.setItem('storedData',JSON.stringify(inputDataArr))
    templating(inputDataArr);
    window.location.reload();
}
/* 2)--Templating function--*/
function templating(ai){
    let result='';
    ai.forEach((temp,i)=>{
    result += `<tr>
                   <td>${i+1}</td>
                   <td>${temp.fname}</td>
                   <td>${temp.person}</td>
                   <td>${temp.mobile}</td>
                   <td>${temp.email}</td>
                   <td><button class="btn btn-primary" data-id="${temp.id}" onclick="onEditHandler(this)">Edit</button></td>
                  <td><button class="btn btn-danger" data-id="${temp.id}" onclick="onDeleteHandler(this)">Delete</button></td>
                  
                </tr>`
                cl(result);
    })
    uiData.innerHTML=result;
 }
fillData.addEventListener('submit', fillDataHandler);
update.addEventListener('click',onUpdateHandler);

