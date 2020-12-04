import {getStoredUser, clearStorage, storeUser} from './imports/cookie.module.js';
import {getOne, edit, remove } from './services/usuario.service.js';

$(document).ready(function () {


    const userInfo = getStoredUser();
    var userDataSaved = false;
    var userData;

    if(userInfo.userId !== null && userInfo.userName !== null){
        
        getOne(userInfo.userId)
        .then(res=>res.json())
        .then(data=>{
            userData = {...data};
            userDataSaved = true;
            $("#info-name").text(data.Nombre);
            $("#info-mail").text(data.Correo);
            $("#info-phon").text(data.Telefono);
            $('.avatar').attr('src', data.Foto);
        });
    }


    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $("body").on("click", "#button-reset", function(){
        location.reload();
    });
    
    $("body").on("submit",".edit-form-floating", e=>{
        e.preventDefault();
        let fd = new FormData(e.target);
        //Agregar los que no estan en el form para el edit
        fd.append('id', userData.ID);
        fd.append('foto',  $('.avatar').attr('src'));
        fd.append('contra', userData.Contrasena);
        fd.append('rol', userData.Rol);
        fd.append('activo', userData.Activo);

        edit(fd)
        .then(res=>res.text())
        .then(data=>{
            alert("Usuario Modificado Exitosamente");
            location.reload();
        })
        .catch(err=>{
            debugger
            console.log(err)});
    })

    $("body").on("submit",".edit-password-form-floating", e=>{
        e.preventDefault();

        let fd = new FormData(e.target);
        //validar antes de enviar

        let opass     = fd.get('contra-o');
        let npass     = fd.get('contra'  );
        let npassconf = fd.get('contra-c');

        let errCount = 0;

        if(opass !== userData.Contrasena){
            alert('Contraseña incorrecta')
        }

        if(npass !== npassconf){
            alert('La contraseña y su confirmacion no coinciden');
        }

        if(errCount > 0)
            return;
        
        //borrar campos de validacion
        fd.delete('contra-o');
        fd.delete('contra-c');
        
        //Agregar los que no estan en el form para el edit
        fd.append('id', userData.ID);
        fd.append('correo',userData.Correo);
        fd.append('nombre', userData.Nombre);
        fd.append('telefono',userData.Telefono);
        fd.append('foto', userData.Foto);
        fd.append('rol', userData.Rol);
        fd.append('activo', userData.Activo);

        edit(fd)
        .then(res=>res.text())
        .then(data=>{
            alert("Usuario Modificado Exitosamente");
            location.reload();
        })
        .catch(err=>{
            console.log(err)
        });
    })

    $("#edit-info").click(function(){

        if(!userDataSaved)
            return;


        $('#info-holder').html("<form class='form edit-form-floating' method='post' id='registrationForm'>" 
        + "<div class='form-group'>"
        +    "<div class='col-xs-6'>"
        +         "<label for='first_name'>"
        +             "<h4>" + "Nombre/s" +"</h4>" //Insertar aquí en nombre
        +         "</label>"
        +         `<input type='text' class='form-control' name='nombre' id='nombre' placeholder='Nombre' value="${userData.Nombre}">`
        +     "</div>"
        + "</div>"
        //+ "<div class='form-group'>"
        //+     "<div class='col-xs-6'>"
        //+         "<label for='last_name'>"
        //+             "<h4>" + "Apellido/s" + "</h4>" //Insertar aquí los apellidos
        //+         "</label>"
        //+         "<input type='text' class='form-control' name='last_name' id='last_name' placeholder='Apellido/s'>"
        //+     "</div>"
        //+ "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='phone'>"
        +             "<h4>" + "Teléfono" + "</h4>" //Insertar aquí el teléfono
        +         "</label>"
        +         `<input type='text' class='form-control' name='telefono' id='telefono' placeholder='Teléfono' value="${userData.Telefono}">`
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='email'>"
        +             "<h4>" + "Correo" + "</h4>" //Insertar aquí el correo
        +         "</label>"
        +         `<input type='email' class='form-control' name='correo' id='correo' placeholder='Correo' value="${userData.Correo}">`
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-12'>"
        +         "<button id='button-submit' class='btn btn-lg btn-success mx-2' type='submit'>Guardar</button>"
        +         "<button id='button-reset' class='btn btn-lg btn-light mx-2' type='reset'>Restaurar</button>"
        +     "</div>"
        + "</div>"
        + "</form>");

        $("#upload-section").show();
    });

    $("#edit-pass").click(function(){
        $('#info-holder').html("<form class='form edit-password-form-floating' action='##' method='post' id='registrationForm'>" 
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='password'>"
        +             "<h4>Contraseña</h4>"
        +         "</label>"
        +         "<input type='password' class='form-control' name='contra-o' id='contra-o' placeholder='Contraseña'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='newpassword'>"
        +             "<h4>Nueva Contraseña</h4>"
        +         "</label>"
        +         "<input type='password' class='form-control' name='contra' id='contra' placeholder='Nueva Contraseña'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='password2'>"
        +             "<h4>Verificar Contraseña</h4>"
        +         "</label>"
        +         "<input type='password' class='form-control' name='contra-c' id='contra-c' placeholder='Verificar Contraseña'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-12'>"
        +         "<button id='button-submit' class='btn btn-lg btn-success mx-2' type='submit'>Guardar</button>"
        +         "<button id='button-reset' class='btn btn-lg btn-light mx-2' type='reset'>Restaurar</button>"
        +     "</div>"
        + "</div>"
        + "</form>");

        $("#upload-section").hide();
    });

    $("#edit-delete").click(function(){
        //Borrar
        if(confirm("¿Está seguro que desea eliminar su prefil?, No es revertible")){

            let fd = new FormData();
            fd.append('id', userData.ID);

            remove(fd)
            .then(res=>res.text())
            .then(data=>{
                if(data.RESULT === 'SUCCESS'){
                    alert('Usuario Eliminado Exitosamente!')
                    clearStorage();
                    window.location.href = './../';
                }
                else{
                    alert('Fallo la eliminacion del usuario')
                }
            })
            .catch(err=>console.log(err))
        }
    });

});