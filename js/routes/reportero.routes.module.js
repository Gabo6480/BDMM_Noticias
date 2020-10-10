import {url} from './server.routes.js'

let getAll  = `${url}/reps`       ;

let create  = `${url}/reps-create`;

let read    = `${url}/reps-read`  ;

let update  = `${url}/reps-edit`  ;

let destroy = `${url}/reps-delete`;

let login   = `${url}/reps-login` ;

export{getAll, create, read, update, destroy, login}