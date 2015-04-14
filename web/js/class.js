$(document).ready(function() {
    var clases = new Array();
    
    function inArray(arr, value) {
        var arrLength = arr.length;
        for(var i = 0; i < arrLength; ++i) {
            if(arr[i] === value) {
                return true;
            }
        }
        
        return false;
    }
    
    function ltrimString(str, charCodes) {
        var strLength = str.length;
        var i = 0;
        while(i < strLength) {
            var charCode = str[i].charCodeAt(0);
            if(inArray(charCodes, charCode)) {
                ++i;
                continue;
            }
            else {
                break;
            }
        }
        str = str.slice(i, strLength);
        
        return str;
    }
    
    function rtrimString(str, charCodes) {
        //去掉后面的 空格和换行符
        var strLength = str.length;
        var j = strLength - 1;
        while(j >= 0) {
            var charCode = str[j].charCodeAt(0);
            if(inArray(charCodes, charCode)) {
                --j;
                continue;
            }
            else {
                break;
            }
        }
        str = str.slice(0, j + 1);
        
        return str;
    }
    
    function trimString(str, charCodes) {
//        console.log(str);
        
        str = ltrimString(str, charCodes);
        str = rtrimString(str, charCodes);

//        console.log(str);
        
        return str;
    }
    
    function parseClas(tdHtml, classNumber, weekDay) {
//        console.log(tdHtml);
        
        console.log(tdHtml);
        
        var spaceHtml = "&nbsp;";
        
        var nameBegin = tdHtml.indexOf(spaceHtml);
        if(nameBegin === -1) {
            return false;
        }
        nameBegin = nameBegin + spaceHtml.length + 1;
        var nameEnd = tdHtml.indexOf(spaceHtml, nameBegin);
        if(nameEnd === -1) {
            return -1;
        }
        var clasName = tdHtml.slice(nameBegin, nameEnd);
        
        var weekSep = "-";
        var weekBeginBegin = nameEnd + spaceHtml.length;
        var weekBeginEnd = tdHtml.indexOf(weekSep, weekBeginBegin);
        if(weekBeginEnd === -1) {
            return false;
        }
        var clasWeekBegin = tdHtml.slice(weekBeginBegin, weekBeginEnd);
        
        var weekUnit = "周";
        var weekEndBegin = weekBeginEnd + weekSep.length;
        var weekEndEnd = tdHtml.indexOf(weekUnit, weekEndBegin);
        if(weekEndEnd === -1) {
            return false;
        }
        var clasWeekEnd = tdHtml.slice(weekEndBegin, weekEndEnd);
        
        var numberLeftHtml = "第", numberSepHtml = "-";
        var numberBeginBegin = tdHtml.indexOf(numberLeftHtml, weekEndEnd);
        if(numberBeginBegin === -1) {
            return false;
        }
        numberBeginBegin = numberBeginBegin + numberLeftHtml.length;
        var numberBeginEnd = tdHtml.indexOf(numberSepHtml, numberBeginBegin);
        if(numberBeginEnd === -1) {
            return false;
        }
        var clasNumberBegin = tdHtml.slice(numberBeginBegin, numberBeginEnd);
        
        var numberRightHtml = "节"
        var numberEndBegin = numberBeginEnd + numberSepHtml.length;
        var numberEndEnd = tdHtml.indexOf(numberRightHtml, numberEndBegin);
        if(numberEndEnd === -1) {
            return false;
        }
        var clasNumberEnd = tdHtml.slice(numberEndBegin, numberEndEnd);
        
        var teacherLeft = "<br>", teacherRight = "<br>";
        var teacherBegin = tdHtml.indexOf(teacherLeft, numberEndEnd);
        if(teacherBegin === -1) {
            return false;
        }
        teacherBegin = teacherBegin + teacherLeft.length;
        var teacherEnd = tdHtml.indexOf(teacherRight, teacherBegin);
        if(teacherEnd === -1) {
            return false;
        }
        var clasTeacher = tdHtml.slice(teacherBegin, teacherEnd);
        
        var addressBegin = teacherEnd + teacherRight.length;
        var clasAddress = tdHtml.slice(addressBegin);
        
        var clas = new Object();
        clas.name = clasName;
        clas.weekDay = weekDay;
        clas.numberBegin = clasNumberBegin;
        clas.numberEnd = clasNumberEnd;
        clas.weekBegin = clasWeekBegin;
        clas.weekEnd = clasWeekEnd;
        clas.teacher = clasTeacher;
        clas.address = clasAddress;

        
        console.log(clas);
        
    }
    
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
                    var tdHtml = $(this).html();
//                    console.log(tdHtml);
//                    console.log(tdHtml.length);

                    if(tdHtml !== "&nbsp;") {   //td标签内容不是空格
                        parseClas(tdHtml, i, j);    //课表内容
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