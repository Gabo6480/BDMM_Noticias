import {createSectionCard} from './imports/sections-card.module.js';
import {getActive} from './services/secciones.service.js';

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
}

//Esto es para que la propiedad de background-color regrese un #hex en vez de rgb()
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}

function accionBotones(sr){
    
    sr.on("click", ".button-up", function (){
        //TODO: Aumentar su prioridad
    });
    
    sr.on("click", ".button-down", function (){
        //TODO: Reducir su prioridad
    });;

    sr.on("click", ".button-edit", function (){
        let papa = $(this).closest("tr");
        let sectionColor = papa.find("td.section-color");
        let colorValue = sectionColor.css("background-color")
        sectionColor.css("background-color", "transparent");
        sectionColor.html('<input type="color" id="colorpicker" value="'+ colorValue +'">');

        let title = papa.find("td.section-title");
        title.attr("contentEditable", true);

        $(this).replaceWith("<button class='btn btn-outline-success button-save'><i class='fas fa-save'></i></button>");
    })

    sr.on("click", ".button-delete", function (){
        //TODO: Deshacerse de la seccion
    });

    sr.on("click", ".button-save", function (){
        let papa = $(this).closest("tr");

        let sectionColor = papa.find("td.section-color");

        let colorValue = sectionColor.find("#colorpicker").val();

        let sectionTitle = papa.find("td.section-title").text();

        //TODO: Logica de enviar el cambio a la base de datos

        location.reload();
    })
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

