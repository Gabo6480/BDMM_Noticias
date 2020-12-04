import * as MultimediaRoutes from './../routes/multimedia.routes.js';

const getById = id=>{
    return fetch(MultimediaRoutes.getById(id));
}

const getByArticleId = id=>{
    return fetch(MultimediaRoutes.getByArticleId(id));
}

const add = body=>{

    body.append('action','add');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(MultimediaRoutes.post, params);
}

const remove = body=>{

    body.append('action','remove');
    const params = {
        method:"POST",
        body:body
    }
    
    return fetch(MultimediaRoutes.post, params);
}

export{
    getById,
    getByArticleId,
    add,
    remove
}