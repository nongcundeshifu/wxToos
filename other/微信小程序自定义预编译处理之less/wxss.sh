#! /bin/bash

# cd /d E:/project/抽奖小程序（开发版）/pages&&lessc a.less a.wxss
#!/bin/bash
cd /d C:/Users/Administrator/Desktop/ticket/pages 

for   dir in $(ls C:/Users/Administrator/Desktop/ticket/pages) do  echo $dir done
# for /d %i in (E:/project/抽奖小程序（开发版）/pages) do mkdir dir1 "%i" *. 
# %str:~2%
for /d %i in (E:/project/抽奖小程序（开发版）/pages/*) do  cd E:/project/抽奖小程序（开发版）/pages/%~nxi  && if exist ./%~nxi.less  lessc %~nxi.less %~nxi.css
# %i 他的值，如果是直接运行，那么他还会在文件夹名称前面加上磁盘符，比如这里是  E:文件夹名   所以需要使用 %~nxi 来只获取文件夹名称。
# for /d %i in (E:/project/抽奖小程序（开发版）/pages/*) do cd E:/project/抽奖小程序（开发版）/pages/%i  &&  lessc %i.less %i.css
#先判断是否是目录，然后再输出
#
#
#rem 直接运行的语法：for /d %i in (E:/project/抽奖小程序（开发版）/pages/*) do  cd E:/project/抽奖小程序（开发版）/pages/%~nxi  && if exist %~nxi.less  lessc %~nxi.less %~nxi.css