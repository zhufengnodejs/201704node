## 安装 mongodb

## 启动 mongodb服务器
```
mongod --dbpath=d:\monogodata
```

## 启动mongodb客户端
```
mongo
```

## 如何关闭服务器
在客户端里输入以下命令
```
use admin
db.shutdownServer();
```