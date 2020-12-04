$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#pp').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);

            //TODO: Subir imagen a la base de datos
        }
    }
    

    $("#pp-file").on('change', function(){
        readURL(this);
    });
    
    $(".camera-icon").on('click', function() {
        console.log("CLICK")
       $("#pp-file").click();
    });
});