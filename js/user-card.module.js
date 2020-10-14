import {request} from './services/xmlhttp-promise.module.js';

let createUserCard = function(user){
    return "<tr> <th scope='row'>img</th><td class='user-name'>" + user.name 
    + "</td><td class='user-email'>" + user.email 
    +"</td><td class='user-type'>" + user.type 
    + "</td><td><button class='btn btn-outline-danger button-delete'><i class='fas fa-user-minus'></i></button><button class='btn btn-outline-secondary button-edit'><i class='fas fa-edit'></i></button></td></tr>";
}

export{createUserCard}