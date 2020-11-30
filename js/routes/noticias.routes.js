import {url} from './server.routes.js'

const noticiasURL =  `${url}/noticias.routes.php`;
        
const getOne  = id => `${noticiasURL}?action=getOne&id=${id}`;

const getBySeccion = id => `${noticiasURL}?action=getBySeccion&id=${id}`;

const getByReportero = id => `${noticiasURL}?action=getByReportero`;

const getAll = ()=> `${noticiasURL}?action=getAll`;

const getByState = state=> `${noticiasURL}?action=getByState&state=${state}`;

const getByStateSeccion = (id,state)=>`${noticiasURL}?action=getByStateSeccion&id=${id}&state=${state}`;

const getByStateReportero = (id,state)=>`${noticiasURL}?action=getByStateReportero&id=${id}&state=${state}`;

export{
    noticiasURL as post,
    getOne,
    getBySeccion,
    getByReportero,
    getAll,
    getByState,
    getByStateSeccion,
    getByStateReportero
}