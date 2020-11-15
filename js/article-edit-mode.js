//import * as parser from './article-content-parser.module.js'

$(document).ready(()=>{
    $('.modo-reportero-editor').click(()=>{
        $('.editor-editable').each(function(index){
            let self = $(this);
            if(self.attr('contentEditable') == "true"){
                self.attr('contentEditable', "false");
            }
            else{
                self.attr('contentEditable', "true");
            }
        });
    });
});