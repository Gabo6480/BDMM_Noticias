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

const add = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"add"
        }
    }

    return fetch(NoticiasRoutes.post, params);
}

const edit = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"edit"
        }
    }

    return fetch(NoticiasRoutes.post, params);
}

const remove = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"remove"
        }
    }

    return fetch(NoticiasRoutes.post, params);
}

const login = body=>{
    const params = {
        method:"POST",
        body:{
            ...body,
            "action":"login"
        }
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
    login
}