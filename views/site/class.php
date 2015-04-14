<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
$this->title = '我的课表';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    
    <?= Html::a('导出ics文件', NULL, ['class' => 'btn btn-primary', 'id' => "dump"]) ?>
    
    <div style="margin-top: 20px;">
    <?= $classese ?>
    </div>
</div>

<?php
$this->registerJsFile(Yii::$app->request->getBaseUrl() . "/js/class.js", ['depends' => [yii\web\JqueryAsset::className()], 'position' => yii\web\View::POS_END]);
?>
