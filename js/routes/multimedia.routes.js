import {url} from './server.routes.js'

const multimediaURL  =  `${url}/multimedia.routes.php`;

const getById        = id => `${multimediaURL}?action=id&id=${id}`;
        
const getByArticleId = id => `${multimediaURL}?action=article&id=${id}`;

export{
    multimediaURL as post,
    getById,
    getByArticleId
}