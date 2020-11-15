let parseArticle = function(str){
    var converter = Markdown.getSanitizingConverter();

    return converter.makeHtml(str);
}

export{parseArticle}