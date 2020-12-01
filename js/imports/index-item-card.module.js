import {getById} from './../routes/multimedia.routes.js';

let createItemCard = function(item, style){

    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.classList.add(style);

    let container = document.createElement('div');
    container.classList.add('post-container');
    container.classList.add("rounded");
    container.style.backgroundImage = "url('" + getById(item.Foto) + "')";

    let titleCard = document.createElement('div');
    titleCard.classList.add('post-title-card');
    
    let postTitle = document.createElement('h3');
    postTitle.classList.add('block');
    postTitle.classList.add('post-title');
    postTitle.innerText = item.Titulo;

    titleCard.append(postTitle);
    container.append(titleCard);
    gridItem.append(container);

    //URL DE PAGINA DE ARTICULO
    
    gridItem.onclick = function(){
        let arr = window.location.href.split("/");
        if(arr[arr.length-2] !== 'pages'){
            window.location = item.ID?`pages/article.html?id=${item.ID}`:'/';
        }
        else
        {
            window.location = item.ID?`article.html?id=${item.ID}`:'/';
        }
            
    }

    return gridItem;
}

export{createItemCard}