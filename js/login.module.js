import { request } from './services/xmlhttp-promise.module.js';
import { validate_email, validate_empty } from './imports/validation.module.js';

window.onload = function(){
    async function login(email, password){
        if(validate_empty(password) && validate_email(email)){
            let login = await request({url:"login_url", method:"POST"});
            let data = JSON.parse(login);

            if(data)
                alert(data);
        }
        else{
            console.error("Introduzca los datos correctamente");
        }

    }

    document.querySelector('#submit').addEventListener("click",e=>{
        e.preventDefault();
        login(document.querySelector("#username"),document.querySelector("#sumit"));
    });
}