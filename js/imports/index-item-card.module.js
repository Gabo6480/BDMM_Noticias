let createItemCard = function(item, style){

    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.classList.add(style);

    let container = document.createElement('div');
    container.classList.add('post-container');
    container.classList.add("rounded");
    container.style.backgroundImage = "url('" + item.image + "')";

    let titleCard = document.createElement('div');
    titleCard.classList.add('post-title-card');
    
    let postTitle = document.createElement('h3');
    postTitle.classList.add('block');
    postTitle.classList.add('post-title');
    postTitle.innerText = item.title;

    titleCard.append(postTitle);
    container.append(titleCard);
    gridItem.append(container);

    gridItem.onclick = function(){
        if(item.url != "")
            window.location = item.url;
    }

    return gridItem;
}

export{createItemCard}