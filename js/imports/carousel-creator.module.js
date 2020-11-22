import {createItemCard} from './index-item-card.module.js'

let createCarousel = function(data){

    let carousel = document.createElement('div');
    carousel.classList.add("carousel");

    let h3 = document.createElement('h3');
    h3.classList.add('carousel-title');
    h3.innerText = data.title;

    let band = document.createElement('div');
    band.classList.add('item-carousel');

    for(var i = 0; i < data.cards.length; i++){
        band.append(createItemCard(data.cards[i], "small-card"));
    }

    carousel.append(h3, band);
    
    return carousel;
}

export{createCarousel}