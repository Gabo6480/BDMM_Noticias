import {url} from './server.routes.js'

const usuarioURL =  `${url}/usuario.routes.php`;

const getOne        = id => `${usuarioURL}?action=getOne&id=${id}`;
        
const getRol        = id => `${usuarioURL}?action=getRol&id=${id}`;
      
const getAll        = () => `${usuarioURL}?action=getAll`;

const getFoto       = id => `${usuarioURL}?action=getAvatar&id=${id}`;

const getRolActivos = id =>`${usuarioURL}?action=getRolActivos&id=${id}`;

const getAllActive  = () => `${usuarioURL}?action=getActivos`;

const search = (nombre, rol) =>{
    let s = `${usuarioURL}?action=search&busqueda=${nombre}`;
    if(rol){
        s+=`&rol=${rol}`;
    }
    return s;
}

export{
    usuarioURL as post,
    getFoto,
    getOne,
    getRol,
    getAll,
    getRolActivos,
    getAllActive,
    search
}