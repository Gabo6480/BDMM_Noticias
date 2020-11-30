import * as SeccionesRoutes from './../routes/secciones.routes.js';

const get = ()=>{
    return fetch(SeccionesRoutes.get);
}

const getActive = ()=>{
    return fetch(SeccionesRoutes.getActive());
}

const add = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"add"
        }
    }

    return fetch(SeccionesRoutes.post, params);
}

const edit = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"edit"
        }
    }

    return fetch(SeccionesRoutes.post, params);
}

const remove = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"remove"
        }
    }

    return fetch(SeccionesRoutes.post, params);
}

export{
    get,
    getActive,
    add,
    edit,
    remove
}