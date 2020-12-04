import {url} from './server.routes.js'

const seccionesURL =  `${url}/secciones.routes.php`;

const get        = id => `${seccionesURL}?action=get`;
        
const getActive  = id => `${seccionesURL}?action=getActive`;

const search = search =>`${seccionesURL}?action=search&search=${search}`;

const getById  = id => `${seccionesURL}?action=byid&id=${id}`;

const incrementar = id=> `${seccionesURL}?action=increment`;

const decrementar = id=> `${seccionesURL}>action=decrement`;

export{
    seccionesURL as post,
    get,
    getActive,
    getById,
    search,
    incrementar,
    decrementar
}