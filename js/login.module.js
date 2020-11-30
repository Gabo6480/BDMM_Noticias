import {login} from './services/usuario.service.js';
import { validate_email, validate_empty } from './imports/validation.module.js';

window.onload = function(){

    document.querySelector('#form-id').addEventListener("sumbit",e=>{

        e.preventDefault();

        let fd = new FormData(e.target);

        let email    = fd.get('email');
        let password = fd.get('password');

        if(validate_email(email) && validate_empty(password)){
            login(fd)
            .then(res=>res.json())
            .then(data=>{
                if(data.status === 200){
                    alert("Todo piola mi pana, bienvenido");
                    window.location.href = '/';
                }
            })
            .catch(err=>console.error(err));
        }
        else{
            //Enviar mensaje de corregir campos
        }
    });
}