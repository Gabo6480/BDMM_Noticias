$(document).ready(function(){
    var cont = $(".post-title");
    var contHeight = cont.outerHeight;

    cont.children().each(function(){
        $(this).fitText(1.35);
    });
});