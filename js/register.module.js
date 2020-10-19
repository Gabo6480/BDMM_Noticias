import * as validations from './validation.module.js';
import { login } from './services/user.service.module.js';
import { User } from './models/user.model.js';

window.onload = ()=>{
    document.querySelector("#submit").addEventListener("click", e=>{
        e.preventDefault();

        let err = 0;
        let email_text = document.querySelector('#email').value;
        let username_text = document.querySelector('#username').value;
        let password_text = document.querySelector('#password').value;
        let password_confirm_text = document.querySelector('#confirm-password').value;
        let pp_file = document.querySelector("#pp-file").files[0];

        if(!validations.validate_empty(email_text))
        {
            alert("Email es obligatorio");
            err++;
        }
        if(!validations.validate_email(email_text))
        {
            alert("Email invalido");
            err++;
        }

        if(!validations.validate_empty(username_text))
        {
            alert("Nombre de usuario obligatorio");
            err++;
        }
        if(!validations.validate_username(username_text))
        {
            alert("Nombre de usuario invalido");
            err++;
        }

        if(!validations.validate_empty(password_text))
        {
            alert("Constrasena obligatoria");
            err++;
        }
        if(!validations.validate_empty(password_confirm_text))
        {
            alert("Confirmacion de constrasena obligatoria");
            err++;
        }
        if(password_text != password_confirm_text){
            alert("Contrasena y confirmacion de contrasena tienen que ser identicas");
            err++;
        }

        if(err > 0)
            alert("Favor de resolver errores");
        else{
            let u = new User(username_text, email_text, password_text, pp_file? pp_file : null);
            login(u);
        }
    });
}