# 黑龙江大学课表日程助手 (停止维护)

欢迎学弟学妹接管这个项目，邮件我 (shenyu@shenyu.me)。

# 官网

[http://whatclass.cn](http://whatclass.cn) (已下线)


# 简介

* 基于 [Yii 2.0](https://github.com/yiisoft/yii2) 框架
* 对接黑大教务处网站
* 自动生成课表数据同步至手机


## 安装

* Clone代码

	`git clone https://github.com/chrisniael/whatclass.cn.git`

* ~~安装Composer~~

	`sudo curl -sS https://getcomposer.org/installer | sudo php -- --filename=composer --install-dir=/usr/local/bin`

	* 要用 `sudo` 来执行安装命令，否则没有写文件权限
	* `--filename` 参数指定了安装后composer命令的名称，默认名称是 `composer.phar`
	* `--install-dir` 参数指定了安装的路径

* ~~安装yii依赖的组件~~

	`composer update`

  因为项目比较老，现在再用 composer 安装依赖会不兼容，目前已经将依赖 (vendor 目录) 都打包进 git 仓库，不需要再用 composer 安装。

* 部署网站

	将应用部署到 `Nginx` 或 `Apache` 的工作目录，可能需要安装一些其他组件，访问 `http://localhost/whatclass/requirements.php` 来检查服务器环境是否符合 Yii 2.0 的运行要求。

	```bash
	# Make assets and runtime dir writable by nginx/apache process.
	chmod -R 777 web/assets
	chmod -R 777 runtime
	```
