import { createSection } from './navbar-sections.js';
import { request } from './services/xmlhttp-promise.module.js';

$(document).ready(()=>{

    request({url:"./../mock/secciones.json"}).then(
        data =>{
            JSON.parse(data).forEach(element=>{
                console.log(element);
                let $section = $(createSection(element));
                $('#sections').append($section);
            });
        }
    );

});