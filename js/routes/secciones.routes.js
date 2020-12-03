import {url} from './server.routes.js'

const seccionesURL =  `${url}/secciones.routes.php`;

const get        = id => `${seccionesURL}?action=get`;
        
const getActive  = id => `${seccionesURL}?action=getActive`;

const search = search =>`${seccionesURL}?action=search&search=${search}`;

export{
    seccionesURL as post,
    get,
    getActive,
    search
}