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



- 为已有的 MongoDB 角色添加对特定数据库的管理权限

  可以使用 `db.grantRolesToRole` 方法。这个方法接受两个参数：要授权的角色的名称，以及要授予的角色的名称。例如：

```shell
use admin
db.grantRolesToRole("myrole", [{role: "readWrite", db: "mydatabase"}])
```

这将为角色 "myrole" 授予对 "mydatabase" 数据库的 "readWrite" 角色。

注意：你需要在 "admin" 数据库中运行这个命令，并且需要具有足够的权限才能执行此操作。

还可以使用 `db.updateUser` 方法为已有用户添加数据库角色。例如：

```shell
use admin
db.updateUser("myuser", {roles: [{role: "readWrite", db: "mydatabase"}]})
```

这将为用户 "myuser" 授予对 "mydatabase" 数据库的 "readWrite" 角色。

注意：这两个方法都是在 MongoDB 版本 3.4 及更高版本中可用的。在旧版本中，可以使用 `db.addUser` 和 `db.addUserRoles` 方法来实现类似的功能。



在此之前需要在对应的数据库中创建角色和用户

```shell
// 创建角色
use koa-project
db.createRole({
  role: "root",
  privileges: [
    { resource: { db: "koa-project", collection: "" }, actions: [ "anyAction" ] }
  ],
  roles: []
})

// 创建用户
use koa-project
db.createUser({
  user: "tom",
  pwd: "abc1234",
  roles: []
})

// 分配角色
use koa-project
db.grantRolesToUser("tom", [{role: "root", db: "koa-project"}])
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

