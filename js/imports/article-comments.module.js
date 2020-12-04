let createComment = function(comment, deletable){
    let div = document.createElement('div');
    div.classList.add('comment');

    div.setAttribute('comment-id', comment.id);

    let img = document.createElement('img');
    img.classList.add('user-picture');
    img.classList.add('float-left');
    img.setAttribute("src", comment.foto);

    let user = document.createElement('h5');
    user.classList.add('comment-user');
    user.innerText = comment.nombre;

    let content = document.createElement('p');
    content.classList.add('comment-content');
    content.innerText = comment.contenido;

    div.append(img, user,content);

    if(deletable == true){
        div.append(`<button class='btn btn-outline-danger button-delete float-right'><i class='far fa-trash-alt'></i></button>`);
    }

    return div;
}

let createMainComment = function(comment, deleteable){
    let div = createComment(comment, deleteable);

    let responses = document.createElement('p');
    responses.classList.add('comment-answer');
    responses.innerText = comment.respuestas.length > 0 ? comment.respuestas.length + " respuestas" : "Responder";

    let comments = document.createElement('div');
    comments.classList.add('comment-comments');

    for(var i = 0; i < comment.respuestas.length; i++){
        comments.append(createComment(comment.respuestas[i], deleteable));
    }

    let commenttext = document.createElement('div');
    commenttext.classList.add("comment-form");
    commenttext.setAttribute('comment-id', comment.id);
    commenttext.setAttribute('user-id', comment.usuario);

    let textarea = document.createElement('textarea');
    textarea.classList.add("comment-text");
    textarea.classList.add("autoExpand");
    textarea.setAttribute("placeholder", "Escribe tu comentario aqui...")

    let button = document.createElement('button');
    button.classList.add("comment-button");
    button.innerText = "Enviar";

    commenttext.append(textarea, button);

    comments.append(commenttext);

    div.append(responses, comments);

    return div;
}

export{createComment}
export{createMainComment}