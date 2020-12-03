import {createUserCard} from './imports/user-card.module.js';
import {getAllActive, getRolActive, search} from './services/usuario.service.js';

function loadData(sr){
    let body = sr.find("tbody");

    getAllActive()
    .then(res=>res.json())
    .then(usuarios=>{
        $.each(usuarios, (key, user)=>{
            body.append(createUserCard(user));
        });
    })
    .catch(err=>{
        console.error("Failed GetAllActive : " + err);
    });
}

function accionBotones(sr){
    sr.on("click", ".button-delete", function (){

        let papa = $(this).closest("tr");

        if(confirm("¿Está seguro que desea eliminar al " + papa.find("td.user-type").text() + " " + papa.find("td.user-name").text() +"?")){
            //alert("ded.");
            /*$.get(
                '...',
                'data',
                function(data){

                }
            ).error(function(err){

            });*/
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
    /*
    $("#user-filter").change(function(){
        let filter = $(this).children("option:selected").val()
        let $body = sr.find("tbody");

        $body.empty();
        if(filter == 0){
            getAllActive()
            .then(res=>res.json())
            .then(usuarios=>{
                $.each(usuarios,(key,usuario)=>{
                    $body.append(createUserCard(usuario));
                });
            })
            .catch(err=>console.log(err));
        }
        else{
            getRolActive(filter)
            .then(res=>res.json())
            .then(usuarios=>{
                $.each(usuarios,(key,usuario)=>{
                    $body.append(createUserCard(usuario));
                });
            })
            .catch(err=>console.log(err));
        }        
    });

    $("#user-search-button").click(function(){
        let query = $(this).parent().find("#user-search-field").val();

        alert(query)
    });
    */
    let $search = $('#search-usuario-form');
    let $filter = $('#user-filter');
    let $searchContent = $("#user-search-field");
    
    const makeSearch = ()=>{
        search($searchContent.val(),$filter.val())
        .then(res=>res.json())
        .then(res=>{
            let $body = sr.find("tbody");
            $body.empty();
            $.each(res,(key,noticia)=>{
                $body.append(createUserCard(noticia));
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

