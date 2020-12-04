import * as parser from './imports/article-content-parser.module.js'
import {getActive} from './services/secciones.service.js';
import {edit} from './services/noticias.service.js';
import {add} from './services/multimedia.service.js';

import * as noticias from './services/noticias.service.js';

var editable = false;
var selectedFile;

let createEditorButton = ()=>{
    
    //Agregamos los controles de edición
    $("body").prepend( `<div class="modo-reportero-editor">
        <i class="fas fa-edit"></i>
    </div>`);
    $("#article-container").append(
        `<div id="edit-buttons" class="form-group" style="display: none;">
            <div class="col-xs-12">
                <br>
                <button id="storeChanges" class="btn btn-lg btn-success"> Guardar </button>
                <button id="restoreChanges" class="btn btn-lg" type="reset"> Restaurar </button>
            </div>
        </div>`);

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#article-img').attr('src', e.target.result);
            }

            selectedFile = input.files[0];
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $("#restoreChanges").click(() =>{
        location.reload();
    });
    $("#storeChanges").click(() =>{
        //TODO: Guardar cambios
        //NOTA: El guardar los cambios al archivo tiene que cambiar el estado de la noticia a "en redacción"
        //Esto es para que cuando el editor o reportero le hagan cambios, entonces va a regresar a "en redacción"
        //La manera para que cambie a "terminada" es que el reportero le de al botón de enviar en "Mis Articulos"
        //Y para que cambie a "publicada", el editor tiene que picarle al botón publicar
        let id = $("#article-container").attr("articleID");
        let titulo = $("#atricle-title").text();
        let descripcion = $("#atricle-description").text();
        let seccionValor = $("#atricle-section").val();
        let lugar = $("#article-location").text();
        //let imagen = $("#article-img").attr("file");
        let contenido = $("#article-content").text();
        let palabras = $("#article-keywords").text();
        let multifd = new FormData();
        multifd.append("archivo", selectedFile);
        add(multifd).then(res => res.text()).then((multimedia) => {
            alert(multimedia);
            debugger;
            let editfd = new FormData();
            editfd.append('id', id);
            editfd.append('estado', "en redaccion");
            editfd.append('titulo', titulo);
            editfd.append('resumen', descripcion);
            editfd.append('contenido', contenido);
            editfd.append('foto', multimedia);
            editfd.append('ubicacion', lugar);
            editfd.append('palabras', palabras);
            editfd.append('seccion', seccionValor);
            edit(editfd).then(()=>{
                //location.reload();
                alert("done");
            });
        }).catch(err=>console.log(err));
    });
    

    $('body').on('click','.modo-reportero-editor' , ()=>{
        $('.editor-editable').each(function(index){
            let self = $(this);
            if(self.attr('contentEditable') == "true"){
                editable = false;
            }
            else{
                self.attr('contentEditable', "true");
                editable = true;
            }
        });

        if(editable){
            $('p#article-content').each(function() {
                // Create a new element and assign it attributes from the current element
                var NewElement = $("<textarea />");
                $.each(this.attributes, function(i, attrib){
                  $(NewElement).attr(attrib.name, attrib.value);
                });
                NewElement.addClass("autoExpand");          
                // Replace the current element with the new one and carry over the contents
                
                
                noticias.getOne($("#article-container").attr("articleID"))
                .then(res => res.json())
                .then(data=>{
                    $(this).replaceWith(function () {
                        return $(NewElement).append(data.Contenido);
                    });
                });
                
            });

            let $select = $(`<select id='#article-section' class='browser-default custom-select col-2'><option selected>Seccion</option></select>`);
            getActive()
            .then(res=>res.json())
            .then(secciones=>{
                $.each(secciones, (i, seccion)=>{
                    $select.append($(`<option value='"${seccion.ID}"'>${seccion.Nombre}</option>`))
                });
            })
            .catch(err=>console.log(err));

            $select.change(e=>{
                console.log($select.val());
            })


            $("#article-section").replaceWith($select);

            $("#wmd-button-bar").show();
            $("#edit-buttons").show();
            $("#article-img-upload").show();

            var editor1 = new Markdown.Editor(parser.converter);
            editor1.run();

            $(".wmd-input").trigger("keyup");

            $(".modo-reportero-editor").remove();
        }
    });
};

export{ createEditorButton }