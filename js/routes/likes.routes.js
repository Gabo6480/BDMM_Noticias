import {url} from './server.routes.js';

const likesURL =  `${url}/likes.routes.php`;

const count    = id => `${likesURL}?id=${id}`;

export{
    likesURL as post,
    count,
}