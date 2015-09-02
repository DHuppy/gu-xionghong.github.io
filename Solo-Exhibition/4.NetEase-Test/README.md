#Configuration_Template使用方法
-------------------
##Install Node.js
1. 前往[Node.js](https://nodejs.org/)官网下载对应匹配自己系统的版本;
2. 双击安装包进行安装(默认配置，一直Next); 
3. ctrl+r打开命令行，输入```npm -v```查看安装是否成功（成功会返回版本号，我的版本是2.11.2)；
4. 安装相关环境,在命令行中键入一下命令进行环境配置:  
```npm install express -g npm install jade -g npm install mysql -g```
5. 检查是否安装成功（同第三步）:  
```npm express -v npm jade -v npm mysql -v```
6. Node.js安装成功。

------
##Install Msysgit
1. 前往[git for windows](http://msysgit.github.io/)下载对应安装包,安装教程可参考[这里](http://jingyan.baidu.com/article/90895e0fb3495f64ed6b0b50.html);
2. 检查是否安装成功:进入一个文件夹，右键空白区域，看下是否有Git Bash选项。

-----
##Clone项目到本地
1. 创建自己的web项目文件夹；
2. 在文件夹中右键启动Git Bash;
3. 在命令行中输入:($号不用)  
```$git clone https://github.com/Gxh-beGreat/Configuration_Template.git```
4. 进入Configuration_Template文件夹,右键启动```Git Bash```;
5. 在命令行中输入```npm install```；
6. 在命令行中输入```gulp```,开启监听模式（命令窗口不要关闭），成功后显示:
```
xionghong@GUXIONGHONG /C/Users/xionghong/Desktop/test/Configuration_Template (ma
ster)
$ gulp
[22:20:46] Using gulpfile c:\Users\xionghong\Desktop\test\Configuration_Template
\gulpfile.js
[22:20:46] Starting 'live-server'...
[22:20:46] Finished 'live-server' after 31 ms
[22:20:46] Starting 'compass'...
[22:20:46] Finished 'compass' after 15 ms
[22:20:46] Starting 'script'...
[22:20:46] Finished 'script' after 6.14 ms
[22:20:46] Starting 'watch'...
[22:20:46] Finished 'watch' after 26 ms
[22:20:46] Starting 'default'...
[22:20:46] Finished 'default' after 14 μs
[22:20:46] Server started http://localhost:8080
[22:20:46] LiveReload started on port 35729
```
打开浏览器，在地址栏输入```http://localhost:8080```，这个地址就是你写的index.html的地址，
这时候你在更改项目的html,scss或js的时候，页面会自动刷新，并且会利用compass去解析你的Sass文件  

###注意:compass解析只设置了把style.scss解析成style.css(为了更好的管理scss文件以及减少html<link>标签的使用),所以你要另外建立scss文件，并@import到style.scss里面，或者直接在style.scss里面书写你的样式。
