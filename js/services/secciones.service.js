import * as SeccionesRoutes from './../routes/secciones.routes.js';

const get = ()=>{
    return fetch(SeccionesRoutes.get);
}

const getActive = ()=>{
    return fetch(SeccionesRoutes.getActive());
}

const search = search=>{
    return fetch(SeccionesRoutes.search(search));
}

const byId = id=>{
    return fetch(SeccionesRoutes.getById(id));
}

const add = body=>{
    body.append('action', 'add');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(SeccionesRoutes.post, params);
}

const edit = body=>{

    body.append('action', 'edit');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(SeccionesRoutes.post, params);
}

const remove = body=>{
    body.append('action', 'remove');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(SeccionesRoutes.post, params);
}

export{
    get,
    getActive,
    byId,
    search,
    add,
    edit,
    remove
}