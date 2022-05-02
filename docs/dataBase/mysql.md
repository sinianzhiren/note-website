---
title: mysql的文章
---

## mysql常用命令
> - [基础操作](https://blog.csdn.net/qq_38328378/article/details/80858073)
> - Mysql中用来存储日期的数据类型有三种：Date、Datetime、Timestamp
>   - date: YYYY-MM-DD
>   - dateTime: YYY-MM-DD HH:MM:SS
>   - Timestamp: 时间戳
> - [mysql小数使用什么类型](https://m.php.cn/article/485157.html)
> - [mysql分析MySQL数据类型的长度](https://blog.csdn.net/weixin_40008339/article/details/114327852)

## mysql错误排查和解决
> - [MySQL中遇到的几种报错及其解决方法](https://www.liuyixiang.com/post/16582.html)
> - [Node.js链接MySQL8.0出现错误 ER_NOT_SUPPORTED_AUTH_MODE](https://blog.csdn.net/tumobi/article/details/124164347)
>   - 原因：mysql 8.0.4 以上版本安装时默认了caching_sha2_pasword的认证方式，但是egg-mysql底层以来的mysqljs目前还没有支持，你只能通过去修改conf文件default_authentication_plugin=mysql_native_password或者降级mysql server
>   - 上述的解决办法可能会报错因为MySQL默认的密码等级和密码长度需要从新设置：
>       - [Your password does not satisfy the current policy requirements解决办法](https://blog.csdn.net/calistom/article/details/87939956)
>       - 上述的解决办法可能会遇到另外一个问题，(Operation ALTER USER failed for 'root'@'localhost)
>       - 需要查看库中设置的host的值，然后对应的修改
>       - [Operation ALTER USER failed for ‘root‘@‘localhost‘](https://blog.csdn.net/u012069313/article/details/123051399)

## mysql字符集和排序规则
> - [Mysql建立数据库时字符集与排序规则的选择](https://www.jianshu.com/p/f18f92370e8c)

