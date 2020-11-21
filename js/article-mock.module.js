import {request} from './services/xmlhttp-promise.module.js';
import * as comms from './imports/article-comments.module.js'
import * as parser from './imports/article-content-parser.module.js'
$(document).ready(function(){

    loadDataToWindow();

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
    })
});

function loadDataToWindow(){
    //traer articulo
    request({url:'/mock/articulos.json'})
    .then(data=>{
        let object = JSON.parse(data);
        $("#article-title").text(object[0].title);
        $("#article-description").text(object[0].desc);
        $("#article-img").attr("src", object[0].img);
        $("#article-content").html(parser.parseArticle(object[0].content));

        $("#article-info").append("<p id='article-section'>" + object[0].section + "</p>");
        $("#article-info").append("<p>" + object[0].date + "</p>");
        $("#article-info").append("<p>" + object[0].hour + "</p>");
        $("#article-info").append("<p id='article-author'>" + object[0].author + "</p>");

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
            comments.append(comms.createMainComment(data));
        });
    })
    .catch(err=>{
        console.error("No se pudieron traer los comentarios "+err)
    });
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