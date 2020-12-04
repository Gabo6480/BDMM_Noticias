let createComment = function(comment){
    let div = document.createElement('div');
    div.classList.add('comment');

    div.setAttribute('comment-id', comment.id);

    let img = document.createElement('img');
    img.classList.add('user-picture');
    img.classList.add('float-left');
    img.setAttribute("src", comment.picture);

    let user = document.createElement('h5');
    user.classList.add('comment-user');
    user.innerText = comment.user;

    let content = document.createElement('p');
    content.classList.add('comment-content');
    content.innerText = comment.content;


    div.append(img, user,content);

    return div;
}

let createMainComment = function(comment){
    let div = createComment(comment);

    let responses = document.createElement('p');
    responses.classList.add('comment-answer');
    responses.innerText = comment.answers.length > 0 ? comment.answers.length + " respuestas" : "Responder";

    let comments = document.createElement('div');
    comments.classList.add('comment-comments');

    for(var i = 0; i < comment.answers.length; i++){
        comments.append(createComment(comment.answers[i]));
    }

    let commenttext = document.createElement('div');
    commenttext.classList.add("comment-form");
    commenttext.setAttribute('comment-id', comment.id);
    commenttext.setAttribute('user-id', comment.userId);

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