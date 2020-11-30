import {url} from './server.routes.js'

const commsURL =  `${url}/comentario.routes.php`;
        
const getByArticle  = id => `${commsURL}?action=getByArticle&id=${id}`;

export{
    commsURL as post,
    getByArticle
}