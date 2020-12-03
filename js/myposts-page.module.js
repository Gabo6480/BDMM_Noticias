import {createMyPostCard} from './imports/myposts-card.module.js';

import { getActive} from './services/secciones.service.js';

import {getByReportero} from './services/noticias.service.js';
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

    getByReportero(2)
    .then(res=>res.json())
    .then(usuarios=>{
        $.each(usuarios, (key, user)=>{
            body.append(createMyPostCard(user));
            alert(JSON.stringify(user));
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

