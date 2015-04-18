$(document).ready(function () {
    $('#captcha').click(function () {
        var imgObj = $(this).children('img');
        imgObj.attr('src', 'images/loading.gif');
        imgObj.attr('style', 'margin-left: 23px;');
        
        $.ajax({
            url: 'index.php?r=site/captcha',
            type: 'GET',
            async: 'true',
            dataType: 'text',
            success: function (data, textStatus) {
                imgObj.removeAttr('style');
                imgObj.hide();
                imgObj.attr('src', data);
                imgObj.fadeIn('slow');
            }
        });
        return false;
    });
});