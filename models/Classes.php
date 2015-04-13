<?php

namespace app\models;

use Yii;
use app\models\User;

class Classes
{
    public static function getClass()
    {
        $cookie_jar = Yii::$app->session->get('jsessionid');
        
        $header = User::request_with_cookie(Yii::$app->params['classUrl'], $cookie_jar, true, "", 1);
        
        $headerArr = explode("\n", $header);
        foreach($headerArr as $value)
        {
            if(substr($value, 0, strlen('Location:')) == 'Location:')
            {
                $redirectUrl = substr($value, strlen('Location:') + 1);
                break;
            }
        }
        
        $result = User::request_with_cookie($redirectUrl, $cookie_jar);
        
        return self::filterDate($result);
    }
    
    public static function filterDate($result)
    {
//        $captionLabelLeft = "<caption>";
//        $captionLabelStart = strpos($result, $captionLabelLeft, 0);
//        
//        $captionStart = $captionLabelStart + strlen($captionLabelLeft);
//        $captionEnd = strpos($result, "<", $captionStart);
//        
//        $caption = substr($result, $captionStart, $captionEnd - $captionStart);
        
        $tableLabelLeft = "<table";
        $tableLabelRight = "table>";
        $tableLabelStart = strpos($result, $tableLabelLeft, 0);
        
        $tableLabelEnd = strrpos($result, $tableLabelRight, $tableLabelStart + strlen($tableLabelLeft));
        
        $table = substr($result, $tableLabelStart, $tableLabelEnd + strlen($tableLabelRight) - $tableLabelStart);
        
        return $table;
    }
}