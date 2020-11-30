import { createSection } from './imports/navbar-sections.js';
import { getActive} from './services/secciones.service.js';

$(document).ready(()=>{

    getActive()
    .then(res => res.json())
    .then(data =>{
        data.forEach(element=>{
            let $section = $(createSection(element));
            $('#sections').append($section);
        });
    });

});