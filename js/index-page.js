import {createItemCard} from './imports/index-item-card.module.js'
import {createCarousel} from './imports/carousel-creator.module.js'

import {getAll} from './services/noticias.service.js';

$(document).ready(function(){

    var grid = $(".grid");

    getAll()
    .then(res=>res.json())
    .then(noticias=>{

        let carrousselBuffer = [];
        let organized = false;
        let j = 0;
        $.each(noticias, (index, noticia)=>{
            if(index === 0){
                grid.append(createItemCard(noticia, "big-card"));
            }
            else if(index < 9)
            {
                grid.append(createItemCard(noticia, "small-card"));
            }
            else{
                
                carrousselBuffer.push(noticia);
                j++;

                if(j === 10 || index === (noticias.length-1) ){
                    $("#carousel-holder").append(createCarousel(carrousselBuffer));
                    j = 0;
                    carrousselBuffer = [];
                }

            }
        });

        
        grid.masonry({
            itemSelector: '.grid-item',
            columnWidth: 210
        });
        
    })

    

   /* var card = {
        "title": "Hola equisdedededede",
        "image": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
        "url": "./pages/article.html"
    }

    grid.append(createItemCard(card, "big-card"));*/
/*
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

    for(var i = 0; i < 3; i++){
        $("#carousel-holder").append(createCarousel(carousel));
    }

    //Escalamos el texto dentro de cada "noticia"
    $(".post-title-card").children().each(function(){
        $(this).fitText(1.25);
    });

*/

});