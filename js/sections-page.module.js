import {createSectionCard} from './imports/sections-card.module.js'

function loadData(sr){
    let body = sr.find("tbody");

    $.getJSON(
        '/mock/usuarios.json',
        function(users){
            $.each(users, function(key, user){
                body.append(createSectionCard(user));
            });
        }
    ).fail(function(err){
        console.error("Fallo la request de usuarios " + err);
    });
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

    $("#new-post").click(function(){
        //Crear nueva seccion
    });


    $("#post-search-button").click(function(){
        let query = $(this).parent().find("#post-search-field").val();
    });

    accionBotones(sr);

    loadData(sr);
});

