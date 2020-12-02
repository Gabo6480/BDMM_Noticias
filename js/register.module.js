import * as vals from './imports/validation.module.js';
import {add} from './services/usuario.service.js';
import {storeUser} from './imports/cookie.module.js';

$(document).ready(function () {

    var uploaded = null;

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
                uploaded = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $("#examinar-btn").on('click', e=>{
        $(".file-upload").click();
    });

    $('#register-form').on('submit',e=>{
        e.preventDefault();

        let fd = new FormData(e.target);

        let nombre  = fd.get('nombre');
        let correo  = fd.get('correo');
        let contra  = fd.get('contra');
        let contrac = fd.get('contra-c');

        let err = 0;
        //VALIDACIONES
        if(!vals.validate_empty(correo))
        {
            alert("Email es obligatorio");
            err++;
        }
        if(!vals.validate_email(correo))
        {
            alert("Email invalido");
            err++;
        }

        if(!vals.validate_empty(nombre))
        {
            alert("Nombre obligatorio");
            err++;
        }
        if(!vals.validate_username(nombre))
        {
            alert("Nombre invalido");
            err++;
        }

        if(!vals.validate_empty(contra))
        {
            alert("Constrasena obligatoria");
            err++;
        }
        if(!vals.validate_empty(contrac))
        {
            alert("Confirmacion de constrasena obligatoria");
            err++;
        }
        if(contra != contrac){
            alert("Contrasena y confirmacion de contrasena tienen que ser identicas");
            err++;
        }

        if(err > 0)
            return;

        fd.set('foto', uploaded);
        fd.append('rol', 'usuario');
        fd.append('activo', 1);

        add(fd)
        .then(res=>res.text())
        .then(data=>{
            console.log(data);
            alert(`Un placer tenerte aqui ${fd.get('nombre')}!!!`);
            window.location.href = './login.html';

        })
        .catch(err=>{
            console.log(err);
            alert( `Falla en alta de usuario`);
        });

    })

});