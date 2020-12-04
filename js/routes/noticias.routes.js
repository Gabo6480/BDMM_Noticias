import {url} from './server.routes.js'

const noticiasURL =  `${url}/noticias.routes.php`;
        
const getOne  = id => `${noticiasURL}?action=getOne&id=${id}`;

const getBySeccion = id => `${noticiasURL}?action=getBySeccion&id=${id}`;

const getByReportero = id => `${noticiasURL}?action=getByReportero&id=${id}`;

const getAll = (val)=> `${noticiasURL}?action=getAll`;

const getByState = state=> `${noticiasURL}?action=getByState&state=${state}`;

const getByStateSeccion = (id,state)=>`${noticiasURL}?action=getByStateSeccion&id=${id}&state=${state}`;

const getByStateReportero = (id,state)=>`${noticiasURL}?action=getByStateReportero&id=${id}&state=${state}`;

const getRelated = palabras =>`${noticiasURL}?action=getRelated&palabras=${palabras}`;

const getRelatedD = (palabras,id) =>`${noticiasURL}?action=getRelatedD&palabras=${palabras}&id=${id}`;

const getRelatedDSL = (palabras,id) =>`${noticiasURL}?action=getRelatedDSL&palabras=${palabras}&id=${id}`;


const search = (titulo, seccion, estado, reportero)=>{
    let b = `${noticiasURL}?action=search&busqueda=${titulo}`
    
    if(seccion){
        b+=`&seccion=${seccion}`;
    }
    if(estado){
        b+=`&estado=${estado}`;
    }
    if(reportero){
        b+=`&reportero=${reportero}`;
    }
    return b;
};

const popular = ()=>`${noticiasURL}?action=popular`;

export{
    noticiasURL as post,
    getOne,
    getBySeccion,
    getByReportero,
    getAll,
    getByState,
    getByStateSeccion,
    getByStateReportero,
    getRelated,
    getRelatedD,
    getRelatedDSL,
    search,
    popular
}