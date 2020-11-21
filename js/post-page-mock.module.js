import {createPostCard} from './imports/post-card.module.js'
import {request} from './services/xmlhttp-promise.module.js';

function loadData(sr){
    let body = sr.find("tbody");

    $.getJSON(
        '/mock/usuarios.json',
        function(users){
            $.each(users, function(key, user){
                body.append(createPostCard(user));
            });
        }
    ).fail(function(err){
        console.error("Fallo la request de usuarios " + err);
    });
}

function accionBotones(sr){
    sr.on("click", ".button-publish", function (){
        //TODO: Logica de enviar el cambio a la base de datos
    });

    sr.on("click", ".button-see", function (){
        //TODO: Abrir la publicación
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

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

