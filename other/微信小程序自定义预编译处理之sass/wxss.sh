#! /bin/bash

# cd /d E:/project/�齱С���򣨿����棩/pages&&lessc a.less a.wxss
#!/bin/bash
cd /d C:/Users/Administrator/Desktop/ticket/pages 

for   dir in $(ls C:/Users/Administrator/Desktop/ticket/pages) do  echo $dir done
# for /d %i in (E:/project/�齱С���򣨿����棩/pages) do mkdir dir1 "%i" *. 
# %str:~2%
for /d %i in (E:/project/�齱С���򣨿����棩/pages/*) do  cd E:/project/�齱С���򣨿����棩/pages/%~nxi  && if exist ./%~nxi.less  lessc %~nxi.less %~nxi.css
# %i ����ֵ�������ֱ�����У���ô���������ļ�������ǰ����ϴ��̷�������������  E:�ļ�����   ������Ҫʹ�� %~nxi ��ֻ��ȡ�ļ������ơ�
# for /d %i in (E:/project/�齱С���򣨿����棩/pages/*) do cd E:/project/�齱С���򣨿����棩/pages/%i  &&  lessc %i.less %i.css
#���ж��Ƿ���Ŀ¼��Ȼ�������
#
#
#rem ֱ�����е��﷨��for /d %i in (E:/project/�齱С���򣨿����棩/pages/*) do  cd E:/project/�齱С���򣨿����棩/pages/%~nxi  && if exist %~nxi.less  lessc %~nxi.less %~nxi.css