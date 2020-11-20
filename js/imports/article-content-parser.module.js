var converter = Markdown.getSanitizingConverter();

let parseArticle = function(str){
    // /\$\[([\S\s]+?)\]\("([\S\s]+?)"\)/g
    converter.hooks.chain("postConversion", function(text){
        return text.replace(/\$\[([\S\s]+?)\]\("([\S\s]+?)"\)/g, function(whole, inner, comment){
            return "<mark "+ 
            "data-toggle='tooltip' " + 
            "data-html='true' " +
            "title='" + comment + "'>" + inner + "</mark>"
        });
    });

    var result = $(converter.makeHtml(str)).filter("p").html()
    return result;
}

export{parseArticle}
export{converter}