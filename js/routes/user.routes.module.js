import {url} from './server.routes.js'

let getAll  = `${url}/users`       ;

let create  = `${url}/users-create`;

let read    = `${url}/users-read`  ;

let update  = `${url}/users-edit`  ;

let destroy = `${url}/users-delete`;

let login   = `${url}/users-login` ;

export{getAll, create, read, update, destroy, login}