let createUserCard = function(user){
    return "<tr user-id='" + user.ID
    + "'> <th scope='row'><img class='user-picture' src='" + user.Foto
    + "' /></th><td class='user-name'>" + user.Nombre 
    + "</td><td class='user-email'>" + user.Correo 
    +"</td><td class='user-type'>" + user.Rol 
    + "</td><td class='actions'><button class='btn btn-outline-danger button-delete'><i class='fas fa-user-minus'></i></button><button class='btn btn-outline-secondary button-edit'><i class='fas fa-edit'></i></button></td></tr>";
}

export{createUserCard}