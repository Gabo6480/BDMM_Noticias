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

function accionBotones(sr){
    sr.on("click", ".button-delete", function (){

        let papa = $(this).closest("tr");

        if(confirm("¿Está seguro que desea eliminar al " + papa.find("td.user-type").text() + " " + papa.find("td.user-name").text() +"?")){
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
        let papa = $(this).closest("tr");

        let actions = $(this).parent();

        $(this).replaceWith("<button class='btn btn-outline-success button-save'><i class='fas fa-save'></i></button>");
        actions.find(".button-delete").attr("disabled", true);

        let userType = papa.find("td.user-type");
        let currUserType = userType.text();

        userType.html("<select class='browser-default custom-select'>" +
        "<option value='1'>Usuario</option>" +
        "<option value='2'>Reportero</option>" +
        "<option value='3'>Editor</option>" +
        "</select>");

        userType.find("select").children().each(function(){
            if($(this).text() == currUserType){
                $(this).attr("selected", true);
            }
        });

    });

    sr.on("click", ".button-save", function (){
        let papa = $(this).closest("tr");

        let actions = $(this).parent();

        $(this).replaceWith("<button class='btn btn-outline-secondary button-edit'><i class='fas fa-edit'></i></button>");
        actions.find(".button-delete").attr("disabled", false);

        let userType = papa.find("td.user-type");

        let select = userType.find("select").children("option:selected");

        let val = select.val();
        let text = select.text();

        userType.html(text);

        //TODO: Logica de enviar el cambio a la base de datos
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

    $("#user-filter").change(function(){
        let filter = $(this).children("option:selected").val()
        //0 = sin filtro
        //1 = Usuarios
        //2 = Reporteros
        //3 = Editores

        //TODO: Logica de filtrado
    });

    $("#user-search-button").click(function(){
        let query = $(this).parent().find("#user-search-field").val();

        alert(query)
    });

    accionBotones(sr);

    loadData(sr);
});

