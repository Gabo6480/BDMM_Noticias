
$(document).ready(function(){
    var cont = $(".post-container");
    var contHeight = cont.outerHeight();
    $(".post-title").children().each(function(){
        $(this).css({
            transform: "scale(" + 0.1 + ")"
        });
    });
});