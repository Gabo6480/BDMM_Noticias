let parseArticle = function(str){
    var converter = Markdown.getSanitizingConverter();

    // /\$\[([\S\s]+?)\]\("([\S\s]+?)"\)/g
    converter.hooks.chain("postConversion", function(text){
        return text.replace(/\$\[([\S\s]+?)\]\("([\S\s]+?)"\)/g, function(whole, inner, comment){
            return "<mark "+ 
            "data-toggle='tooltip' " + 
            "data-html='true' " +
            "title='" + comment + "'>" + inner + "</mark>"
        });
    });

    return converter.makeHtml(str);
}

export{parseArticle}