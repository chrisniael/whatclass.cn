/* global URL */

$(document).ready(function() {
    var calendar = "";
    var numberTime = [
        {
        },
        {
                "beginHour" : 8,
                "beginMinute" : 0,
                "endHour" : 8,
                "endMinute" : 40
        },
        {
                "beginHour" : 8,
                "beginMinute" : 50,
                "endHour" : 9,
                "endMinute" : 30
        },
        {
                "beginHour" : 10,
                "beginMinute" : 0,
                "endHour" : 10,
                "endMinute" : 40
        },
        {
                "beginHour" : 10,
                "beginMinute" : 50,
                "endHour" : 11,
                "endMinute" : 30
        },
        {
                "beginHour" : 11,
                "beginMinute" : 40,
                "endHour" : 12,
                "endMinute" : 20
        },
        {
                "beginHour" : 13,
                "beginMinute" : 30,
                "endHour" : 14,
                "endMinute" : 10
        },
        {
                "beginHour" : 14,
                "beginMinute" : 20,
                "endHour" : 15,
                "endMinute" : 0
        },
        {
                "beginHour" : 15,
                "beginMinute" : 30,
                "endHour" : 16,
                "endMinute" : 10
        },
        {
                "beginHour" : 16,
                "beginMinute" : 20,
                "endHour" : 17,
                "endMinute" : 00
        },
        {
                "beginHour" : 18,
                "beginMinute" : 0,
                "endHour" : 18,
                "endMinute" : 40
        },
        {
                "beginHour" : 18,
                "beginMinute" : 50,
                "endHour" : 19,
                "endMinute" : 30
        },
        {
                "beginHour" : 19,
                "beginMinute" : 40,
                "endHour" : 20,
                "endMinute" : 20
        },
        {
                "beginHour" : 20,
                "beginMinute" : 30,
                "endHour" : 21,
                "endMinute" : 10
        }
    ];

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
        str = ltrimString(str, charCodes);
        str = rtrimString(str, charCodes);

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
            return false;
        }

        data = html.slice(leftPos, rightPos);
        endPos = rightPos;

        var result = new Object();
        result.data = data;
        result.endPos = endPos;
        return result;
    }

	function parseAddressData(html, left, rights, beginPos) {
        var leftPos = html.indexOf(left, beginPos);
        if(leftPos === -1) {
            return false;
        }
        leftPos = leftPos + left.length;

		var rightPos = html.length;

		for(var i = 0; i < rights.length; ++i) {
			var pos = html.indexOf(rights[i], leftPos);
			if(pos !== -1 && pos < rightPos) {
				rightPos = pos;
			}
		}

        data = html.slice(leftPos, rightPos);
        endPos = rightPos;

        var result = new Object();
        result.data = data;
        result.endPos = endPos;
        return result;
    }

    
    function removeNameSuffix(name) {
        suffixBegin = name.lastIndexOf("[");
        if(suffixBegin === -1) {
            return name;
        }
        return name.slice(0, suffixBegin);
    }

    function parseClas(tdHtml, classNumber, weekDay) {
        var nameLeft = "&nbsp;", nameRight = "&nbsp;";
        var weekBeginLeft = "&nbsp;", weekBeginRight = "-";
        var weekEndLeft = "-", weekEndRight = "周";
        var numberBeginLeft = "第", numberBeginRight = "-";
        var numberEndLeft = "-", numberEndRight = "节";
        var teacherLeft = "<br>", teacherRight = "<br>";
        //var addressLeft = "<br>", addressRight = "\n";


        nameResult = parseData(tdHtml, nameLeft, nameRight, 0);
        if(nameResult === false) {
            return false;
        }
        name = trimBlank(nameResult.data);
        name = removeNameSuffix(name);

        weekBeginResult = parseData(tdHtml, weekBeginLeft, weekBeginRight, nameResult.endPos);
        if(weekBeginResult === false) {
            return false;
        }
        weekBegin = parseInt(weekBeginResult.data);
        if(isNaN(weekBegin)) {
            return false;
        }

        weekEndResult = parseData(tdHtml, weekEndLeft, weekEndRight, weekBeginResult.endPos);
        if(weekEndResult === false) {
            return false;
        }
        weekEnd = parseInt(weekEndResult.data);
        if(isNaN(weekEnd)) {
            return false;
        }

        numberBeginResult = parseData(tdHtml, numberBeginLeft, numberBeginRight, weekEndResult.endPos);
        if(numberBeginResult === false) {
            return false;
        }
        numberBegin = parseInt(numberBeginResult.data);
        if(isNaN(numberBegin)) {
            return false;
        }

        numberEndResult = parseData(tdHtml, numberEndLeft, numberEndRight, numberBeginResult.endPos);
        if(numberEndResult === false) {
            return false;
        }
        numberEnd = parseInt(numberEndResult.data);
        if(isNaN(numberEnd)) {
            return false;
        }

        teacherResult = parseData(tdHtml, teacherLeft, teacherRight, numberEndResult.endPos);
        if(teacherResult === false) {
            return false;
        }
        teacher = trimBlank(teacherResult.data);

		/*
        addressResult = parseData(tdHtml, addressLeft, addressRight, teacherResult.endPos);
        if(addressResult === false) {
            return false;
        }
        address = trimBlank(addressResult.data);
		*/

        var addressLeft = "<br>", addressRight = ["\n", "&", "<"];
		addressResult = parseAddressData(tdHtml, addressLeft, addressRight, teacherResult.endPos);
		if(addressResult === false) {
			return false;
		}
		address = trimBlank(addressResult.data);

        var clas = new Object();
        clas.name = name;
        clas.weekDay = weekDay;
        clas.numberBegin = numberBegin;
        clas.numberEnd = numberEnd;
        clas.weekBegin = weekBegin;
        clas.weekEnd = weekEnd;
        clas.teacher = teacher;
        clas.address = address;

        return clas;
    }

    function createDate(dateString) {
        date = new Date();

        var year = dateString.slice(0, 4);
        if(year.length === 0) {
                year = 0;
        }

        var month = dateString.slice(4, 6);
        if(month.length === 0) {
                month = 0;
        }
        else {
                month = parseInt(month) - 1;
        }

        var day = dateString.slice(6, 8);
        if(day.length === 0) {
                day = 1;
        }
        else {
                day = parseInt(day);
        }

        var hour = dateString.slice(8, 10);
        if(hour.length === 0) {
                hour = 0;
        }
        else {
                hour = parseInt(hour);
        }

        var minute = dateString.slice(10, 12);
        if(minute.length === 0) {
                minute = 0;
        }
        else {
                minute = parseInt(minute);
        }

        var second = dateString.slice(12, 14);
        if(second.length === 0) {
                second = 0;
        }
        else
        {
                second = parseInt(second);
        }

        date.setFullYear(year)
        date.setMonth(month);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(second);

        return date;
    }

    function advanceSeconds(date, seconds) {
            var result = new Date();

            var timeStamp = date.getTime();
            timeStamp = timeStamp + seconds * 1000;
            result.setTime(timeStamp);
            return result;
    }

    function advanceMinutes(date, minutes) {
            return advanceSeconds(date, minutes * 60);
    }

    function advanceHours(date, hours) {
            return advanceMinutes(date, hours * 60);
    }

    function advanceDays(date, days) {
            return advanceHours(date, 24 * days);
    }

    function advanceWeeks(date, weeks) {
            return advanceDays(date, 7 * weeks);
    }

    function fillChar(str, length, ch) {
        var strLength = str.length;

        var number = length - strLength;
        while(number > 0) {
            str = ch + str;
            --number;
        }

        return str;
    }

    function createEvent(clas, firstDay) {
        var events = "";

        var eventBegin = "BEGIN:VEVENT\n", eventEnd = "END:VEVENT\n";
        var address = "LOCATION:" + clas.address + "\n";
        var dtStartPrefix = "DTSTART;TZID=Asia/Harbin:";
        var dtEndPrefix = "DTEND;TZID=Asia/Harbin:";

        //前进 n 天
        var date  = advanceDays(firstDay, clas.weekDay - 1);

        var startDate = advanceWeeks(date, clas.weekBegin - 1);
        startDate = advanceHours(startDate, numberTime[clas.numberBegin].beginHour);
        startDate = advanceMinutes(startDate, numberTime[clas.numberBegin].beginMinute);

        var endDate = advanceWeeks(date, clas.weekBegin - 1);
        endDate = advanceHours(endDate, numberTime[clas.numberEnd].endHour);
        endDate = advanceMinutes(endDate, numberTime[clas.numberEnd].endMinute);

        var i = clas.weekBegin;
        do {
            var summary = "SUMMARY:" + clas.name + " (" + clas.weekBegin.toString() + "-" + clas.weekEnd.toString() + "周)[" + i + "] " + clas.teacher + "\n";

            var year = startDate.getFullYear().toString();
            var dateMonth = startDate.getMonth() + 1;
            var month = fillChar(dateMonth.toString(), 2, "0");
            var day = fillChar(startDate.getDate().toString(), 2, "0");
            var hour = fillChar(startDate.getHours().toString(), 2, "0");
            var minute = fillChar(startDate.getMinutes().toString(), 2, "0");
            var second = fillChar(startDate.getSeconds().toString(), 2, "0");
            var dtStart = dtStartPrefix + year + month + day + "T" + hour + minute + second + "\n";

            year = endDate.getFullYear().toString();
            dateMonth = endDate.getMonth() + 1;
            month = fillChar(dateMonth.toString(), 2, "0");
            day = fillChar(endDate.getDate().toString(), 2, "0");
            hour = fillChar(endDate.getHours().toString(), 2, "0");
            minute = fillChar(endDate.getMinutes().toString(), 2, "0");
            second = fillChar(endDate.getSeconds().toString(), 2, "0");
            var dtEnd = dtEndPrefix + year + month + day + "T" + hour + minute + second + "\n";

            var oneEvent = eventBegin + summary + address + dtStart + dtEnd + eventEnd;

            startDate = advanceWeeks(startDate, 1);
            endDate = advanceWeeks(endDate, 1);

            events += oneEvent;

            ++i;
        } while(i <= clas.weekEnd);

        return events;
    }

    function createCalendar(clases, firstDay) {
        var calendarBegin = "BEGIN:VCALENDAR\n\
CALSCALE:GREGORIAN\n\
VERSION:2.0\n\
METHOD:PUBLISH\n\
X-WR-TIMEZONE:Asia/Harbin\n\
BEGIN:VTIMEZONE\n\
TZID:Asia/Harbin\n\
BEGIN:STANDARD\n\
TZOFFSETFROM:+0900\n\
RRULE:FREQ=YEARLY;UNTIL=19910914T150000Z;BYMONTH=9;BYDAY=3SU\n\
DTSTART:19890917T000000\n\
TZNAME:GMT+8\n\
TZOFFSETTO:+0800\n\
END:STANDARD\n\
BEGIN:DAYLIGHT\n\
TZOFFSETFROM:+0800\n\
DTSTART:19910414T000000\n\
TZNAME:GMT+8\n\
TZOFFSETTO:+0900\n\
RDATE:19910414T000000\n\
END:DAYLIGHT\n\
END:VTIMEZONE\n", calendarEnd = "END:VCALENDAR";

        var calendar = calendarBegin;
        var clasesLength = clases.length;
        for(var i = 0; i < clasesLength; ++i) {
            calendar += createEvent(clases[i], firstDay);
        }
        calendar += calendarEnd;

        return calendar;
    }

    /*
     * 生成下载文件
     */
    function createDownloadFile(name, content) {
        var downloadForm = $('#downloadForm');
        downloadForm.children('input[name=name]').val(encodeURIComponent(name));
        downloadForm.children('input[name=content]').val(encodeURIComponent(content));
        downloadForm.submit();
    }
    
    /**
     * 去除日期分隔符
     * @param {type} dateStr    2015{sep}10{sep}25
     * @param {type} sep    日期分隔符
     * @returns {string}    20151025
     */
    function removetDateSep(dateStr, sep) {
        while(dateStr.indexOf(sep) !== -1) {
            dateStr = dateStr.replace(sep, '');
        }
        return dateStr;
    }
    
    
    function tranformDateFormat(dateStr) {
        dateStr = removetDateSep(dateStr, '/');
        
        var year = dateStr.slice(4, 8);
        var month = dateStr.slice(0, 2);
        var day = dateStr.slice(2, 4);
        
        return year + month + day;
    }
    
    /**
     * 
     * @param {type} dateStr    日期格式 10252015 {month}{day}{year}
     * @returns {Boolean}
     */
    function isMonday(dateStr) {
        dateStr = removetDateSep(dateStr, '/');
        
        var year = dateStr.slice(4, 8);
        var month = dateStr.slice(0, 2);
        var day = dateStr.slice(2, 4);
        
        date = new Date();
        date.setFullYear(year);
        date.setMonth(month - 1);
        date.setDate(day);
        date.setHours(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        
        return date.getDay() === 1;
    }
    
    function checkFirstDay() {
        var value = $('#firstday input').val();
        var requiredObj = $('#firstday');
        
        if(value.length === 0) {
            requiredObj.addClass('has-error');
            requiredObj.children('.help-block-error').text('开学第一天不能为空。');
            $('#dump').attr('disabled', 'disabled');
            return false;
        }
        else {
            if(isMonday(value) === false) {
                requiredObj.addClass('has-error');
                requiredObj.children('.help-block-error').text('开学第一天应该为周一。');
                $('#dump').attr('disabled', 'disabled');
                return false;
            }
            else {
                requiredObj.removeClass('has-error');
                requiredObj.children('.help-block-error').text('');
                requiredObj.addClass('has-success');
                $('#dump').removeAttr('disabled');
                return true;
            }
        }
    }
    
    $('#firstday input').focusout(function() {
        checkFirstDay();
    });
    
    $('#firstday input').change(function() {
        checkFirstDay();
    });

    $('#dump').click(function() {
        if(checkFirstDay() === false) {
            return false;
        }
        
        var table = new Array();    //记录课程连续的次数
        for(var i = 0; i <= 14; ++i) {
            table[i] = new Array();

            for(var j = 0; j <= 7; ++j) {
                table[i][j] = 0;
            }
        }
        
        var clases = new Array();
        var i = 0, index = 0;
        $('.time-table > tbody > tr').each(function() {
            var j = 0;
            $(this).children('td').each(function() {

                var rowspan = $(this).attr('rowspan');

                while(table[i][j] !== 0) {    //课程连续导致 td 个数不统一
                    ++j;
                }

                if(i === 0 || j === 0) {  //星期和节数
                    table[i][j] = 0;
                }
                else {
                    var tdHtml = $(this).html();

                    if(tdHtml !== "&nbsp;") {   //td标签内容不是空格
                        var clas = parseClas(tdHtml, i, j);    //课表内容
                        clases[index] = clas;
                        ++index;

                        for(var k = 0; k < rowspan; ++k) {
                            table[i + k][j] = rowspan;
                        }
                    }
                }
                ++j;
            });

            ++i;
        });

        var firstDayStr = $('#firstday input').val();
        firstDayStr = tranformDateFormat(firstDayStr);
        var firstDay = createDate(firstDayStr);

        calendar = createCalendar(clases, firstDay);
        
        var filename = $("#username").text();
        filename = parseData(filename, "(", ")", 0);
        if(filename === false) {
            filename = "课表日程";
        }
        else {
            filename = filename.data;
        }
        filename += ".ics";
        
        createDownloadFile(filename, calendar);
    });
});
