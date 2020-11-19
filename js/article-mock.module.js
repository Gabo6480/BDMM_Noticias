import {request} from './services/xmlhttp-promise.module.js';
import * as comms from './imports/article-comments.module.js'
import * as parser from './imports/article-content-parser.module.js'
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
        $("#article-content").html(parser.parseArticle(object[0].content));

        $('[data-toggle="tooltip"]').tooltip()
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
//$(document).one('focus.autoExpand', 'textarea.autoExpand', function(){
//    var savedValue = this.value;
//    this.value = '';
//    this.baseScrollHeight = this.scrollHeight;
//    this.value = savedValue;
//}).on('input.autoExpand', 'textarea.autoExpand', function(){
//    var minRows = this.getAttribute('data-min-rows')|0, rows;
//    this.rows = minRows;
//    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 24 - 1);
//    this.rows = minRows + rows;
//});

$(document).on('keyup keypress', 'textarea.autoExpand', function() {
    $(this).height(0);
    $(this).height(this.scrollHeight);
});