import {createUserCard} from './user-card.module.js'
import {request} from './services/xmlhttp-promise.module.js';

function loadData(){
    let sr = document.querySelector('.search-results');
    request({url:'/mock/usuarios.json'})
    .then(usersJSON=>{
        let users = JSON.parse(usersJSON);
        users.forEach(user=>{
            sr.appendChild(createUserCard(user));
        });
    })
    .catch(err=>{
        console.error("Fallo la request de usuarios "+err)
    });
}

window.onload = function(){
    loadData()
}