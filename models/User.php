<?php

namespace app\models;

use Yii;

class User extends \yii\base\Object implements \yii\web\IdentityInterface
{
    public $id;
    public $username;
    public $password;
    public $captcha;

    private static $users = [
        '100' => [
            'id' => '100',
            'username' => 'admin',
            'password' => 'admin',
            'authKey' => 'test100key',
            'accessToken' => '100-token',
        ],
        '101' => [
            'id' => '101',
            'username' => 'demo',
            'password' => 'demo',
            'authKey' => 'test101key',
            'accessToken' => '101-token',
        ],
    ];

    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        $user = new User();
        $user->id = $id;
        $user->username = $id;
        
        return $user;
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return null;
    }
    
    public static function findByUsername($username, $password, $captcha)
    {
        $user = new User();
        $user->id = $username;
        $user->username = $username;
        $user->password = $password;
        $user->captcha = $captcha;
        
        return $user;
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return NULL;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return false;
    }
    
    /**
     * 
     * @param type $url
     * @param type $cookie_jar
     * @param type $post_fields 不为空：post请求，且显示header； 为空：get请求，且不显示header
     * @param type $saveOrUse   0：保存cookie至文件； 1:使用cookie文件来请求
     * @return type
     */
    public static function request_with_cookie($url, $cookie_jar, $showHeader = false, $post_fields = "", $saveOrUse = 0)
    {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url); 
	curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6 (.NET CLR 3.5.30729)"); 
        
        if($showHeader)
        {
            curl_setopt($ch, CURLOPT_HEADER, true);     //显示 Header
        }
        else
        {
            curl_setopt($ch, CURLOPT_HEADER, false);
        }

	if(!empty($post_fields))
	{
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
	}

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_jar);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);

	$filecontent = curl_exec($ch);
	curl_close($ch);
	return $filecontent; 
    }
    
    public function validatePassword()
    {
        $postFields = "j_username=$this->username&j_password=$this->password&validateCode=$this->captcha";
        
        $cookie_jar = Yii::$app->session->get('jsessionid');
        $header = self::request_with_cookie(Yii::$app->params['loginUrl'], $cookie_jar, true, $postFields, 1);
        
        $headerArr = explode("\n", $header);
        foreach($headerArr as $value)
        {
            if(substr($value, 0, strlen('Location:')) == 'Location:')
            {
                $redirectUrl = substr($value, strlen('Location:') + 1);
                break;
            }
        }
        
        $resultJson = self::request_with_cookie($redirectUrl, $cookie_jar);
        $result = json_decode($resultJson, true);
        
        return $result;
    }
    
    public static function generateCaptcha()
    {
        $cookie_jar = tempnam('./cookie','JSESSIONID');
        Yii::$app->session->set('jsessionid', $cookie_jar);
        
        $captcha = self::request_with_cookie(Yii::$app->params['captchaUrl'], $cookie_jar);
        
        return $captcha;
    }
    
    public static function CaptchaURI()
    {
        $captcha = self::generateCaptcha();
        return "data:image/gif;base64," . base64_encode($captcha);
    }
    
    public static function logout()
    {
        
    }
}
