## 变更MongoDB默认端口号

MongoDB默认使用端口27017。要更改MongoDB默认端口号，请执行以下步骤：

1. 进入MongoDB的安装目录。
2. 打开MongoDB的配置文件mongod.conf。
3. 在mongod.conf文件中，找到“#port = 27017”行，并将注释去掉。
4. 为端口号赋新值。例如，如果要将端口号更改为27018，则应将行更改为“port = 27018”。
5. 保存文件并关闭。
6. 重启MongoDB服务。
7. 在连接到MongoDB服务器时，使用新端口号连接。





## 检查端口占用

```
netstat -aon | findstr :27017
```



## MongoDB添加超级用户角色



要在MongoDB中添加超级用户角色，请执行以下步骤：

1. 连接到MongoDB服务器。
2. 使用以下命令创建新用户：

```
Copy codeuse admin
db.createUser({
  user: "<用户名>",
  pwd: "<密码>",
  roles: [{ role: "root", db: "admin" }]
})
```

1. 在上面的命令中，将“<用户名>”替换为新用户的用户名，将“<密码>”替换为新用户的密码。
2. 在执行这个命令之后，新用户就拥有了超级用户角色，并可以在MongoDB中执行任何操作。

请注意，这个命令仅在MongoDB处于非身份验证模式下才能使用。如果MongoDB处于身份验证模式，则需要先使用具有超级用户角色的用户登录，然后才能创建新用户。





## MongoDB开启身份验证模式



要在MongoDB中开启身份验证模式，请执行以下步骤：

1. 进入MongoDB的安装目录。
2. 打开MongoDB的配置文件mongod.conf。
3. 在mongod.conf文件中，找到“#security:”行，并将注释去掉。
4. 在“security:”行下面，添加以下行：

```
Copy code
authorization: enabled
```

1. 保存文件并关闭。
2. 重启MongoDB服务。
3. 在重启MongoDB服务之后，MongoDB就处于身份验证模式。此时，在连接到MongoDB服务器之前，需要使用用户名和密码登录。

例如，如果要使用mongo命令行客户端连接到MongoDB服务器，可以使用以下命令：

```
Copy code
mongo -u <用户名> -p <密码>
```

请注意，在开启身份验证模式之前，应该确保已经在MongoDB中创建了至少一个用户。否则，将无法连接到MongoDB服务器。



## MongoDB远程服务配置

要配置MongoDB远程服务，请执行以下步骤：

1. 进入MongoDB的安装目录。
2. 打开MongoDB的配置文件mongod.conf。
3. 在mongod.conf文件中，找到“#bindIp: 127.0.0.1”行，并将注释去掉。
4. 在“bindIp:”行下面，添加要监听的IP地址。例如，如果要监听所有IP地址，则可以添加“0.0.0.0”。
5. 保存文件并关闭。
6. 重启MongoDB服务。
7. 在防火墙中打开MongoDB使用的端口（默认端口为27017）。
8. 在远程计算机上使用MongoDB客户端连接到MongoDB服务器。

例如，如果要使用mongo命令行客户端连接到MongoDB服务器，可以使用以下命令：

```
Copy code
mongo <服务器IP地址>:<端口号>
```

请注意，在配置MongoDB远程服务之前，应该确保已经在MongoDB中创建了至少一个用户。否则，将无法连接到MongoDB服务器。