import {url} from './server.routes.js'

let getAll  = `${url}/editor`       ;

let create  = `${url}/editor-create`;

let read    = `${url}/editor-read`  ;

let update  = `${url}/editor-edit`  ;

let destroy = `${url}/editor-delete`;

let login   = `${url}/editor-login` ;

export{getAll, create, read, update, destroy, login}