import {createItemCard} from './imports/index-item-card.module.js'

$(document).ready(function(){

    var grid = $(".grid");

    var card = {
        "title": "Hola equisdedededede",
        "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
        "url": "http://127.0.0.1:8081/pages/article.html"
    }

    //Primero agregamos el contenido
    for(var i = 0; i < 40; i++){
        grid.append(createItemCard(card, "small-card"));
    }

    //Lo organizamos
    grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: 210
    });

    //Escalamos el texto dentro de cada "noticia"
    $(".post-title-card").children().each(function(){
        $(this).fitText(1.25);
    });
});