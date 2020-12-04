import {getById} from './../routes/multimedia.routes.js';

let createItemCard = function(item, style){

    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.classList.add(style);

    let container = document.createElement('div');
    container.classList.add('post-container');
    container.classList.add("rounded");

    let dataURL;

    let mediaURL = getById(item.Foto);
    var xhttp = new XMLHttpRequest();
    xhttp.open('HEAD', mediaURL);
    xhttp.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
            if(this.getResponseHeader("Content-Type").includes("video")){

                let video = $(`<video src="${mediaURL}" width=300px height=200px></video>`).get(0);
                video.onloadedmetadata  = ()=>{

                    video.play();
                    debugger;

                    let canvas = document.createElement('canvas');

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    
                    canvas.getContext('2d')
                        .drawImage(video,0,0, canvas.width, canvas.height);
                    
                    dataURL = canvas.toDataURL();
                    container.style.backgroundImage = "url('" + dataURL + "')";
                    video.stop();
                }
            }
            else{
                dataURL = mediaURL;
                container.style.backgroundImage = "url('" + dataURL + "')";
            }
        }
    };
    xhttp.send();

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