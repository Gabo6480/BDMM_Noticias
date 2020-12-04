import {createUserCard} from './imports/user-card.module.js';
import {getAllActive, search, remove, edit} from './services/usuario.service.js';

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
            let fd = new FormData();
            fd.append("id", papa.attr("user-id"))
            remove(fd).then(() => {
                location.reload();
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
        "<option value='usuario'>Usuario</option>" +
        "<option value='reportero'>Reportero</option>" +
        "<option value='editor'>Editor</option>" +
        "</select>");

        userType.find("select").children().each(function(){
            if($(this).text() == currUserType){
                $(this).attr("selected", true);
            }
        });

    });

    sr.on("click", ".button-save", function (){
        let papa = $(this).closest("tr");

        let userType = papa.find("td.user-type");

        let select = userType.find("select").children("option:selected");

        let val = select.val();

        //TODO: Esta madre no jala
        let fd = new FormData();
        fd.append("id", papa.attr("user-id"));
        fd.append("rol", val);
        edit(fd)
        .then((res) => {
            location.reload();
        })
    });
}

$(document).ready(function(){

    let sr = $("#result-table");

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

