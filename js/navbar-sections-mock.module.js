import { createSection } from './imports/navbar-sections.js';

$(document).ready(()=>{

    fetch("./../mock/secciones.json").then(res => res.json())
    .then(
        data =>{
            data.forEach(element=>{
                let $section = $(createSection(element));
                $('#sections').append($section);
            });
        }
    );

});