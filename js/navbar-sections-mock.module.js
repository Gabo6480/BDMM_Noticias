import {getStoredUser, clearStorage} from './imports/cookie.module.js';

import {getAvatar, getOne} from './services/usuario.service.js';

import { createSection } from './imports/navbar-sections.js';
import { getActive } from './services/secciones.service.js';

$(document).ready(()=>{

    getActive()
    .then(res => res.json())
    .then(data =>{
        data.forEach(element=>{
            let $section = $(createSection(element));
            $('#sections').append($section);
        });
    })
    .catch(err=>console.log(err));

    const userInfo = getStoredUser();
    if(userInfo.userId !== null && userInfo.userName !== null){
        const $img = $('<div><a id="profileLink"></a><img id="profilePic" alt="pp" class="profile-picture" style="max-height:40px"></img></div>');
        
        getAvatar(userInfo.userId)
        .then(res=>res.text())
        .then(src=>{
            $("#login-button").replaceWith($img);
            $("#profilePic").click(() =>{
                location.href = "http://localhost:8081/BDMM_Noticias/pages/profile.html";
            });
            $("#profilePic").attr('src',src);
            $("#profileLink").attr("href", "http://localhost:8081/BDMM_Noticias/pages/profile.html");
            $("#profileLink").text(userInfo.userName);
            $("#profileLink").css("color", "white")
        })
        .catch(err=>console.log(err));

        getOne(userInfo.userId)
        .then(res=>res.json())
        .then(usuario => {
            //alert(JSON.stringify(usuario))
            $('#regiser-btn').parent().replaceWith(
                $('<li class="nav-item dropdown">' +
                    '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                        '<i class="fas fa-ellipsis-v"></i>' +
                    '</a>' +
                    '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">' +
                        '<a class="dropdown-item" href="http://localhost:8081/BDMM_Noticias/pages/profile.html">Perfil</a>' +
                        (usuario.Rol == "editor" ? '<a class="dropdown-item" href="http://localhost:8081/BDMM_Noticias/pages/posts.html">Articulos</a>' : "") +
                        (usuario.Rol == "editor" ? '<a class="dropdown-item" href="http://localhost:8081/BDMM_Noticias/pages/users.html">Usuarios</a>' : "") +
                        (usuario.Rol == "editor" ? '<a class="dropdown-item" href="http://localhost:8081/BDMM_Noticias/pages/sections.html">Secciónes</a>' : "") +
                        (usuario.Rol == "reportero" ? '<a class="dropdown-item" href="http://localhost:8081/BDMM_Noticias/pages/myposts.html">Mis Articulos</a>' : "") +
                        '<a id="logout" class="dropdown-item" >Cerrar Sesión</a>' +
                    '</div>' +
                '</li>'));
            
            $("#logout").click(() =>{
                clearStorage();
                location.href = "http://localhost:8081/BDMM_Noticias/";
            });
        })
        .catch(err=>console.log(err));
    }

    $(document).on('submit','#search-form-nav', e=>{
        console.log('SUBMIT');
        e.preventDefault();
        location.href = `http://localhost:8081/BDMM_Noticias/pages/search.html?busqueda=${$("#search").val()}`;
    });

});