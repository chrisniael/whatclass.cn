<?php
use yii\helpers\Html;
use kartik\date\DatePicker;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
$this->title = '我的课表';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    
    <?php $form = ActiveForm::begin([
        'id' => 'downloadForm',
        'action' => '/index.php?r=site/download',
        'options' => [
            'style' => 'dsplay:none;',
        ],
        ]); ?>
    
        <?= Html::textInput('name', '', ['style' => 'display: none;']) ?>
        <?= Html::textInput('content', '', ['style' => 'display: none;']) ?>
    <?php ActiveForm::end(); ?>
    
    <div class="row" style="margin-top: 15px;">
        <div class="col-lg-3" id="firstday">
            <?php
            echo DatePicker::widget([
                'name' => 'firstday',
                'value' => '',
                'pluginOptions' => [
                    'autoclose'=>true,
                    'format' => 'mm/dd/yyyy'
                ],
                'options' => [
                    'placeholder' => '开学第一天',
                ],
            ]);
            ?>
            <p class="help-block help-block-error"></p>
        </div>
    
        <div class="col-lg-5">
            <?= Html::a('<span class="glyphicon glyphicon-download" aria-hidden="true"></span> 导出ics文件', 'javascript:void(0)', [
                'class' => 'btn btn-primary',
                'id' => "dump",
                'disabled' => 'disabled',
                'target' => '_blank',
                ]) ?>
        </div>
    </div>
    
    <div style="margin-top: 15px;">
    <?= $classese ?>
    </div>
</div>

<?php
$this->registerJsFile(Yii::$app->request->getBaseUrl() . "/js/class.js", ['depends' => [yii\web\JqueryAsset::className()], 'position' => yii\web\View::POS_END]);
?>