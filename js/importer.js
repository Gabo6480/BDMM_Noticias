$(document).ready(function(){
    $("import").each(function(index){
        let self = $(this);
        let href = self.attr("href");

        $.ajax({ type: "GET",   
            url: href,   
            success : function(text)
            {
                self.after(text);
            }
        });
    });
});