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

const getAll = ()=>{
    return fetch(NoticiasRoutes.getAll());
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
    noticiasURL as post,
    getOne,
    getBySeccion,
    getByReportero,
    getAll,
    getByState,
    getByStateSeccion,
    getByStateReportero,
    add,
    edit,
    remove,
    login
}