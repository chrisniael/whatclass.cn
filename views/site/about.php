<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
$this->title = '关于';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    
    <ul>
        <li>
            <p>
                如果你对这个项目感兴趣，你可以 Fork 或 Clone 它的源码
            </p>

            <p>
                <span class="octicon octicon-mark-github"></span>
                <!--<span class="mega-octicon octicon-mark-github"></span>-->
                <a href="https://github.com/chrisniael/whatclass.cn" target="_blank">whatclass.cn</a>
            </p>
        </li>

        <li>
            <p>
                如果需要帮助，可以在下面这些地方找到我
            </p>

            <p>
                <span class="octicon octicon-mark-github"></span>
                <a href="https://github.com/chrisniael" target="_blank">chrisniael</a>
            </p>

            <p>
                <span class="octicon octicon-home"></span>
                <a href="http://shenyu.me" target="_blank">http://shenyu.me</a>

            </p>

            <p>
                <span class="octicon octicon-mail"></span>
                <a href="mailto:shenyu@shenyu.me">shenyu@shenyu.me</a>
            </p>
        </li>
    </ul>
</div>
