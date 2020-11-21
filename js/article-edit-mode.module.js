import {request} from './services/xmlhttp-promise.module.js';
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

            //traer articulo
            request({url:'/mock/articulos.json'})
            .then(data=>{
                let object = JSON.parse(data);
                $("#article-title").text(object[0].title);
                $("#article-img").attr("src", object[0].img);
                $("#article-content").text(object[0].content);
            
                $('[data-toggle="tooltip"]').tooltip()
            })
            .catch(err=>{
                console.error("No se encontro el articulo");
            });

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