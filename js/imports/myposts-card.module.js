let createMyPostCard = function(post){

    //TODO: cambiar las los nombres de las propiedades
    return "<tr post-id='" + post.id
    + "'> <th scope='row'><img class='user-picture' src='" + post.picture
    + "' /></th><td class='article-title'>" + post.name 
    + "</td><td class='article-section'>" + post.email 
    + "</td><td class='article-state'>" + post.type 
    + "</td><td class='actions'>"
    + "<button class='btn btn-outline-primary button-edit'><i class='fas fa-edit'></i></button>"
    + "<button class='btn btn-outline-success button-send' disabled><i class='fas fa-arrow-up'></i></button>"
    + "</td></tr>";
}

export{createMyPostCard}