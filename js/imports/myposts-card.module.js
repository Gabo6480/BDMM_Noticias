import {getById} from '../routes/multimedia.routes.js';
let createMyPostCard = function(post){

    //TODO: cambiar las los nombres de las propiedades
    return "<tr post-id='" + post.ID
    + "'> <th scope='row'><img class='user-picture' src='" + getById(post.Foto)
    + "' /></th><td class='article-title'>" + post.Titulo
    + "</td><td class='article-section'>" +  post.Seccion
    + "</td><td class='article-state'>" + post.Estado
    + "</td><td class='actions'>"
    + (post.Estado == "publicada" ? "" : "<button class='btn btn-outline-primary button-edit'><i class='fas fa-edit'></i></button>")
    + (post.Estado == "en redaccion" ? "<button class='btn btn-outline-success button-send' disabled><i class='fas fa-arrow-up'></i></button>" : "")
    + (post.Estado == "publicada" ? "" : "<button class='btn btn-outline-danger button-delete'><i class='far fa-trash-alt'></i></button>")
    + "</td></tr>";
}

export{createMyPostCard}