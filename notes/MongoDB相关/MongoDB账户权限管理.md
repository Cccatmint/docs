# MongoDB权限管理

### 1.创建一个用户管理员 分配root角色

> 其他内置角色查看文档https://docs.mongodb.com/manual/reference/built-in-roles/#superuser-roles

```
use admin
db.createUser(
    {
        user: "cccatmint",
        pwd: "123456",
        roles: [ { role: "root", db: "admin" }]
    }
)
```

```
1.数据库用户角色：read、readWrite;
2.数据库管理角色：dbAdmin、dbOwner、userAdmin；
3.集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4.备份恢复角色：backup、restore；
5.所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、
dbAdminAnyDatabase
6.超级用户角色：root
```



### 2.使用配置文件启动数据库服务

- 从命令行启动

```
mongod --auth --port 27017 --dbpath /var/lib/mongodb
```

- 或者修改配置文件内容（C:\Program Files\MongoDB\Server\5.0\bin下的mongod.cfg）

```
security:
    authorization: enabled
```



### 3.重启服务

win+R

services.msc

重启服务MongoDB Server (MongoDB)



### 4.连接数据库时

```
mongo -u cccatmint -p 123456
// mongo - u <用户名> -p <密码>
```

```
const url = 'mongodb://cccatmint:123456@localhost:27017/';
```

