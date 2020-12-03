import {createPostCard} from './imports/post-card.module.js';
import { getAll, getBySeccion, edit } from './services/noticias.service.js';


import { getActive} from './services/secciones.service.js';

function loadData(sr){
    let body = sr.find("tbody");

    
    getActive()
    .then(res => res.json())
    .then(data =>{
        let dropMenu = $("#post-filter");
        data.forEach(element=>{
            dropMenu.append("<option value='" + element.ID + "'>" + element.Nombre + "</option>");
        });
    })
    .catch(err=>console.log(err));


    getAll('en redaccion')
    .then(res=>res.json())
    .then(noticias=>{
        $.each(noticias,(key,noticia)=>{
            body.append(createPostCard(noticia));
        });
    })
    .catch(err=>console.log(err));
}

function accionBotones(sr){
    sr.on("click", ".button-publish", function (){
        let ID = $(this).parents("tr").attr("post-id");

        var formdata = new FormData();
        formdata.append("id" , ID);
        formdata.append("estado" , "publicada");
        edit(formdata)
        .then(() =>{
            location.reload();
        })
        .catch(err=>console.log(err));
    });

    sr.on("click", ".button-see", function (){
        let ID = $(this).parents("tr").attr("post-id");
        window.location = ID?`article.html?id=${ID}`:'/';
    });
}

$(document).ready(function(){

    let sr = $("#result-table");
    let body = sr.find("tbody");

    $("#post-filter").change(function(){
        let filter = $(this).children("option:selected").val()
        body.empty();
        if(filter == 0){
            getAll('en redaccion')
            .then(res=>res.json())
            .then(noticias=>{
                $.each(noticias,(key,noticia)=>{
                    body.append(createPostCard(noticia));
                });
            })
            .catch(err=>console.log(err));
        }
        else{
            getBySeccion(filter)
            .then(res=>res.json())
            .then(noticias=>{
                $.each(noticias,(key,noticia)=>{
                    body.append(createPostCard(noticia));
                });
            })
            .catch(err=>console.log(err));
        }
    });

    $("#post-search-button").click(function(){
        let query = $(this).parent().find("#post-search-field").val();
    });

    accionBotones(sr);

    loadData(sr);
});

