//__dirname代表的是当前文件所在目录的绝对路径：D:\dasanxia\atguigu\前端\vuewebpack
const htmlPlugins = require('html-webpack-plugin');
const path = require('path');//用来解析路径相关信息的模块
module.exports = {//配置对象
//入口
    entry:{
        entryPath : path.resolve(__dirname,'./src/index.js')
    },
//出口
    output:{
        filename:'static/js/[name].bundle.js',//可以带路径   路径写下面指定的文件夹下的东西
        path:path.resolve(__dirname,'dist')
    },
//模块加载器
    module:{
        //配置ES6转ES5
        rules:[
            {
                test: /\.js$/,//用于处理文件，对那些文件进行处理
                // exclude: /node_modules/,
                include:[path.resolve(__dirname,'src')],//只针对那些文件进行处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],//预设包（包含多个常用插件的一个大包）配置，不用配置注释的plugins
                    // plugins:[

                    // ]
                  }
                }
            },
            //处理CSS
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              //处理图片
              {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path 
                    },
                  },
                ],
              },
        ]
    },
//插件
    plugins:[
        new htmlPlugins({
            template:'index.html', //将哪个页面作为模板页面处理（根目录）
            filename:'index.html' //生成页面在output指定的path下面
        })
    ],
    devServer: {
        open: true, // 自动打开浏览器
        // quiet: true, // 不做太多日志输出
      },
      devtool: 'eval-cheap-module-source-map',

}