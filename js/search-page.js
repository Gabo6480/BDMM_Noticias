import {createItemCard} from './imports/index-item-card.module.js';
import {search} from './services/noticias.service.js';

$(document).ready(function(){

    const url = new URL(window.location);

    let busqueda = url.searchParams.get('busqueda');

    if(!busqueda)
    {
        location.href = '/BDMM_Noticias';
    }
    var $grid = $(".grid");

    search(busqueda, null, 'publicada')
    .then(res=>res.json())
    .then(res=>{

        $.each(res, (i, noticia)=>{
            $grid.append(createItemCard(noticia, "small-card"));
        })

        //Lo organizamos
        $grid.masonry({
            itemSelector: '.grid-item',
            columnWidth: 210
        });
        //Escalamos el texto dentro de cada "noticia"
        $(".post-title-card").children().each(function(){
            $(this).fitText(1.25);
        });
    })
    .catch(err=>console.log(err));
});