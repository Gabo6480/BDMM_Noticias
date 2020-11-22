import {createItemCard} from './imports/index-item-card.module.js'
import {createCarousel} from './imports/carousel-creator.module.js'

$(document).ready(function(){

    var grid = $(".grid");

    var card = {
        "title": "Hola equisdedededede",
        "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
        "url": "http://127.0.0.1:5500/pages/article.html"
    }

    grid.append(createItemCard(card, "big-card"));

    //Primero agregamos el contenido
    for(var i = 0; i < 9; i++){
        grid.append(createItemCard(card, "small-card"));
    }

    //Lo organizamos
    grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: 210
    });

    var carousel = {
        "title":"Trending aasdasdasd",
        "cards":[
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            },
            {
                "title": "Hola equisdedededede",
                "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
                "url": "http://127.0.0.1:5500/pages/article.html"
            }
        ]
    };

    for(var i = 0; i < 3; i++){
        $("#carousel-holder").append(createCarousel(carousel));
    }

    //Escalamos el texto dentro de cada "noticia"
    $(".post-title-card").children().each(function(){
        $(this).fitText(1.25);
    });
});