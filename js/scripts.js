$(document).ready(function(){

    var grid = $(".grid");

    //Primero gregamos el contenido
    for(var i = 0; i < 9; i++){
        grid.append("<div class='test2 grid-item'><div class='post-container rounded'><div class='post-title-card'><h3 class='block post-title'> NOTICIA PRINCIPAL TITULO CREIBLE WOW ES MUCHO TEXTO SANTO DIOS MIO CUANTO TEXTO WOW OMG WOWOWOWOWOWOWOW</h3><p class='text-muted post-info'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum soluta quidem numquam consequatur quo cum illum laudantium officiis quaerat officia est asperiores maxime quos dolores, ipsa nisi voluptates, blanditiis explicabo consectetur. Vero at necessitatibus voluptate dolor explicabo, natus deserunt sit nobis ipsam numquam quaerat quasi doloribus porro enim quod, excepturi quae, fuga accusamus dolorem cumque quo. Et sequi possimus distinctio porro eaque assumenda culpa nulla, vero quis, neque labore numquam! Voluptatem, voluptatum ex beatae labore dolorum laboriosam exercitationem, nostrum officia, fuga tempora perspiciatis accusamus temporibus. Nulla quasi placeat rerum et consequuntur explicabo sint deleniti maxime? Consequuntur sint error modi voluptas.</p></div></div></div>");
    }

    //Lo organizamos
    grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: 210
    });

    //Escalamos el texto dentro de cada "noticia"
    $(".post-title-card").children().each(function(){
        $(this).fitText(1.35);
    });
});