let createUserCard = function(user){
    return "<tr user-id='" + user.id
    + "'> <th scope='row'><img class='user-picture' src='" + user.picture
    + "' /></th><td class='user-name'>" + user.name 
    + "</td><td class='user-email'>" + user.email 
    +"</td><td class='user-type'>" + user.type 
    + "</td><td class='actions'><button class='btn btn-outline-danger button-delete'><i class='fas fa-user-minus'></i></button><button class='btn btn-outline-secondary button-edit'><i class='fas fa-edit'></i></button></td></tr>";
}

export{createUserCard}