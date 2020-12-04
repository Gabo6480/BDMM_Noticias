import * as CommRoutes from './../routes/comentarios.routes.js';

/**
 * @function getByArticle
 * @param {String | Number} id
 */
const getByArticle = id=>{
    return fetch(CommRoutes.getByArticle(id));
}

/**
 * @function addComment
 * @param {FormData} body
 */
const addComment = body=>{

    body.append("action", "add");
    const params = {
        method:"POST",
        body:body
    }

    return fetch(CommRoutes.post, params);
}

/**
 * @function edit
 * @param {FormData} body
 */
const edit = body=>{
    body.append("action", "edit");
    const params = {
        method:"POST",
        body:body
    }

    return fetch(CommRoutes.post, params);
}

/**
 * @function remove
 * @param {FormData} body
 */
const removeComment = body=>{
    body.append("action", "remove");
    const params = {
        method:"POST",
        body:body
    }

    return fetch(CommRoutes.post, params);
}

export{
    getByArticle,
    addComment,
    edit,
    removeComment
}