import * as Editor from './../routes/editor.routes.module.js'
import request from './../services/xmlhttp-promise.module.js'

function allUsers(callback,error){
    request({url: Editor.getAll})
    .then(data=>callback(data))
    .catch(err=>error(err));
}

function createUser(body,callback,error){
    let hdrs = new Map();
    hdrs["Content-Type"] = "application/json";

    request({url: Editor.create, method:"POST", headers:map, body:body})
    .then(data=>callback(data))
    .catch(err=>error(err));
}

function editUser(callback,error){
    request({url: Editor.update, method:"PUT"})
    .then(data=>callback(data))
    .catch(err=>error(err));
}

function deleteUser(callback,error){
    request({url: Editor.destroy, method:"DELETE"})
    .then(data=>callback(data))
    .catch(err=>error(err));
}

function login(body,callback,error){
    request({url: Editor.login, method:"POST", body:body})
    .then(data=>callback(data))
    .catch(err=>error(err));
}

export{allUsers, createUser, editUser, deleteUser, login};