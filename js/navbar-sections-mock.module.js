import {getStoredUser, clearStorage} from './imports/cookie.module.js';

import {getAvatar} from './services/usuario.service.js';

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

        const userInfo = getStoredUser();

        if(userInfo.userId !== null && userInfo.userName !== null){

            let $loginbtn = $("#login-button")
            const $img = $('<img id="profilePic" src="" alt="pp" class="profile-picture" style="max-height:40px">');

            getAvatar(userInfo.userId)
            .then(res=>res.text())
            .then(src=>{

                $img.attr('src',src);

                $loginbtn.replaceWith($img)

                $("#profilePic").click(() =>{
                    location.href = "http://localhost:8081/BDMM_Noticias/pages/profile.html";
                });

                $('#regiser-btn').remove();
            });
        }
    })
    .catch(err=>console.log(err));

});