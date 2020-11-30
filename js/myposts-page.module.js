import {createMyPostCard} from './imports/myposts-card.module.js';

import {getByReportero} from './services/noticias.service.js';
function loadData(sr){
    let body = sr.find("tbody");


    getByReportero(2)
    .then(res=>res.json())
    .then(usuarios=>{
        $.each(usuarios, (key, user)=>{
            body.append(createMyPostCard(user));
        });
    })
    .catch(err=>{
        console.error("Failed getByReportero : " + err);
    });

    /*  //MOCK
    $.getJSON(
        '/mock/usuarios.json',
        function(users){
            $.each(users, function(key, user){
                body.append(createMyPostCard(user));
            });
        }
    ).fail(function(err){
        console.error("Fallo la request de usuarios " + err);
    });*/
}

function accionBotones(sr){
    sr.on("click", ".button-edit", function (){
        //TODO: Editar la publicación
    });

    sr.on("click", ".button-send", function (){
        //TODO: Abrir enviar la publicación para revisión
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

    $("#post-filter").change(function(){
        let filter = $(this).children("option:selected").val()
        //0 = sin filtro
        //1 = Usuarios
        //2 = Reporteros
        //3 = Editores

        //TODO: Logica de filtrado
    });

    $("#post-search-button").click(function(){
        let query = $(this).parent().find("#post-search-field").val();
    });

    accionBotones(sr);

    loadData(sr);
});

