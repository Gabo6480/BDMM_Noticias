import {request} from './services/xmlhttp-promise.module.js';

let createUserCard = function(user){
    let div = document.createElement('div');
    div.classList.add('user-card');

    //TODO ADD USER PROFILE PICTURE
    // NAME
    // USER TYPE RADIO
    // EDIT
    // DELETE
    
    let u = document.createElement('h5');
    u.classList.add('user-name');
    u.innerText = user.name;

    let email = document.createElement('h5');
    email.classList.add('user-email');
    email.innerText = user.email;

    let userType = document.createElement('h5')
    userType.classList.add('user-type');
    userType.innerText = user.type;

    let editBtn = document.createElement('button');
    editBtn.innerText = "Editar";
    editBtn.addEventListener("click",e=>{
        e.preventDefault();
        //mandar request get para la pagina de edicion
        request({url:'...'})
        .then()
        .catch();
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Eliminar";
    deleteBtn.addEventListener("click",e=>{
        e.preventDefault();
        //mandar request de borrar
        request({url:'...', method:'DELETE', body:{email:user.email}})
        .then(data=>{
            deleteBtn.parentNode.remove();
        })
        .catch();
    });

    div.append(u,email,userType, editBtn, deleteBtn);

    return div;
}

export{createUserCard}