import {url} from './server.routes.js';

const likesURL =  `${url}/likes.routes.php`;

const count    = id => `${likesURL}?accion=count&id=${id}`;

const comprobar    = (noticia, usuario) => `${likesURL}?accion=comprobar&noticia=${noticia}&usuario=${usuario}`;

export{
    likesURL as post,
    count,
    comprobar
}