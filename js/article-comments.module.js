let createComment = function(comment){
    let div = document.createElement('div');
    div.classList.add('comment');

    //TODO ADD USER PROFILE PICTURE
    let user = document.createElement('h5');
    user.classList.add('comment-user');
    user.innerText = comment.user;

    let content = document.createElement('p');
    content.classList.add('comment-content');
    content.innerText = comment.content;

    div.append(user,content);

    return div;
}

export{createComment}