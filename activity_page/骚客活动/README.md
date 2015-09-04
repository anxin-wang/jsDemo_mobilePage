这是一个开发模板目录

###文件说明

####startwww_8089.bat
使用python启动一个静态的http服务。8089表示端口号，需要改端口号就打开文件修改，并同时修改文件名，使得使用起来直观。

####dist_config.json
配置程序发布时需要拷贝的目录和需要替换的各种路径。

####dist.js
发布程序，会读取dist_config.json里的数据，然后把目录发布到指定的目录。运行命令。

```
node dist.js
```

####index.html
网站的首页。也可以多添几个页面，只要发布前添加到dist_config.json里就行。


###目录说明

####css
样式目录

####images
图片目录

####js
javascript目录