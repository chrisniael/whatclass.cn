$(document).ready(function() {
    $('#dump').click(function() {
        
        var table = new Array();
        for(var i = 0; i <= 14; ++i) {
            table[i] = new Array();
            
            for(var j = 0; j <= 7; ++j) {
                table[i][j] = 0;
            }
        }
        
        var i = 0;
        $('.CourseFormTable > tbody > tr').each(function() {
//            console.log("i=" + i);
            console.log(this);
            
            var j = 0;
            $(this).children('td').each(function() {
//                console.log(this);
//                console.log("j=" + j);
                
                table[i][j] = 1;
                
                ++j;
            });
            
            ++i;
        });
        
        console.log(table);
    });
});