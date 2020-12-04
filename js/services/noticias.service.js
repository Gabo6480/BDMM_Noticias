import * as NoticiasRoutes from './../routes/noticias.routes.js';
        
const getOne  = id =>{
    return fetch(NoticiasRoutes.getOne(id));
};

const getBySeccion = id => {
    return fetch(NoticiasRoutes.getBySeccion(id));
};

const getByReportero = id =>{
    return fetch(NoticiasRoutes.getByReportero(id));
};

const getAll = (val) => {
    return fetch(NoticiasRoutes.getAll(val));
};

const getByState = state=>{
    return fetch(NoticiasRoutes.getByState(state));
};

const getByStateSeccion = (id,state)=>{
    return fetch(NoticiasRoutes.getByStateSeccion(id,state));  
};

const getByStateReportero = (id,state)=>{
    return fetch(NoticiasRoutes.getByStateReportero(id,state));
};

const getRelated = (palabras)=>{
    return fetch(NoticiasRoutes.getRelated(palabras));
}

const getRelatedD = (palabras, id)=>{
    return fetch(NoticiasRoutes.getRelatedD(palabras, id));
}

const getRelatedDSL = (palabras,id)=>{
    return fetch(NoticiasRoutes.getRelatedDSL(palabras, id));
}

const search = (busqueda, seccion, estado, reportero)=>{
    return fetch(NoticiasRoutes.search(busqueda,seccion,estado,reportero));
}

const popular = ()=>{
    return fetch(NoticiasRoutes.popular());
}

const add = body=>{
    body.append('action','add');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(NoticiasRoutes.post, params);
}

const edit = body=>{
    body.append('action','edit');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(NoticiasRoutes.post, params);
}

const remove = body=>{
    body.append('action','remove');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(NoticiasRoutes.post, params);
}

const cambiarEstado = body=>{
    body.append('action','estado');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(NoticiasRoutes.post, params);
}

const publicar = id=>{
    body.append('action','publicar');
    const params = {
        method:"POST",
        body:body
    }

    return fetch(NoticiasRoutes.post, params);
}

export{
    getOne,
    getBySeccion,
    getByReportero,
    getAll,
    getByState,
    getByStateSeccion,
    getByStateReportero,
    getRelated,
    getRelatedD,
    getRelatedDSL,
    add,
    edit,
    remove,
    search,
    popular,
    cambiarEstado,
    publicar
}