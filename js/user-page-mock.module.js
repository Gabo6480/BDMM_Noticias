import {createUserCard} from './imports/user-card.module.js'
import {request} from './services/xmlhttp-promise.module.js';

function loadData(sr){
    let body = sr.find("tbody");

    $.getJSON(
        '/mock/usuarios.json',
        function(users){
            $.each(users, function(key, user){
                body.append(createUserCard(user));
            });
        }
    ).fail(function(err){
        console.error("Fallo la request de usuarios " + err);
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

    sr.on("click", ".button-delete", function (){
        if(confirm("¿Estás seguro?")){
            //alert("ded.");
            $.get(
                '...',
                'data',
                function(data){

                }
            ).error(function(err){

            });
        }
    });

    sr.on("click", ".button-edit", function (){
        
    });


    loadData(sr);
});