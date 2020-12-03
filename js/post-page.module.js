import {createPostCard} from './imports/post-card.module.js';
import { getAll, getBySeccion, getByState, edit, search } from './services/noticias.service.js';


import { getActive} from './services/secciones.service.js';

function loadData(sr){
    let $body = sr.find("tbody");

    getActive()
    .then(res => res.json())
    .then(data =>{
        let dropMenu = $("#post-filter");
        data.forEach(element=>{
            dropMenu.append("<option value='" + element.ID + "'>" + element.Nombre + "</option>");
        });
    })
    .catch(err=>console.log(err));

    getByState('terminada')
    .then(res=>res.json())
    .then(noticias=>{
        $.each(noticias,(key,noticia)=>{
            $body.append(createPostCard(noticia));
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

    /*$("#post-filter").change(function(){
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
    });*/

    /*$("#post-search-button").click(function(){
        let query = $(this).parent().find("#post-search-field").val();
    });*/

    //Buscar cuando cambie el form de busqueda o sea enviado "submit", le agregue un ID -Parga
    let $search = $('#search-noticia-form');
    let $filter = $('#post-filter');
    let $searchContent = $("#post-search-field");

    const makeSearch = ()=>{
        console.log("SEARCHING")
        search($searchContent.val(),$filter.val())
        .then(res=>res.json())
        .then(res=>{
            let $body = sr.find("tbody");
            $body.empty();
            $.each(res,(key,noticia)=>{
                $body.append(createPostCard(noticia));
            });
        })
        .catch(err=>console.log(err))
    }

    //Buscar cuando cambie el filtro, contenido del input text o de al boton de buscar explicitamente
    $filter.change(makeSearch);
    $searchContent.on('keypress',makeSearch);
    //evitar default para no refrescar pagina
    $search.submit(e=>{
        e.preventDefault();
        makeSearch();
    });

    accionBotones(sr);

    loadData(sr);
});

