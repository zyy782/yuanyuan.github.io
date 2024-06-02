const fs = require('fs')

// fs.writeFile(`./test`, 'Hello fileSystem', 'utf-8', (err) => {
//   console.log(err)
// })

// try {
//   fs.writeFileSync('./test', 'Hello fileSystem', 'utf-8')
// } catch (err) {
//   console.log(err)
// }


// let ws = fs.createWriteStream('./test', {
//   flags: 'w',//指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
//   encoding: 'utf8',//指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
//   fd: null,//fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
//   // mode: 0666,//通常不建议修改
//   autoClose: true//autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
// });

// ws.write('半亩方塘一鉴开\r\n');
// ws.write('天光云影共徘徊\r\n');
// ws.write('问渠那得清如许\r\n');
// ws.write('为有源头活水来\r\n');

// ws.end();


// //创建读取流对象
// let rs = fs.createReadStream('./test');

// let count = 0;
// let str = ""
// //每次取出 64k 数据后执行一次 data 回调
// rs.on('data', data => {
//   str += data;
//   count++
//   console.log(data);
//   console.log(data.length);
// });

// //读取完毕后, 执行 end 回调
// rs.on('end', () => {
//   console.log("count:", count)
//   console.log("str:", str)
//   console.log('读取完成')
// })

// rs.on('error', err => {
//     console.log(err)
// })




// fs.readFile('./fs.md', 'utf-8', (err, data) => {
//   console.log(err, data)
//   if (err) {
//     console.log(err)
//     return
//   }
// })


// try {
//   fs.writeFileSync('./test2', fs.readFileSync('./test', 'utf-8'), 'utf-8')
// } catch(err) {
//   console.log(err)
// }

// fs.writeFile(`./test2`,  fs.readFileSync('./test', 'utf-8'), 'utf-8', (err) => {
//   console.log(err)
// })



// //异步创建文件夹
// fs.mkdir('./page', err => {
//   if(err) throw err;
//   console.log('创建成功');
// });

// //递归异步创建
// // recursive 递归的
// fs.mkdir('./1/2/3', {recursive: true}, err => {
//   if(err) throw err;
//   console.log('递归创建成功');
// });

// //递归同步创建文件夹
// fs.mkdirSync('./x/y/z', {recursive: true});


// fs.rename('./test', './testCopy', (err) => {
//   console.log(err)
// })

// fs.copyFile('./test2', './testCopy', (err) => {
//   console.log(err)
// })

// fs.unlinkSync('./dele.js')
// no such file or directory, rmdir 'D:\zyy-blog\yuanyuan.github.io\work\zyy\666.txt
// fs.rmdir('./zyy/666.txt', (err) => {
//   console.log(err)
// })
// fs.rmdir('./1/2/3', (err) => {
//   console.log(err)
// })


const path = require('path');
 
function deleteDirectoryRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    // readdirSync 读取当前目录下所有文件和文件夹
    fs.readdirSync(directoryPath).forEach(function(file, index) {
      var curPath = path.join(directoryPath, file);
      /**
       * fs.lstatSync方法，它返回一个fs.Stats对象，该对象包含了关于给定文件或符号链接的信息，
       * 该对象的isDirectory()方法，它会检查返回的文件信息并返回一个布尔值，
       * 表明给定的路径是否是一个目录。
       */
      if (fs.lstatSync(curPath).isDirectory()) { // 如果是目录，递归删除子目录
        deleteDirectoryRecursive(curPath);
      } else { // 不是目录，直接删除该文件
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}



fs.readdir('../vue3', (err, files) => {
  if (err) throw err;
  console.log('目录中的文件列表:', files); // 目录中的文件列表: [ '01.md', 'bus.md', 'hooks.md' ]
});