<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 */
class LoginForm extends Model
{
    public $school;
    public $username;
    public $password;
    public $captcha;
    public $rememberMe = false;

    private $_user = false;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            ['school', 'required'],
            // username and password are both required
            [['username', 'password'], 'required'],
            ['username', 'integer'],
            // rememberMe must be a boolean value
            ['rememberMe', 'boolean'],
            // password is validated by validatePassword()
            ['password', 'validatePassword'],
            
            ['captcha', 'required'],
        ];
    }
    
    public function attributeLabels()
    {
        return [
            'school' => '学校',
            'username' => '学号',
            'password' => '密码',
            'rememberMe' => '记住密码',
            'captcha' => '验证码',
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();

            if (!$user) {
                $this->addError($attribute, '用户名或密码错误。');
                return;
            }
            
            $result = $user->validatePassword();
            
            if(!empty($result['validateCodeError']) && $result['validateCodeError'] == true)
            {
                $this->addError('captcha', '验证码错误。');
                return;
            }
            
            if(!empty($result['userNameOrPasswordError']) && $result['userNameOrPasswordError'] == true)
            {
                $this->addError('password', '用户名或密码错误。');
                return;
            }
            
            if(empty($result['success']) || $result['success'] != true)
            {
                $this->addError('password', '用户名或密码错误。');
                return;
            }
        }
    }

    /**
     * Logs in a user using the provided username and password.
     * @return boolean whether the user is logged in successfully
     */
    public function login()
    {
        if ($this->validate()) {
            return Yii::$app->user->login($this->getUser(), $this->rememberMe ? 3600*24*30 : 0);
        } else {
            return false;
        }
    }

    /**
     * Finds user by [[username]]
     *
     * @return User|null
     */
    public function getUser()
    {
        if ($this->_user === false) {
            $this->_user = User::findByUsername($this->username, $this->password, $this->captcha);
        }

        return $this->_user;
    }
}
