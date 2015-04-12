<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \common\models\LoginForm */

$this->title = '登录';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-login">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>请填写下面信息登录</p>

    <div class="row">
        <div class="col-lg-5">
            <?php $form = ActiveForm::begin(['id' => 'login-form']); ?>
                <?php
                $schools = ['' => '请选择学校'];
                foreach(Yii::$app->params['schools'] as $index => $school)
                {
                    $schools[$index] = $school;
                }
                ?>
                <?= $form->field($model, 'school')->dropDownList($schools) ?>
                <?= $form->field($model, 'username')->textInput(['maxlength' => 20]) ?>
                <?= $form->field($model, 'password')->passwordInput(['maxlength' => 35]) ?>
            
                <label class="control-label" for="loginform-captcha">验证码</label>
                <div class="row">
                    <div class="col-lg-6">
                    <?= $form->field($model, 'captcha', ['template' => "{input}\n{hint}\n{error}"])->textInput(['maxlength' => 4]) ?>
                    </div>
                    <div class="col-lg-6" style="padding-top: 5px;">
                        <img class="img-rounded" src="<?= Yii::$app->params['captchaUrl'] ?>" alt="captchar" title="验证码">
                    </div>
                </div>
                <?= $form->field($model, 'rememberMe')->checkbox() ?>
<!--                <div style="color:#999;margin:1em 0">
                    如果你忘记密码可以<? Html::a('重置它', ['site/request-password-reset']) ?>.
                </div>-->
                <div class="form-group">
                    <?= Html::submitButton('登录', ['class' => 'btn btn-primary', 'name' => 'login-button']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
    </div>
</div>
