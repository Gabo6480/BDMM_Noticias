import {url} from './server.routes.js'

const usuarioURL =  `${url}/usuario.routes.php`;

const getOne        = id => `${usuarioURL}?action=getOne&id=${id}`;
        
const getRol        = id => `${usuarioURL}?action=getRol&id=${id}`;
      
const getAll        = () => `${usuarioURL}?action=getAll`;

const getFoto     = id => `${usuarioURL}?action=getAvatar&id=${id}`;

const getRolActivos = id =>`${usuarioURL}?action=getRolActivos&id=${id}`;

const getAllActive  = () => `${usuarioURL}?action=getActivos`;
export{
    usuarioURL as post,
    getFoto,
    getOne,
    getRol,
    getAll,
    getRolActivos,
    getAllActive
}