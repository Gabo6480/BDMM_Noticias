import {createMyPostCard} from './imports/myposts-card.module.js';
import {getStoredUser, clearStorage, storeUser} from './imports/cookie.module.js';
import { getActive} from './services/secciones.service.js';
import {getByReportero, search, cambiarEstado} from './services/noticias.service.js';

function loadData(sr){
    let body = sr.find("tbody");
    const userInfo = getStoredUser();

    getActive()
    .then(res => res.json())
    .then(data =>{
        let dropMenu = $("#post-filter");
        data.forEach(element=>{
            dropMenu.append("<option value='" + element.ID + "'>" + element.Nombre + "</option>");
        });
    })
    .catch(err=>console.log(err));

    getByReportero(userInfo.userId)
    .then(res=>res.json())
    .then(usuarios=>{
        $.each(usuarios, (key, user)=>{
            body.append(createMyPostCard(user));
        });
    })
    .catch(err=>{
        console.error("Failed getByReportero : " + err);
    });
}

function accionBotones(sr){
    sr.on("click", ".button-edit", function (){
        let ID = $(this).parents("tr").attr("post-id");
        window.location = ID?`article.html?id=${ID}`:'/';
    });

    sr.on("click", ".button-send", function (){

        let fd = new FormData();
        let ID = $(this).parents("tr").attr("post-id");
        fd.append('id',ID);
        fd.append('estado', 'terminada');
        
        cambiarEstado(fd)
        .then(res=>res.text())
        .then(res=>{
            alert(res);
        })
        .catch(err=>console.log(err))
    });

    sr.on("click", ".button-delete", function (){
        //TODO: Deshacerse de la publicación
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

    $("#new-post").click(function(){
        //Crear nueva publicación
    });

    //Buscar cuando cambie el form de busqueda o sea enviado "submit", le agregue un ID -Parga
    let $search = $('#search-noticia-form');
    let $filter = $('#post-filter');
    let $searchContent = $("#post-search-field");

    const userInfo = getStoredUser();

    const makeSearch = ()=>{
        search($searchContent.val(),$filter.val(),undefined, userInfo.userId)
        .then(res=>res.json())
        .then(res=>{
            let $body = sr.find("tbody");
            $body.empty();
            $.each(res,(key,noticia)=>{
                $body.append(createMyPostCard(noticia));
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

