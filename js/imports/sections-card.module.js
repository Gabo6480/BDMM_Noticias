let createSectionCard = function(post){

    //TODO: cambiar las los nombres de las propiedades
    return `<tr post-id='${post.ID}'>
    <td class='section-title'>${post.Nombre} 
    </td><td class='section-color'><div style="background-color: #${post.Color};width:100%;height:100%;">&nbsp</div>
    </td><td class='actions'>
        <button class='btn btn-outline-success button-up'><i class='fas fa-arrow-up'></i></button>
        <button class='btn btn-outline-primary button-down'><i class='fas fa-arrow-down'></i></button>
        <button class='btn btn-outline-primary button-edit'><i class='fas fa-edit'></i></button>
        <button class='btn btn-outline-danger button-delete'><i class='far fa-trash-alt'></i></button>
    </td></tr>`;
}

export{createSectionCard}