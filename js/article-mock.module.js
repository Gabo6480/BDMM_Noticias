import {request} from './services/xmlhttp-promise.module.js';
import * as comms from './article-comments.module.js'
window.onload = function(){

    loadDataToWindow();
    
}

function loadDataToWindow(){
    //traer articulo
    request({url:'/mock/articulos.json'})
    .then(data=>{
        let object = JSON.parse(data);
        document.querySelector('#article-title').innerText = object[0].title;
        document.querySelector('#article-img').src = object[0].img;
        document.querySelector('#article-content').innerHTML = object[0].content;
    })
    .catch(err=>{
        console.error("No se encontro el articulo");
    });
    //traer comentarios
    request({url:'/mock/comentarios.json'})
    .then(commentsJson =>{
        let arr = JSON.parse(commentsJson);
        let comments = document.querySelector('#comments');
        arr.forEach(data=>{
            comments.append(comms.createComment(data));
        });
    })
    .catch(err=>{
        console.error("No se pudieron traer los comentarios "+err)
    });
}