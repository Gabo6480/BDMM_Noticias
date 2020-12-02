import {login} from './services/usuario.service.js';
import { validate_email, validate_empty } from './imports/validation.module.js';

import {getStoredUser, clearStorage, storeUser} from './imports/cookie.module.js';


$(document).ready(()=>{

    $('#login-form').submit(e=>{
        e.preventDefault();

        let fd = new FormData(e.target);

        let email    = fd.get('email');
        let password = fd.get('password');

        let ve = validate_email(email);
        let vp = validate_empty(password);

        if(validate_email(email) && validate_empty(password)){
            console.log("VALIDA")
            login(fd)
            .then(res=>res.json())
            .then(data=>{
                if(data){
                    alert("Todo piola mi pana, bienvenido");
                    storeUser({userId:data.ID, userName:data.Correo});
                    window.location.href = './../';
                }
            })
            .catch(err=>console.error(err));
        }
        else{
            if(!ve){
                alert('Correo no valido!');
            }
            if(!vp){
                alert('Contrasena no valida!');
            }
        }
    });
});