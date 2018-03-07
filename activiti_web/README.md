rbac_cms
========

### 如果更改dva框架启用的端口号？

dora 服务器，默认端口 8000，所以在package.json文件中，启用默认端口的脚本如下即可 

```
"start": "dora --plugins \"webpack,webpack-hmr\""
```
如果要更改默认端口，则需要在启动脚本中加入port参数，如下

```
start": "dora --plugins \"proxy?port=8899,webpack,webpack-hmr\""
```
    "

### 发布前，先安装 atool-build

```
cnpm install -g atool-build
```

再运行如下命令编译

```
cd rbac_cms
atool-build
```
调试模式，用如下命令编译

```
cd rbac_cms
atool-build --no-compress --devtool source-map
```

### [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)

```
cnpm install --save redux-auth-wrapper
```

### 加密crypto-js

```
cnpm install --save crypto-js
```

### react-cropper

[图像剪裁组件](http://roadmanfong.github.io/react-cropper/)

[图像剪裁组件react-cropper](https://github.com/roadmanfong/react-cropper)

[Demo](http://fengyuanchen.github.io/cropper/)

```
cnpm install --save react-cropper
```

### jwt-decode

```
cnpm install --save jwt-decode
```

### babel-plugin-import

引入babel-plugin-import，按需加载antd组件

先运行如下命令，安装组件

```
cnpm install babel-plugin-import --save-dev
```

再在.babelrc配置文件中添加如下配置

```
"plugins": [
    ["import", { libraryName: "antd", style: "css" }]
  ],
```

就可以了。

### babel-polyfill

引入babel-polyfill和babel-plugin-transform-runtime，解决浏览器兼容问题

先运行如下命令，安装组件

```
cnpm install babel-polyfill --save
cnpm install babel-plugin-transform-runtime --save

```

在src/index.js中添加如下配置 

```
import "babel-polyfill";
```

就可以了。

### dva-loading

cnpm install dva-loading --save


