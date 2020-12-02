import * as parser from './imports/article-content-parser.module.js'
import {getActive} from './services/secciones.service.js';

var editable = false;

$(document).ready(()=>{
    $('.modo-reportero-editor').click(()=>{
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
                $(this).replaceWith(function () {
                  return $(NewElement).append($(this).contents());
                });
            });

            let $select = $(`<select id='#article-section' class='browser-default custom-select col-2'><option selected>Seccion</option></select>`);
            getActive()
            .then(res=>res.json())
            .then(secciones=>{
                $.each(secciones, (i, seccion)=>{
                    $select.append($(`<option value="${seccion.ID}">${seccion.Nombre}</option>`))
                });
            })
            .catch(err=>console.log(err));

            $select.change(e=>{
                console.log($select.val());
            })


            $("#article-section").replaceWith($select);

            //TODO: Traer las secciones y rellenar el select

            $("#wmd-button-bar").show();
            $("#edit-buttons").show();
            $("#article-img-upload").show();

            var editor1 = new Markdown.Editor(parser.converter);
            editor1.run();

            $(".wmd-input").trigger("keyup");
        }
        else{
            //TODO: Agregar el enviar la nueva información a la base de datos


            location.reload();
        }
    });
});