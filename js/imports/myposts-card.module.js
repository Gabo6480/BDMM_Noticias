import {getById} from '../routes/multimedia.routes.js';
let createMyPostCard = function(post){
    
    return `<tr post-id='${post.ID}'> 
    <th scope='row'><img class='user-picture' src='${getById(post.Foto)}'/>
    </th><td class='article-title'> ${post.Titulo}
    </td><td class='article-section'> ${post.NombreSeccion}
    </td><td class='article-state'> ${post.Estado}
    </td><td class='actions'>
    <button class='btn btn-outline-primary button-edit' ${post.Estado == 'publicada'? 'disabled' :''}><i class='fas fa-edit'></i></button>
    <button class='btn btn-outline-success button-send' ${post.Estado == 'en redaccion'? '': 'disabled'}><i class='fas fa-arrow-up'></i></button>
    <button class='btn btn-outline-danger button-delete' ${post.Estado == 'publicada'? 'disabled' :''}><i class='far fa-trash-alt'></i></button>
    </td></tr>`;
}

export{createMyPostCard}