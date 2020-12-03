import * as UserRoutes from './../routes/usuario.routes.js';

import {getFoto} from './../routes/usuario.routes.js';

const getAll = ()=>{
    return fetch(UserRoutes.getAll());
}

const getAllActive=()=>{
    return fetch(UserRoutes.getAllActive());
}

const getRol = id=>{
    return fetch(UserRoutes.getRol(id));
}

const getRolActive = id=>{
    return fetch(UserRoutes.getRolActivos(id));
}

const getOne = id=>{
    return fetch(UserRoutes.getOne(id));
}

const getAvatar = id=>{

    let path = getFoto(id);
    return fetch(path);
}

const search = (nombre, rol)=>{
    return fetch(UserRoutes.search(nombre,rol));
}

const add= body=>{
    body.set('action','add');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(UserRoutes.post, params);
}

const edit = body=>{

    body.set('action','edit');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(UserRoutes.post, params);
}

const remove = body=>{
    body.set('action','remove');
    const params = {
        method:"POST",
        body:body
    }

    console.log("REMOVER");
    return fetch(UserRoutes.post, params);
}

const login = body=>{
    body.set('action','login');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(UserRoutes.post, params);
}

export{
    getAll,
    getAllActive,
    getRol,
    getOne,
    getRolActive,
    getAvatar,
    add,
    edit,
    remove,
    login,
    search
}