$(document).ready(function() {
    $('#dump').click(function() {
        var table = new Array();    //记录课程连续的次数
        for(var i = 0; i <= 14; ++i) {
            table[i] = new Array();

            for(var j = 0; j <= 7; ++j) {
                table[i][j] = 0;
            }
        }

        var i = 0;
        $('.CourseFormTable > tbody > tr').each(function() {
//            console.log("i=" + i);
//            console.log(this);

            var j = 0;
            $(this).children('td').each(function() {
//                console.log(this);

                var rowspan = $(this).attr('rowspan');
//                console.log('rowspan=' + rowspan);

                while(table[i][j] !== 0) {    //课程连续导致 td 个数不统一
                    ++j;
                }

                if(i === 0 || j === 0) {  //星期和节数
                    table[i][j] = 0;
                }
                else {
                    var tdText = $(this).text();
//                    console.log(tdText);
//                    console.log(tdText.length);

                    if(tdText.length !== 1) {   //td标签内容不是空格
                        console.log(tdText);    //课表内容
                        for(var k = 0; k < rowspan; ++k) {
                            table[i + k][j] = rowspan;
                        }
                    }
                }
//                console.log("j=" + j);
                ++j;
            });

            ++i;
        });

        console.log(table);
    });
});