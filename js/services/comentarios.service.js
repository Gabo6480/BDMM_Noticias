import * as CommRoutes from './../routes/comentarios.routes.js';

const getByArticle = id=>{
    return fetch(CommRoutes.getByArticle(id));
}

const addComment = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"add"
        }
    }

    return fetch(CommRoutes.post, params);
}

const edit = body=>{
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
    getByArticle,
    addComment,
    edit,
    remove
}