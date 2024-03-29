let createSectionCard = function(post){
    return `<tr post-id='${post.ID}' orden-post='${post.Orden}'>
     <td class='section-title'>${post.Nombre}
     </td><td class='section-color' style='background-color :#${post.Color};'>
     </td><td class='section-order'>${post.Orden}
     </td><td class='actions'>
     <button class='btn btn-outline-success button-up'><i class='fas fa-arrow-up'></i></button>
     <button class='btn btn-outline-primary button-down'><i class='fas fa-arrow-down'></i></button>
     <button class='btn btn-outline-primary button-edit'><i class='fas fa-edit'></i></button>
     <button class='btn btn-outline-danger button-delete'><i class='far fa-trash-alt'></i></button>
     </td></tr>`;
}

export{createSectionCard}