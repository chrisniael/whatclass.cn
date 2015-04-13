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
        
        if(strcmp(trim($redirectUrl), Yii::$app->params['indexUrl']) == 0)
        {
            return false;
        }
        
        $result = User::request_with_cookie($redirectUrl, $cookie_jar);
        
        self::filterTable($result);
        
        self::removePrint($result);
        
        self::removeEmptyTh($result);
        
        self::removeEmptyTd($result);
        
        
        return $result;
    }
    
    public static function filterTable(&$result)
    {        
        $tableLabelLeft = "<table";
        $tableLabelRight = "table>";
        $tableLabelStart = strpos($result, $tableLabelLeft, 0);
        
        $tableLabelEnd = strrpos($result, $tableLabelRight, $tableLabelStart + strlen($tableLabelLeft));
        
        $result = substr($result, $tableLabelStart, $tableLabelEnd + strlen($tableLabelRight) - $tableLabelStart);
    }
    
    public static function removePrint(&$table)
    {
        $spanLabelLeft = "<span";
        $spanLabelRight = "span>";
        
        $spanLabelStart = strpos($table, $spanLabelLeft, 0);
        $spanLabelEnd = strpos($table, $spanLabelRight, $spanLabelStart + strlen($spanLabelLeft));
        
        $table = substr_replace($table, "", $spanLabelStart, $spanLabelEnd + strlen($spanLabelRight) - $spanLabelStart);
    }
    
    public static function removeEmptyTd(&$table)
    {   
        $removeHtml = '<td class="firstHiddenTd"></td>';
        $table = str_replace($removeHtml, "", $table);
    }
    
    public static function removeEmptyTh(&$table)
    {
        $removeHtml = '<th class="firstHiddenTd">';
        $table = str_replace($removeHtml, "", $table);
    }
}