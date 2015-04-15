<?php
use yii\helpers\Html;
use kartik\date\DatePicker;

/* @var $this yii\web\View */
$this->title = '我的课表';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    
    <div class="row">
        <div class="col-lg-3">
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
        </div>
    
        <div class="col-lg-5">
        <?= Html::a('导出ics文件', NULL, ['class' => 'btn btn-primary', 'id' => "dump"]) ?>
        </div>
    </div>
    
    <div style="margin-top: 20px;">
    <?= $classese ?>
    </div>
</div>

<?php
$this->registerJsFile(Yii::$app->request->getBaseUrl() . "/js/class.js", ['depends' => [yii\web\JqueryAsset::className()], 'position' => yii\web\View::POS_END]);
?>
