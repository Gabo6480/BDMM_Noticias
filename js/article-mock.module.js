import {request} from './services/xmlhttp-promise.module.js';
import * as comms from './article-comments.module.js'
$(document).ready(function(){

    loadDataToWindow();
    
});

function loadDataToWindow(){
    //traer articulo
    request({url:'/mock/articulos.json'})
    .then(data=>{
        let object = JSON.parse(data);
        $("#article-title").text(object[0].title);
        $("#article-img").attr("src", object[0].img);
        $("#article-content").html(object[0].content);
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

//Autoexpandir el textarea
$(document).one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    }).on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 24   );
        this.rows = minRows + rows;
    });