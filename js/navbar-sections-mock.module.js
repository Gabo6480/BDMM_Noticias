import {getStoredUser, clearStorage} from './imports/cookie.module.js';

import {getAvatar} from './services/usuario.service.js';

import { createSection } from './imports/navbar-sections.js';
import { getActive} from './services/secciones.service.js';

$(document).ready(()=>{

    const userInfo = getStoredUser();

    if(userInfo.userId !== null && userInfo.userName !== null){
        $loginbtn = $('#login-button');
        $loginbtn.click(e=>{

            const $img = $('<img class="miniature"/>'); 
            $img.attr('src',getAvatar(userInfo.userId));

            $loginbtn.remove();
        });
    }

    getActive()
    .then(res => res.json())
    .then(data =>{
        data.forEach(element=>{
            let $section = $(createSection(element));
            $('#sections').append($section);
        });
    })
    .catch(err=>console.log(err));

});