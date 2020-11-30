import {url} from './server.routes.js'

const seccionesURL =  `${url}/secciones.routes.php`;

const get        = id => `${seccionesURL}?action=get`;
        
const getActive  = id => `${seccionesURL}?action=getActive`;

export{
    seccionesURL as post,
    get,
    getActive
}