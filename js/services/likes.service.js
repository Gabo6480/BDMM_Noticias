import * as LikesRoutes from './../routes/likes.routes.js';

const comprobar = (noticia, usuario)=>{
    return fetch(LikesRoutes.comprobar(noticia,usuario));
}

const count = id=>{
    return fetch(LikesRoutes.count(id));
}

const add = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"add"
        }
    }

    return fetch(LikesRoutes.post, params);
}

const remove = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"remove"
        }
    }

    return fetch(LikesRoutes.post, params);
}

export{
    count,
    add,
    remove,
    comprobar
}