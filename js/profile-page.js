$(document).ready(function () {

    //TODO: Cargar la información
    $("#info-name").text("Pepe Pepeño");
    $("#info-mail").text("pepeño@pepe.pep");
    $("#info-phon").text("123456789");

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

    $("body").on("click", "#button-submit", function(){
        //TODO: Logica para guardar los cambios
        location.reload();
    });

    $("#edit-info").click(function(){
        $('#info-holder').html("<form class='form' action='##' method='post' id='registrationForm'>" 
        + "<div class='form-group'>"
        +    "<div class='col-xs-6'>"
        +         "<label for='first_name'>"
        +             "<h4>" + "Nombre" +"</h4>" //Insertar aquí en nombre
        +         "</label>"
        +         "<input type='text' class='form-control' name='first_name' id='first_name' placeholder='Nombre'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='last_name'>"
        +             "<h4>" + "Apellido/s" + "</h4>" //Insertar aquí los apellidos
        +         "</label>"
        +         "<input type='text' class='form-control' name='last_name' id='last_name' placeholder='Apellido/s'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='phone'>"
        +             "<h4>" + "Teléfono" + "</h4>" //Insertar aquí el teléfono
        +         "</label>"
        +         "<input type='text' class='form-control' name='phone' id='phone' placeholder='Teléfono'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='email'>"
        +             "<h4>" + "Correo" + "</h4>" //Insertar aquí el correo
        +         "</label>"
        +         "<input type='email' class='form-control' name='email' id='email' placeholder='Correo'>"
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
        $('#info-holder').html("<form class='form' action='##' method='post' id='registrationForm'>" 
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='password'>"
        +             "<h4>Contraseña</h4>"
        +         "</label>"
        +         "<input type='password' class='form-control' name='password' id='password' placeholder='Contraseña'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='newpassword'>"
        +             "<h4>Nueva Contraseña</h4>"
        +         "</label>"
        +         "<input type='password' class='form-control' name='newpassword' id='newpassword' placeholder='Nueva Contraseña'>"
        +     "</div>"
        + "</div>"
        + "<div class='form-group'>"
        +     "<div class='col-xs-6'>"
        +         "<label for='password2'>"
        +             "<h4>Verificar Contraseña</h4>"
        +         "</label>"
        +         "<input type='password' class='form-control' name='password2' id='password2' placeholder='Verificar Contraseña'>"
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
        if(confirm("¿Está seguro que desea eliminar su prefil?")){
            alert("ded.")
        }
    });

});