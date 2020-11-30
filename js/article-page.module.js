import * as comms from './imports/article-comments.module.js'
import * as parser from './imports/article-content-parser.module.js'
import {createCarousel} from './imports/carousel-creator.module.js'
import {getOne} from './services/noticias.service.js';
import {getByArticle} from './services/comentarios.service.js';

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
    });

    var carousel = {
        "title":"Articulos relacionados",
        "cards":[
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "./pages/article.html"
            }
        ]
    };

    $("#related-articles").append(createCarousel(carousel));
   

    //Escalamos el texto dentro de cada "noticia"
    $(".post-title-card").children().each(function(){
        $(this).fitText(1.25);
    });
});

function loadDataToWindow(id){

    //traer articulo
    getOne(id)
    .then(res => res.json())
    .then(data=>{
        $("#article-title").text(data.title);
        $("#article-description").text(data.desc);
        $("#article-img").attr("src", data.img);
        $("#article-content").html(parser.parseArticle(data.content));

        $("#article-info").append("<p id='article-section'>" + data.section + "</p>");
        $("#article-info").append("<p>" + data.date + "</p>");
        $("#article-info").append("<p>" + data.hour + "</p>");
        $("#article-info").append("<p id='article-author'>" + data.author + "</p>");

        $('[data-toggle="tooltip"]').tooltip()
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