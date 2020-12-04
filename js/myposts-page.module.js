import {createMyPostCard} from './imports/myposts-card.module.js';
import {getStoredUser} from './imports/cookie.module.js';
import { getActive} from './services/secciones.service.js';
import {getByReportero, search, cambiarEstado, remove, add} from './services/noticias.service.js';

const userInfo = getStoredUser();
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
        .then(res=>res.json())
        .then(res=>{
            if(res.STATUS == "SUCCESS")
                location.reload();
        })
        .catch(err=>console.log(err))
    });

    sr.on("click", ".button-delete", function (){
        let ID = $(this).parents("tr").attr("post-id");
        let fd = new FormData();
        fd.append("id", ID);
        if(confirm("¿Está seguro que desea eliminar esta publicación?"))
            remove(fd).then(()=> location.reload())
            .catch(err=>console.log(err));
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

    $("#new-post").click(function(){
        //TODO: Crear nueva publicación
        let fd = new FormData();
        fd.append("estado","en redaccion");
        fd.append("titulo","Titulo de la noticia");
        fd.append("resumen","Resumen de la noticia");
        fd.append("contenido","Contenido de la noticia");
        fd.append("ubicacion","Ubicación");
        fd.append("palabras","Palabras clave");
        fd.append("seccion",1);
        fd.append("fecha", new Date().toISOString());
        fd.append("escritor",userInfo.userId);
        add(fd)
        .then(res=>res.json())
        .then((newPost) => {
            if(newPost.STATUS == 'SUCCESS'){
                window.location = `article.html?id=${newPost.id}`;
            }
        });
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

