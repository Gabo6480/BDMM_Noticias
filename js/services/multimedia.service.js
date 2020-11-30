import * as MultimediaRoutes from './../routes/multimedia.routes.js';

const getById = id=>{
    return fetch(MultimediaRoutes.getById(id));
}

const getByArticleId = id=>{
    return fetch(MultimediaRoutes.getByArticleId(id));
}

const add = body=>{

    const params = {
        method:"POST",
        body:{
            ...body,
            action:'add'
        }
    }

    return fetch(MultimediaRoutes.post, params);
}

const remove = body=>{

    const params = {
        method:"POST",
        body:{
            ...body,
            action:'remove'
        }
    }
    
    return fetch(MultimediaRoutes.post, params);
}

export{
    getById,
    getByArticleId,
    add,
    remove
}