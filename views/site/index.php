<?php
/* @var $this yii\web\View */

use yii\bootstrap\Carousel;

$this->title = '什么课';
?>
<div class="site-index">

    <div class="body-content">

        <div class="row">
            <div class="col-lg-7">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="jumbotron">
                            <h1 style="">还打印课表？</h1>
                            <!--<p class="lead">╭∩╮（︶︿︶）╭∩╮</p>-->

                            <p><a class="btn btn-success" href="index.php?r=site/class">立刻使用</a></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h2>无安装</h2>
                        <p>手机无需安装任何软件，将课表信息完美结合至手机日历中，赶紧卸载哪些神马课表软件吧。</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h2>多平台</h2>
                        <p>支持IOS，Android，Windows Phone，Mac，Windows系统，课表信息随时查看。</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <h2>超便捷</h2>
                        <p>对接教务处系统，课表信息自动导出，实时查看当天的课程信息，再也不会错过任何课程。</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-5" style=";">
                <div id="carousel-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-generic" data-slide-to="2"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" role="listbox">
                        <div class="item active">
                            <img src="images/iphone_half1.png" alt="...">
                            <div class="carousel-caption">
                            </div>
                        </div>
                        <div class="item">
                            <img src="images/iphone_half2.png" alt="...">
                            <div class="carousel-caption">
                            </div>
                        </div>
                        <div class="item">
                            <img src="images/iphone_half3.png" alt="...">
                            <div class="carousel-caption">
                            </div>
                        </div>
                    </div>

                    <!-- Controls -->
                    <a class="left carousel-control" href="#carousel-generic" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#carousel-generic" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>



    </div>
</div>
