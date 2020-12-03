import * as comms from './imports/article-comments.module.js'
import * as parser from './imports/article-content-parser.module.js'

import {createCarousel} from './imports/carousel-creator.module.js'

import {getOne, getRelatedDSL} from './services/noticias.service.js';
import {getByArticle} from './services/comentarios.service.js';
import {getById} from './routes/multimedia.routes.js';
import {count, add, remove} from './services/likes.service.js';

$(document).ready(function(){

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    loadDataToWindow(id || 1);

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.article-img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $("#like-button").click(function(){
        if($(this).hasClass("liked"))
            $(this).removeClass("liked");
        else
            $(this).addClass("liked")
    });
});

function loadDataToWindow(id){

    //traer articulo
    getOne(id)
    .then(res => res.json())
    .then(data=>{
        $("#article-title").text(data.Titulo);
        $("#article-description").text(data.Resumen);
        $("#article-img").attr("src", getById(data.Foto));
        $("#article-content").html(parser.parseArticle(data.Contenido));
        $("#article-keywords").text(data.Palabras);

        $("#article-info").append("<p id='article-section'>" + data.Seccion + "</p>");
        $("#article-info").append("<p>" + data.Fecha + "</p>");
        $("#article-info").append("<p class='editor-editable'>" + data.Ubicacion + "</p>");
        $("#article-info").append("<p id='article-author'>" + data.Escritor + "</p>");

        $('[data-toggle="tooltip"]').tooltip();

        getRelatedDSL(data.Palabras,data.ID)
        .then(res=>res.json())
        .then(relatedArticles=>{
            var carousel = {
                title:"Articulos Relacionados",
                cards:relatedArticles
            }

            $("#related-articles").append(createCarousel(carousel));
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>{
        console.log("No se encontro el articulo");
        console.log(err);
    });

    //traer comentarios
    getByArticle(id)
    .then(res => res.json())
    .then(data =>{
        let comments = document.querySelector('#comments');
        data.forEach(element=>{
            comments.append(comms.createMainComment(element));
        });
    })
    .catch(err=>{
        console.error("No se pudieron traer los comentarios "+err)
    });

    count(id)
    .then(res=>res.json())
    .then(data=>{
        $('#like-number').text(data.RESULT);
    })
    .catch(err=>console.log(err))
}

$(document).on('keyup keypress', 'textarea.autoExpand', function() {
    $(this).height(0);
    $(this).height(this.scrollHeight);
});

$(document).on('click', 'p.comment-answer', function() {
    let comments = $(this).parent().find(".comment-comments");

    if(comments.is(":visible"))
        comments.hide();
    else
        comments.show();
});

$(document).on('click', 'button.comment-button', function() {
    let papa = $(this).parent();

    //Si estos atributos regresan "undefined" entonces no tienen comentario padre así que es un comentario principal
    let commentID = papa.attr("comment-id");
    //let userID = papa.attr("user-id");  //Usuario dueño del comentario; Este no se usa aquí pero está como ejemplo

    let commentText = papa.find(".comment-text").val();

    if(commentID != undefined){
        //TODO: Comentario Principal
    }
    else{
        //TODO: Comentario de comentario
    }

});