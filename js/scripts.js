$(document).ready(function(){
    var cont = $(".post-title-card");
    var contHeight = cont.outerHeight;

    cont.children().each(function(){
        $(this).fitText(1.35);
    });

    $(".grid").masonry({
        itemSelector: '.grid-item',
        columnWidth: 210
      });
});