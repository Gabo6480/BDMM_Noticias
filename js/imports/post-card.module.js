import {getById} from '../routes/multimedia.routes.js';

let createPostCard = function(post){

    //TODO: cambiar las los nombres de las propiedades
    return "<tr post-id='" + post.ID
    + "'> <th scope='row'><img class='user-picture' src='" + getById(post.Foto)
    + "' /></th><td class='post-title'>" + post.Titulo 
    + "</td><td class='post-author'>" + post.NombreReportero
    +"</td><td class='post-section'>" + post.NombreSeccion
    + "</td><td class='actions'>"
    + "<button class='btn btn-outline-primary button-see'><i class='fas fa-sign-in-alt'></i></button>"
    + "<button class='btn btn-outline-success button-publish'><i class='fas fa-clipboard-check'></i></button>"
    + "</td></tr>";
}

export{createPostCard}