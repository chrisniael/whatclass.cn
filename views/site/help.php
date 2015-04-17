<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
$this->title = '使用帮助';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    
    <uL>
        <li>
            <h3>第一步：生成ics文件</h3>
            <ul>
                <li>
                    <p>输入 <span class="label label-default">学号</span> 和 <span class="label label-default">密码</span>（与校教务处网站一致）登录 <a href="<?= Yii::$app->params['loginUrlSuffix'] ?>">http://whatclass.cn</a></p>
                </li>
                <li>
                    <p>输入正确的 <span class="label label-default">开学一天时间</span> 后，点击 <span class="label label-default">导出ics文件</span> 按钮，保存与课表对应的 <a href="<?= Yii::$app->params['icsHelpUrl'] ?>">ics文件</a></p>
                </li>
            </ul>
        </li>
        <li>
            <h3>第二步：导入日历</h3>
            <ul>
                <li>
                    <p>登录 <a href="<?= Yii::$app->params['outlookIndexUrl'] ?>">Outlook日历</a>（也可以用Apple等其他日历软件），没有账号先注册再登录</a>
                </li>
                <li>
                    <p>应用 <span class="label label-default">导入功能</span>，将步骤一种保存的 <a href="<?= Yii::$app->params['icsHelpUrl'] ?>">ics文件</a> 导入至你的日历中</p>
                </li>
            </ul>
        </li>
        
        <li>
            <h3>第三步：同步至手机</h3>
            <ul>
                <li>
                    IOS
                    <ul>
                        <li>
                            <p><span class="label label-default">设置</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">邮件、通讯录、日历</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">添加账号</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">Outlook.com</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">电子邮箱</span> 和 <span class="label label-default">密码</span></p>
                        </li>
                    </ul>
                </li>
                <li>
                    Android
                    <ul>
                        <li>
                            <p><span class="label label-default">设置</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">邮件、通讯录、日历</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">添加账号</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">Outlook.com</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">电子邮箱</span> 和 <span class="label label-default">密码</span></p>
                        </li>
                    </ul>
                </li>
                <li>
                    Windows Phone
                    <ul>
                        <li>
                            <p><span class="label label-default">设置</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">邮件、通讯录、日历</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">添加账号</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">Outlook.com</span></p>
                        </li>
                        <li>
                            <p><span class="label label-default">电子邮箱</span> 和 <span class="label label-default">密码</span></p>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    
</div>
