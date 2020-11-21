let createPostCard = function(post){

    //TODO: cambiar las los nombres de las propiedades
    return "<tr post-id='" + post.id
    + "'> <th scope='row'><img class='user-picture' src='" + post.picture
    + "' /></th><td class='post-title'>" + post.name 
    + "</td><td class='post-author'>" + post.email 
    +"</td><td class='post-section'>" + post.type 
    + "</td><td class='actions'>"
    + "<button class='btn btn-outline-primary button-see'><i class='fas fa-sign-in-alt'></i></i></button>"
    + "<button class='btn btn-outline-success button-publish'><i class='fas fa-clipboard-check'></i></button>"
    + "</td></tr>";
}

export{createPostCard}