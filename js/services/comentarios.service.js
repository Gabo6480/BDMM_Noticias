import * as CommRoutes from './../routes/comentarios.routes.js';

const getByArticle = id=>{
    return fetch(getByArticle(id));
}

const add = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"add"
        }
    }

    return fetch(CommRoutes.post, params);
}

const remove = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"edit"
        }
    }

    return fetch(CommRoutes.post, params);
}

const remove = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"remove"
        }
    }

    return fetch(CommRoutes.post, params);
}

export{
    count,
    add,
    remove
}