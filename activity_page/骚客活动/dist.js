var fs = require('fs');
var path = require('path');

// 加载配置文件
var config = JSON.parse(fs.readFileSync(__dirname + '/dist_config.json','utf8'));

// 用于替换文本
function replacePath(text){
  var paths = config.path;
  var newText = String(text);
  for (var i = 0; i < paths.length; i++){
    var _path = paths[i];
    for (var item in _path){
      // 匹配多行，全文，且忽略大小写
      var re = new RegExp(item, "gim");
      newText = newText.replace(re, _path[item]);
    }
  }
  return newText;
}

// 用于文件
function fileDist(srcFile, distFile){
  var fileContents = fs.readFileSync(srcFile);

  // 如果目录不存在，就新建
  var distDir = path.dirname(distFile);
  if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
  }
  var realContents = replacePath(fileContents);
  var newFd = fs.openSync(distFile, 'w+');
  fs.closeSync(newFd);
  fs.writeFileSync(
    distFile,
    realContents
  );
  console.log(distFile);
}

// 用于目录
function dirDist(srcPath, distPath){
  var fileArray = fs.readdirSync(srcPath);

  // 如果目标目录没有就新建
  if (!fs.existsSync(distPath)){
    fs.mkdirSync(distPath);
  }

  for (var i = 0; i < fileArray.length; i++){
    var filePath = fileArray[i];
    var fileFullPath = path.join(srcPath, filePath);
    var stat = fs.statSync(fileFullPath);
    // 如果目标是目录，重复当前函数
    if (stat.isDirectory()){
      var new_distPath = path.join(distPath, filePath);
      if (!fs.existsSync(new_distPath)){
        fs.mkdirSync(new_distPath);
      }
      dirDist(
        fileFullPath,
        new_distPath
      );
    } else {
      // 如果是文件 先替换文件里的相对路径，
      // 然后新建文件到目标目录
      fileDist(fileFullPath, path.join(distPath, filePath));
      console.log(path.join(distPath, filePath));
    }
  }
}

// 用于二进制文件的目录
function copyDist(srcPath, distPath){
  var fileArray = fs.readdirSync(srcPath);

  // 如果目标目录没有就新建
  if (!fs.existsSync(distPath)){
    fs.mkdirSync(distPath);
  }

  for (var i = 0; i < fileArray.length; i++){
    var filePath = fileArray[i];
    var fileFullPath = path.join(srcPath, filePath);
    var stat = fs.statSync(fileFullPath);
    // 如果目标是目录，重复当前函数
    if (stat.isDirectory()){

      copyDist(
        fileFullPath,
        path.join(distPath, filePath)
      );
    } else {
      // 如果是文件 先替换文件里的相对路径，
      // 然后新建文件到目标目录
      var readStream = fs.createReadStream(fileFullPath);
      readStream.pipe(fs.createWriteStream(path.join(distPath, filePath)));
      console.log(path.join(distPath, filePath));
    }
  }
}


for (var item in config.file){
  fileDist(item, config.file[item]);
}
console.log("复制文件完毕!\n");

for (var item in config.dir){
  dirDist(item, config.dir[item]);
}
console.log("复制文本目录完毕!\n");

for (var item in config.copy){
  copyDist(item, config.copy[item]);
}
console.log("复制二进制目录完毕!\n");