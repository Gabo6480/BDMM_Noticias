import {createSectionCard} from './imports/sections-card.module.js';
import {getActive, search} from './services/secciones.service.js';

function loadData(sr){
    let body = sr.find("tbody");

    getActive()
    .then(res=>res.json())
    .then(data=>{
        $.each(data,(index, seccion)=>{
            body.append(createSectionCard(seccion));
        })
    })
    .catch(err=>console.error(err))

    /*$.getJSON(
        '/mock/usuarios.json',
        function(users){
            $.each(users, function(key, user){
                body.append(createSectionCard(user));
            });
        }
    ).fail(function(err){
        console.error("Fallo la request de usuarios " + err);
    });*/
}

function accionBotones(sr){
    
    sr.on("click", ".button-up", function (){
        //TODO: Aumentar su prioridad
    });
    
    sr.on("click", ".button-down", function (){
        //TODO: Reducir su prioridad
    });;

    sr.on("click", ".button-edit", function (){
        //TODO: Editar
    })

    sr.on("click", ".button-delete", function (){
        //TODO: Deshacerse de la seccion
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

    console.log("SECTION PAGE MODULE")
    //Buscar cuando cambie el form de busqueda o sea enviado "submit", le agregue un ID -Parga
    let $search = $('#search-seccion-form');
    let $searchContent = $("#post-search-field");

    const makeSearch = ()=>{
        search($searchContent.val())
        .then(res=>res.json())
        .then(res=>{
            let $body = sr.find("tbody");
            $body.empty();
            $.each(res,(key,noticia)=>{
                $body.append(createSectionCard(noticia));
            });
        })
        .catch(err=>console.log(err))
    }

    //Buscar cuando cambie el filtro, contenido del input text o de al boton de buscar explicitamente
    $searchContent.on('keypress',makeSearch);
    //evitar default para no refrescar pagina
    $search.submit(e=>{
        e.preventDefault();
        makeSearch();
    });

    $("#new-post").click(function(){
        //Crear nueva seccion
    });


    $("#post-search-button").click(function(){
        let query = $(this).parent().find("#post-search-field").val();
    });

    accionBotones(sr);

    loadData(sr);
});

