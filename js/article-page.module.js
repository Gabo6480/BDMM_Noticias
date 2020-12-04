import * as comms from './imports/article-comments.module.js';
import * as parser from './imports/article-content-parser.module.js';

import {createCarousel} from './imports/carousel-creator.module.js'
import {createEditorButton} from './article-edit-mode.module.js'


import * as usuarios from './services/usuario.service.js';
import {getOne, getRelatedD} from './services/noticias.service.js';
import {getByArticle, addComment, removeComment} from './services/comentarios.service.js';
import {getById} from './routes/multimedia.routes.js';
import {count, add, remove, comprobar} from './services/likes.service.js';

import {getStoredUser} from './imports/cookie.module.js';

const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const userInfo = getStoredUser();

var isEditor;
var isOwner;
var isPublished;

$(document).ready(function(){
    
    
    usuarios.getOne(userInfo.userId)
    .then((res) => res.json())
    .then((user) => {
        isEditor = user.Rol == "editor";
        loadDataToWindow(id);
        
    })

    comprobar(id, userInfo.userId).then(res => res.json()).then((res) => {
        
        if(res.RESULT != "NOT"){
            $("#like-button").addClass("liked");
        }
    });

    $("#like-button").click(function(){
        if($(this).hasClass("liked")){
            let likefd = new FormData();
            likefd.append('id_articulo', id);
            likefd.append('id_usario', userInfo.userId);
            remove(likefd).then(() => {
                $(this).removeClass("liked");
                count(id)
                .then(res=>res.json())
                .then(data=>{
                    $('#like-number').text(data.RESULT);
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err));
        }
        else{
            let likefd = new FormData();
            likefd.append('id_articulo', id);
            likefd.append('id_usario', userInfo.userId);
            add(likefd).then(() => {
                $(this).addClass("liked");
                count(id)
                .then(res=>res.json())
                .then(data=>{
                    $('#like-number').text(data.RESULT);
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err));
        }
    });
});

function loadDataToWindow(id){

    //traer articulo
    getOne(id)
    .then(res => res.json())
    .then(data=>{

        isOwner = data.Escritor == userInfo.userId;
        isPublished = data.Estado == "publicada"

        $("#article-container").attr("articleID", id);

        $("#article-title").text(data.Titulo);
        $("#article-description").text(data.Resumen);
        $("#article-img").attr("src", getById(data.Foto));
        $("#article-content").html(parser.parseArticle(data.Contenido));
        $("#article-keywords").text(data.Palabras);

        $("#article-info").append("<p id='article-section'>" + data.NombreSeccion + "</p>");
        $("#article-info").append("<p>" + data.Fecha + "</p>");
        $("#article-info").append("<p class='editor-editable'>" + data.Ubicacion + "</p>");
        $("#article-info").append("<p id='article-author'>" + data.NombreReportero + "</p>");

        $('[data-toggle="tooltip"]').tooltip();

        getRelatedD(data.Palabras,data.ID)
        .then(res=>res.json())
        .then(relatedArticles=>{
            var carousel = {
                title:"Articulos Relacionados",
                cards:relatedArticles
            }

            $("#related-articles").append(createCarousel(carousel));
        })
        .catch(err=>console.log(err));
    }).then(() => {
        //traer comentarios
        getByArticle(id)
        .then(res => res.json())
        .then(data =>{
            let comments = document.querySelector('#comments');
            data.forEach(element=>{
                comments.append(comms.createMainComment(element, isOwner || isEditor)); //TODO: cambiar el true por una validacion que indique si tienes derecho de eliminar el comentario
            });

            if((isOwner || isEditor) && !isPublished)
                createEditorButton();
        })
        .catch(err=>{
            console.error("No se pudieron traer los comentarios "+ err)
        });
    })
    .catch(err=>{
        console.log("No se encontro el articulo");
        console.log(err);
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

$(document).on('click', '.button-delete', function() {
    let papa = $(this).parent();
    let commentId = papa.attr("comment-id");
    let fd = new FormData();
    fd.append("id", commentId);
    if(confirm("¿Está seguro que desea eliminar este comentario?"))
        removeComment(fd).then(()=>{
            location.reload();
        })
});

$(document).on('click', 'p.comment-answer', function() {
    let comments = $(this).parent().find(".comment-comments");

    if(comments.is(":visible"))
        comments.hide();
    else
        comments.show();
});

$(document).on('click','.comment-button', e=>{

    let $papa = $(e.target).parent();

    //Si estos atributos regresan "undefined" entonces no tienen comentario padre así que es un comentario principal
    let commentID = $papa.attr("comment-id");
    //let userID = papa.attr("user-id");  //Usuario dueño del comentario; Este no se usa aquí pero está como ejemplo

    let commentText = $papa.find(".comment-text").val();
    let commentfd = new FormData();
    commentfd.append("contenido", commentText);
    commentfd.append("usuario", userInfo.userId);
    commentfd.append("noticia", id);

    if(commentID != undefined)
        commentfd.append("padre", commentID);
    
    if(commentText != "")
    addComment(commentfd)
    .then(()=>{
        $papa.find(".comment-text").val("");
        //traer comentarios
        
        getByArticle(id)
        .then(res => res.json())
        .then(data =>{
            let $comments = $("#comments");
            $comments.empty();
            data.forEach(element=>{
                $comments.append(comms.createMainComment(element));
            });
        })
        .catch(err=>{
            console.error("No se pudieron traer los comentarios "+ err)
        });
    });
});

$(document).on('click', 'button.comment-button', function() {
    
});