$(document).ready(()=>{
    $('.modo-reportero-editor').click(()=>{
        $('#article-content').attr('contentEditable',!$('#article-content').attr('contentEditable'));
    });
});