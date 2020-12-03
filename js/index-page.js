import {createItemCard} from './imports/index-item-card.module.js'
import {createCarousel} from './imports/carousel-creator.module.js'

import {getAll, getByState, getBySeccion,getByStateSeccion} from './services/noticias.service.js';

$(document).ready(function(){

    var grid = $(".grid");

    let url = new URL(window.location);
    
    let seccionId = url.searchParams.get('id');

    if(!seccionId)
        getByState('publicada')
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
                    $("#carousel-holder").append(createCarousel({tile:"Mas Noticias",cards:[...carrousselBuffer]}));
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
        .catch(err=>console.log(err))
    else    
        getByStateSeccion(seccionId, 'publicada')
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
                        $("#carousel-holder").append(createCarousel({tile:"Mas Noticias",cards:[...carrousselBuffer]}));
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
        .catch(err=>console.log(err))
});