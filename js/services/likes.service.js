import * as LikesRoutes from './../routes/likes.routes.js';

const comprobar = (noticia, usuario)=>{
    return fetch(LikesRoutes.comprobar(noticia,usuario));
}

const count = id=>{
    return fetch(LikesRoutes.count(id));
}

const add = body=>{

    body.append('action','add');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(LikesRoutes.post, params);
}

const remove = body=>{
    body.append('action','remove');
    const params = {
        method:"POST",
        body:body
    }
    return fetch(LikesRoutes.post, params);
}

export{
    count,
    add,
    remove,
    comprobar
}