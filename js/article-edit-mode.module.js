import * as parser from './imports/article-content-parser.module.js'

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

            $("#article-section").replaceWith("<select id='#article-section' class='browser-default custom-select col-2'>" +
            "<option selected>Seccion</option>" +
            "</select>");

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