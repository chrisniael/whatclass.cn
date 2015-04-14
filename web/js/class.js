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
    
    function trimBlank(str) {
        var charCodes = [32, 160, 9, 10, 11, 12, 13];
        
        return trimString(str, charCodes);
    }
    
    function parseData(html, left, right, beginPos) {
        var leftPos = html.indexOf(left, beginPos);
        if(leftPos === -1) {
            return false;
        }
        leftPos = leftPos + left.length;
        var rightPos = html.indexOf(right, leftPos);
        if(rightPos === -1) {
            return -1;
        }
        
        data = html.slice(leftPos, rightPos);
        endPos = rightPos;
        
        var result = new Object();
        result.data = data;
        result.endPos = endPos;
        return result;
    }
    
    function parseClas(tdHtml, classNumber, weekDay) {
//        console.log(tdHtml);
        
        console.log(tdHtml);
        
        var nameLeft = "&nbsp;", nameRight = "&nbsp;";
        var weekBeginLeft = "&nbsp;", weekBeginRight = "-";
        var weekEndLeft = "-", weekEndRight = "周";
        var numberBeginLeft = "第", numberBeginRight = "-";
        var numberEndLeft = "-", numberEndRight = "节";
        var teacherLeft = "<br>", teacherRight = "<br>";
        var addressLeft = "<br>", addressRight = "\n";
        
        
        clasName = parseData(tdHtml, nameLeft, nameRight, 0);
        if(clasName === false) {
            return false;
        }
        
        clasWeekBegin = parseData(tdHtml, weekBeginLeft, weekBeginRight, clasName.endPos);
        if(clasWeekBegin === false) {
            return false;
        }
        
        clasWeekEnd = parseData(tdHtml, weekEndLeft, weekEndRight, clasWeekBegin.endPos);
        if(clasWeekEnd === false) {
            return false;
        }
        
        clasNumberBegin = parseData(tdHtml, numberBeginLeft, numberBeginRight, clasWeekEnd.endPos);
        if(clasNumberBegin === false) {
            return false;
        }
        
        clasNumberEnd = parseData(tdHtml, numberEndLeft, numberEndRight, clasNumberBegin.endPos);
        if(clasNumberEnd === false) {
            return false;
        }
        
        clasTeacher = parseData(tdHtml, teacherLeft, teacherRight, clasNumberEnd.endPos);
        if(clasTeacher === false) {
            return false;
        }
        
        clasAddress = parseData(tdHtml, addressLeft, addressRight, clasTeacher.endPos);
        if(clasAddress === false) {
            return false;
        }
        
        var clas = new Object();
        clas.name = trimBlank(clasName.data);
        clas.weekDay = weekDay;
        clas.numberBegin = parseInt(clasNumberBegin.data);
        clas.numberEnd = parseInt(clasNumberEnd.data);
        clas.weekBegin = parseInt(clasWeekBegin.data);
        clas.weekEnd = parseInt(clasWeekEnd.data);
        clas.teacher = clasTeacher.data;
        clas.address = trimBlank(clasAddress.data);

        
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